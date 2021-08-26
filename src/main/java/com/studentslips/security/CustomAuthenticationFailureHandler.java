package com.studentslips.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.studentslips.common.ResponseObject;

public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler{

    private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationFailureHandler.class);
    
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		String errorMessage = StringUtils.hasText(exception.getMessage()) ? exception.getMessage() : "Failed to login";
		
		logger.error("# CustomAuthenticationFailureHandler || Class=[{}]; Message=[{}]", exception.getClass().getSimpleName(), exception.getMessage());
		
//		ResponseObject obj = new ResponseObject(HttpStatus.UNAUTHORIZED.value(), errorMessage, false);
//		response.setStatus(HttpStatus.UNAUTHORIZED.value());
//		response.getWriter().write(convertObjectToJson(obj));
		
		response.sendError(HttpStatus.UNAUTHORIZED.value(), errorMessage);
		
		// super.onAuthenticationFailure(request, response, exception);
	}

    public String convertObjectToJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(object);
    }
}
