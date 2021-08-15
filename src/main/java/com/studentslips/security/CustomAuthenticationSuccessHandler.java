package com.studentslips.security;

import java.io.IOException;
import java.sql.Timestamp;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.studentslips.common.SessionUtil;
import com.studentslips.entities.User;
import com.studentslips.entities.UserSession;
import com.studentslips.services.UserService;
import com.studentslips.services.UserSessionService;

public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	@Autowired
	private UserSessionService userSessionService;

	@Autowired
	private UserService userService;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		HttpSession session = request.getSession();
		UserSession userSession = new UserSession();
		userSession.setSessionId(session.getId());

		try {
			userSession.setUserId(SessionUtil.getUserLoginId());
			userSessionService.insertUserSession(userSession);
		} catch (Exception e) {
			// Do nothing
		}

		// Update last login date
		try {
			User user = new User();
			user.setId(SessionUtil.getUserLoginId());
			user.setLastLoginDate(new Timestamp(System.currentTimeMillis()));
			user.setLoginRetryCount(0);
			userService.updateUser(user);
		} catch (Exception e) {
			// Do nothing
		}
		
		session.setAttribute("user", SessionUtil.getAuthenticatedUser());
		session.setAttribute("roles", SessionUtil.getAuthenticatedUserSimpleRoles());
		session.setAttribute("login", "OK");
		setDefaultTargetUrl("/index");
		
		response.getWriter().append("OK");
		response.setStatus(HttpStatus.OK.value());

//		super.onAuthenticationSuccess(request, response, authentication);
	}
}