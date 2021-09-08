package com.studentslips.security;

import java.sql.Timestamp;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studentslips.common.Common;
import com.studentslips.common.SecurityUtil;
import com.studentslips.common.StudentSlipException;
import com.studentslips.common.i18nUtil;
import com.studentslips.entities.SessionUser;
import com.studentslips.entities.User;
import com.studentslips.services.UserService;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationFilter.class);

	@Autowired
	private UserService userService;

	private BCryptPasswordEncoder passwordEncoder;
	
	@Value("${studentslips.secret}")
	private String secret;

	public CustomAuthenticationFilter(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = (BCryptPasswordEncoder) passwordEncoder;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
		if (!request.getMethod().equals("POST")) {
			throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
		}

		String username = obtainUsername(request);
		String encryptedPassword = obtainPassword(request);
		String password = "";
		String lang = request.getParameter("lang");
		lang = StringUtils.isEmpty(lang) ? "sr" : lang;

		User loginedUser = userService.selectUserWithRoles(new User(username));
		logger.debug("# CustomAuthenticationFilter || Logined User=[{}]", loginedUser);

		if (loginedUser == null) {
			throw new StudentSlipException(i18nUtil.getMessage(lang, Common.Message.USER_NOT_EXIST));
		}

		// Can't login if exceed 5 times retry within 15 mins
		long currentInUTC = System.currentTimeMillis();
		long current = currentInUTC + TimeZone.getDefault().getOffset(currentInUTC);
		if (loginedUser.getLastLoginDate() != null && "ACTIVE".equals(loginedUser.getStatus())) {
			long lastLoginTime = loginedUser.getLastLoginDate().getTime();
			long timeDiff = 1000 * 60 * 5 - (current - lastLoginTime);
			if (loginedUser.getLoginRetryCount() > 3 && timeDiff > 0) {
				throw new StudentSlipException(i18nUtil.getMessage(lang, Common.Message.TOO_MANY_TRY) + " (" + loginedUser.getLoginRetryCount() + "/6). " + i18nUtil.getMessage(lang, Common.Message.PLS_PROCEED_AFTER) + " " + TimeUnit.MILLISECONDS.toMinutes(timeDiff) + ":"
						+ (TimeUnit.MILLISECONDS.toSeconds(timeDiff) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(timeDiff))));
			}
		}
		
		try {
			password = SecurityUtil.decryptAESCBCPKCS5(encryptedPassword, secret);
		} catch (Exception e) {
			throw new StudentSlipException(i18nUtil.getMessage(lang, Common.Message.VERIFY_AUTH_NG));
		}

		if (!passwordEncoder.matches(password, loginedUser.getPassword()) && "ACTIVE".equals(loginedUser.getStatus())) {
			logger.debug("# CustomAuthenticationFilter || Wrong password [{}]", loginedUser);
			if (loginedUser.getLoginRetryCount() >= 5) {
				loginedUser.setStatus("DEACTIVE");
				userService.updateUser(loginedUser);
				throw new StudentSlipException(i18nUtil.getMessage(lang, Common.Message.LOCKED_ACCOUNT));
			}
			int currentLoginCount = loginedUser.getLoginRetryCount() + 1;
			loginedUser.setLastLoginDate(new Timestamp(current));
			loginedUser.setLoginRetryCount(currentLoginCount);
			userService.updateUser(loginedUser);
			throw new StudentSlipException(i18nUtil.getMessage(lang, Common.Message.INCORRECT_PWD) + " (" + currentLoginCount + "/6).");
		}

		if (!"ACTIVE".equals(loginedUser.getStatus())) {
			logger.debug("# CustomAuthenticationFilter || Locked account [{}]", loginedUser);
			throw new StudentSlipException(i18nUtil.getMessage(lang, Common.Message.LOCKED_ACCOUNT));
		}
		
		SessionUser sessionUser = new SessionUser();
		sessionUser.setId(loginedUser.getId());
		sessionUser.setUsername(loginedUser.getUsername());
		sessionUser.setPassword(loginedUser.getPassword());
		sessionUser.setSchoolId(loginedUser.getSchoolId());
		sessionUser.setEmail(loginedUser.getEmail());
		sessionUser.setFullName(loginedUser.getFullName());
		sessionUser.setStatus(loginedUser.getStatus());
		sessionUser.setRoles(loginedUser.getRoles());
		sessionUser.setUserType(loginedUser.getUserType());
		sessionUser.setDelYn(loginedUser.getDelYn());
		sessionUser.setLang(lang);

		UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(sessionUser, sessionUser.getPassword(), sessionUser.getAuthorities());

		return authRequest;
	}
}