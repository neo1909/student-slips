package com.studentslips.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.LocaleResolver;

import com.studentslips.common.ResponseObject;
import com.studentslips.common.SecurityUtil;
import com.studentslips.common.SessionUtil;
import com.studentslips.common.StudentSlipException;
import com.studentslips.common.i18nUtil;
import com.studentslips.entities.AuthRegister;
import com.studentslips.entities.User;
import com.studentslips.services.UserService;

@RestController
@RequestMapping("api")
public class IndexRestController {
	
	@Value("${studentslips.secret}")
	private String secret;
	
	@Resource
    private LocaleResolver localeResolver;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserService userService;

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
	
	@RequestMapping(value = "/P_CHG_01", method = RequestMethod.POST)
	public Map<String, Object> changePassword(@RequestBody AuthRegister authRegister) throws IOException {
		try {
			User currentUser = userService.selectUserWithRoles(new User(SessionUtil.getUserLoginId()));
			String newPassword = SecurityUtil.decryptAESCBCPKCS5(authRegister.getNewPassword(), secret);
			String inputOldPassword = SecurityUtil.decryptAESCBCPKCS5(authRegister.getCurrentPassword(), secret);
			String currentPassword = currentUser.getPassword();
			
			if (!passwordEncoder.matches(inputOldPassword, currentPassword)) {
				throw new StudentSlipException(i18nUtil.getMessage(SessionUtil.getLang(), "lang.msg.incorrectCurrPassword"));
			}
			
			if (passwordEncoder.matches(newPassword, currentPassword)) {
				throw new StudentSlipException(i18nUtil.getMessage(SessionUtil.getLang(), "lang.msg.newPasswordMustBeDifferent"));
			}
			User user = new User();
			user.setId(SessionUtil.getUserLoginId());
			user.setPassword(passwordEncoder.encode(newPassword));
			userService.updateUserForAdmin(user);
			ResponseObject res = new ResponseObject(200, i18nUtil.getMessage(SessionUtil.getLang(), "lang.msg.changePasswordOk"), true);
			return res.toMap();
		} catch (StudentSlipException e) {
			throw e;
		} catch (Exception e) {
			ResponseObject res = new ResponseObject(500, i18nUtil.getMessage(SessionUtil.getLang(), "lang.msg.changePasswordNg"), false);
			return res.toMap();
		}
	}

}