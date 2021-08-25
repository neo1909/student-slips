package com.studentslips.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;

public class StudentSlipException extends RuntimeException {

	private static Logger log = LoggerFactory.getLogger(StudentSlipException.class);

	private static final long serialVersionUID = -4232154013947983411L;

	private int code;

	public StudentSlipException() {
		this(null, HttpStatus.INTERNAL_SERVER_ERROR.value());
	}

	public StudentSlipException(String message) {
		this(message, HttpStatus.INTERNAL_SERVER_ERROR.value());
	}

	public StudentSlipException(String message, boolean useLogger) {
		this(useLogger ? null : message, HttpStatus.INTERNAL_SERVER_ERROR.value());
		if (useLogger) log.debug("# Class=[{}]; Message=[{}]", this.getClass().getSimpleName(), message);
	}

	public StudentSlipException(String message, int code) {
		super(StringUtils.hasText(message) ? message : "Please retry or contact the administrators");
		this.code = code;
	}

	public StudentSlipException(Throwable cause) {
		super(cause);
	}

	public StudentSlipException(String message, Throwable cause) {
		super(message, cause);
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
}
