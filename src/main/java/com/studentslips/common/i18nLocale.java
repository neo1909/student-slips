package com.studentslips.common;

public enum i18nLocale {
	Serbian("sr", "RS"), English("en", "US");

	private String language;
	private String country;

	private i18nLocale(String language, String country) {
		this.language = language;
		this.country = country;
	}
	
	public static i18nLocale getByLanguage(String language) {
		for (i18nLocale locale: values()) {
			if (locale.getLanguage().equals(language)) return locale;
		}
		return null;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

}
