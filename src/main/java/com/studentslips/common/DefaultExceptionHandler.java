package com.studentslips.common;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.fasterxml.jackson.databind.ObjectMapper;


@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

	private static Logger log = LoggerFactory.getLogger(DefaultExceptionHandler.class);

	@ExceptionHandler(value = { StudentSlipException.class })
	public ResponseEntity<Object> handleStudentSlipException(Exception ex, WebRequest request) {
		log.error("# DefaultExceptionHandler-StudentSlipException || Class=[{}]; Code=[{}]; Message=[{}]", ex.getClass().getSimpleName(), ((StudentSlipException) ex).getCode(), ex.getMessage());
		return handleCustom((StudentSlipException) ex, HttpStatus.OK, request);
	}

	@SuppressWarnings("unchecked")
	protected ResponseEntity<Object> handleCustom(StudentSlipException ex, HttpStatus status, WebRequest request) {
		ex.printStackTrace();
		ResponseObject obj = new ResponseObject(ex.getCode(), ex.getMessage(), false);
		ObjectMapper objMapper = new ObjectMapper();
		Map<String, Object> resultMap = objMapper.convertValue(obj, HashMap.class);
		return handleExceptionInternal(ex, resultMap, new HttpHeaders(), status, request);
	}
}