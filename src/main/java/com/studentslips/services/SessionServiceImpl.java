package com.studentslips.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentslips.dao.SessionDao;
import com.studentslips.entities.Session;

@Service
public class SessionServiceImpl implements SessionService {
	
	@Autowired
	private SessionDao sessionDao;

	@Override
	public List<Session> selectAllSessions(Session session) {
		return sessionDao.selectAllSessions(session);
	}

	@Override
	public int deleteSession(Session session) {
		return sessionDao.deleteSession(session);
	}

}
