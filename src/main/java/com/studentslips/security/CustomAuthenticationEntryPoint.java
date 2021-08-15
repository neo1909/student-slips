package com.studentslips.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

public class CustomAuthenticationEntryPoint extends LoginUrlAuthenticationEntryPoint {

	public CustomAuthenticationEntryPoint(String loginFormUrl) {
		super(loginFormUrl);
	}

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
		request.getSession().setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION, authException);		
		super.commence(request, response, authException);
	}

}
