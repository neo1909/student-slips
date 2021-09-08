package com.studentslips.entities;

public class SessionUser extends User {

	private static final long serialVersionUID = 1L;
	
	private String lang;

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}

}
