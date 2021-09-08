package com.studentslips.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.LocaleResolver;

import com.studentslips.common.SessionUtil;

@RestController
@RequestMapping("api")
public class IndexRestController {
	
	@Resource
    private LocaleResolver localeResolver;

	@RequestMapping(value = "/LANG_01", method = RequestMethod.GET)
	public void setLocale(HttpServletResponse res, HttpServletRequest req, HttpSession session, @RequestParam("lang") String lang) throws IOException {
		Locale locale = new Locale(lang, lang.toUpperCase());
		localeResolver.setLocale(req, res, locale);
		session.setAttribute("lang", lang);
		SessionUtil.setLang(lang);
	}
	
	@RequestMapping(value = "/LANG_02", method = RequestMethod.GET)
	public Map<String, Object> getCurrentLanguage() throws IOException {
		Map<String, Object> result = new HashMap<>();
		result.put("lang", LocaleContextHolder.getLocale().getLanguage());
		return result;
	}

}