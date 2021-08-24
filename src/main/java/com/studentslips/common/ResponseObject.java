package com.studentslips.common;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @Usage
 * 	To normalize API response
 * @Constructor
 * 	int code: 200/400/401/500/...
 * 	Object data
 * 	String message
 * 	String status: NG/OK
 * 	String timestamp: dd-MM-yyyy HH:mm:ss
 * 
 * */
public class ResponseObject {
	private int code;
	private String status;
	private String timestamp;
	private String message;
	private Object data;

	public ResponseObject() {
	};

	public ResponseObject(int code, String message, boolean isSuccess) {
		 this(code, message, isSuccess, null);
	}

	public ResponseObject(int code, String message, boolean isSuccess, Object data) {
		this.status = StudentSlipConstants.Api.FAILURE;
		this.code = code;
		if (isSuccess) {
			this.status = StudentSlipConstants.Api.SUCCESS;
			this.code = 200;
		}
		Date os = new Date();
		SimpleDateFormat sdformat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		this.timestamp = sdformat.format(os);
		this.message = message;
		this.data = data;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

}