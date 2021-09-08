package com.studentslips.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

	private static Logger log = LoggerFactory.getLogger(DefaultExceptionHandler.class);

	@ExceptionHandler(value = { StudentSlipException.class })
	public ResponseEntity<Object> handleStudentSlipException(Exception ex, WebRequest request) {
		log.error("# DefaultExceptionHandler-StudentSlipException || Class=[{}]; Code=[{}]; Message=[{}]", ex.getClass().getSimpleName(), ((StudentSlipException) ex).getCode(), ex.getMessage());
		return handleCustom((StudentSlipException) ex, HttpStatus.OK, request);
	}

	protected ResponseEntity<Object> handleCustom(StudentSlipException ex, HttpStatus status, WebRequest request) {
		ex.printStackTrace();
		ResponseObject obj = new ResponseObject(ex.getCode(), ex.getMessage(), false);
		return handleExceptionInternal(ex, obj.toMap(), new HttpHeaders(), status, request);
	}
}