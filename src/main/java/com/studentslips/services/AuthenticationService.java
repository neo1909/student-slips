package com.studentslips.services;

import com.studentslips.entities.User;

public interface AuthenticationService {
	public void logout(String sessionId);

	public int resetPassword(User user);

	int checkPassword(User user);
}
