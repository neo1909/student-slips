package com.studentslips.security;

import java.sql.Timestamp;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.studentslips.entities.User;
import com.studentslips.services.UserService;
import com.studentslips.services.UserSessionService;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserSessionService userSessionService;
	
	private BCryptPasswordEncoder passwordEncoder;
	
	public CustomAuthenticationFilter(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = (BCryptPasswordEncoder) passwordEncoder;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
		if (!request.getMethod().equals("POST")) {
			throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
		}
		
		String username = obtainUsername(request);
		username = (username != null) ? username.trim() : "";
		String password = obtainPassword(request);
		password = (password != null) ? password.trim() : "";

		User loginedUser = userService.selectUserWithRoles(new User(username));
		
		if (loginedUser == null) {
			throw new AuthenticationServiceException("User does not exist");
		}

		// Can't login if exceed 5 times retry within 15 mins
		long currentInUTC = System.currentTimeMillis();
		long current = currentInUTC + TimeZone.getDefault().getOffset(currentInUTC);
		if (loginedUser.getLastLoginDate() != null && "ACTIVE".equals(loginedUser.getStatus())) {			
			long lastLoginTime = loginedUser.getLastLoginDate().getTime();
			long timeDiff = 1000*60*5 - (current - lastLoginTime);
			if (loginedUser.getLoginRetryCount() > 3 && timeDiff > 0) {
				throw new AuthenticationServiceException("Too many try (" + loginedUser.getLoginRetryCount() + "/6). Please proceed after " + TimeUnit.MILLISECONDS.toMinutes(timeDiff) + ":" + (TimeUnit.MILLISECONDS.toSeconds(timeDiff) - 
					    TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(timeDiff))));
			}
		}
		
		if (!passwordEncoder.matches(password, loginedUser.getPassword()) && "ACTIVE".equals(loginedUser.getStatus())) {
			if (loginedUser.getLoginRetryCount() >= 5) {
				loginedUser.setStatus("DEACTIVE");
				userService.updateUser(loginedUser);
				throw new AuthenticationServiceException("Account is locked due to too many try. Please contact admin for support");
			}
			int currentLoginCount = loginedUser.getLoginRetryCount() + 1;
			loginedUser.setLastLoginDate(new Timestamp(current));
			loginedUser.setLoginRetryCount(currentLoginCount);
			userService.updateUser(loginedUser);
			throw new AuthenticationServiceException("Password is not correct (" + currentLoginCount + "/6)." );
		}
		
		if (!"ACTIVE".equals(loginedUser.getStatus())) {
			throw new AuthenticationServiceException("Account is locked. Please contact the administrator for support.");
		}

		UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(loginedUser, loginedUser.getPassword(), loginedUser.getAuthorities());
		
		return authRequest;
	}
}