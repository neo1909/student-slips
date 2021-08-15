package com.studentslips.services;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.studentslips.common.SessionUtil;
import com.studentslips.entities.User;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	public void logout(String sessionId) {
		if (SessionUtil.isAuthenticated()) {
			SecurityContextHolder.getContext().setAuthentication(null);
			SecurityContextHolder.clearContext();
		}
	}

	@Override
	public int checkPassword(User user) {
		String inputEmail = user.getEmail();
		User dbUser = userService.selectUser(user);
		if (!dbUser.getEmail().equals(inputEmail)) {
			return 0;
		}
		return 1;
	}

	@Override
	public int resetPassword(User user) {
		String newRandomPassword = RandomStringUtils.randomAscii(33, 125).substring(0, 8);
		User dbUser = userService.selectUser(user);
		dbUser.setPassword(passwordEncoder.encode(newRandomPassword));
		int cnt = userService.updateUser(dbUser);
		if (cnt > 0) {			
			emailService.sendSimpleMessage(user.getEmail(), "[Student Slips] Reset password e-mail", "Your password has been reset: " + newRandomPassword);
			return cnt;
		}
		return -1;
	}
}
