package com.studentslips.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.studentslips.common.DefaultExceptionHandler;
import com.studentslips.common.ResponseObject;
import com.studentslips.common.StudentSlipException;

public class CustomExceptionHandlerFilter extends OncePerRequestFilter {
	
	private static Logger log = LoggerFactory.getLogger(DefaultExceptionHandler.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		try {
			filterChain.doFilter(request, response);
		} catch (StudentSlipException ex) {
			log.error("# CustomExceptionHandlerFilter || Class=[{}]; Code=[{}]; Message=[{}]", ex.getClass().getSimpleName(), ((StudentSlipException) ex).getCode(), ex.getMessage());
			
			ResponseObject obj = new ResponseObject(ex.getCode(), ex.getMessage(), false);
			response.setCharacterEncoding("UTF-8");
			response.setStatus(ex.getCode());
			response.getWriter().write(convertObjectToJson(obj));
		}
	}

    public String convertObjectToJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(object);
    }
}
