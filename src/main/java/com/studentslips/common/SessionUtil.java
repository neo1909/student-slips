package com.studentslips.common;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.studentslips.entities.User;

public class SessionUtil {
    public static int getSchoolId() throws Exception {
        return getAuthenticatedUser() != null ? getAuthenticatedUser().getSchoolId() : -1;
    }
    public static int getUserLoginId() throws Exception {
    	return getAuthenticatedUser() != null ? getAuthenticatedUser().getId() : -1;
    }
    public static boolean isAuthenticated() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	boolean isAuthenticated = authentication != null && !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
    	return isAuthenticated;
    }
    public static User getAuthenticatedUser() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	if (authentication != null) {
    		User user = (User) authentication.getPrincipal();
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
