package com.studentslips.common;

import java.util.Locale;
import java.util.ResourceBundle;

public class i18nUtil {
	
	public static String getMessage(String language, String text) {
		i18nLocale locale = i18nLocale.getByLanguage(language);
		ResourceBundle rscBundle = ResourceBundle.getBundle("i18n.messages", new Locale(locale.getLanguage(), locale.getCountry()));
		return rscBundle.getString(text);
	}
}
