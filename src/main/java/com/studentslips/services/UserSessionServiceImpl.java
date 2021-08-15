package com.studentslips.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentslips.dao.UserSessionDao;
import com.studentslips.entities.UserSession;

@Service
public class UserSessionServiceImpl implements UserSessionService {

    @Autowired
    UserSessionDao userSessionDao;
    
	@Override
	public UserSession selectUserSession(UserSession userSession) {
		return userSessionDao.selectUserSession(userSession);
	}

	@Override
	public int insertUserSession(UserSession userSession) {
		return userSessionDao.insertUserSession(userSession);
	}

	@Override
	public int countUserSession(UserSession userSession) {
		return userSessionDao.countUserSession(userSession);
	}

	@Override
	public int deleteUserSession(UserSession userSession) {
		return userSessionDao.deleteUserSession(userSession);
	}

}
