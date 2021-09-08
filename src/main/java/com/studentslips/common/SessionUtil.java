package com.studentslips.common;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.studentslips.entities.SessionUser;

public class SessionUtil {
    public static int getSchoolId() throws Exception {
        return getAuthenticatedUser() != null ? getAuthenticatedUser().getSchoolId() : -1;
    }
    public static int getUserLoginId() throws Exception {
    	return getAuthenticatedUser() != null ? getAuthenticatedUser().getId() : -1;
    }
    public static String getLang() {
    	String lang = getAuthenticatedUser() != null ? getAuthenticatedUser().getLang() : "sr";
    	return !StringUtils.isEmpty(lang) ? lang : "sr";
    }
    public static void setLang(String lang) {
    	if (getAuthenticatedUser() == null) return;
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	if (authentication != null) {
    		SessionUser user = (SessionUser) authentication.getPrincipal();
    		user.setLang(lang);
    		updateAuthentication(user);
    	}
    }
    public static void updateAuthentication(SessionUser user) {
		Authentication newAuth = new UsernamePasswordAuthenticationToken(user, user.getPassword(), user.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(newAuth);
    }
    public static boolean isAuthenticated() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	boolean isAuthenticated = authentication != null && !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
    	return isAuthenticated;
    }
    public static SessionUser getAuthenticatedUser() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	if (authentication != null) {
    		if (authentication.getPrincipal().equals("anonymousUser")) return null;
    		SessionUser user = (SessionUser) authentication.getPrincipal();
    		user.setPassword(null);
    		return user;
    	}
    	return null;
    }
    public static String getAuthenticatedUserSimpleRoles() {
    	if (getAuthenticatedUser() != null) {
    		return getAuthenticatedUser().getSimpleRoles();
    	}
    	return null;
    }
}
