package com.studentslips.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import com.studentslips.services.AuthenticationService;

public class CustomLogoutHandler extends SecurityContextLogoutHandler {
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		HttpSession session = request.getSession(false);
		if (session != null) {			
			authenticationService.logout(session.getId());
		}
		super.logout(request, response, authentication);
	}
}
