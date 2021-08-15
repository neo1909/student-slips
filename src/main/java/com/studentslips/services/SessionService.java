package com.studentslips.services;

import java.util.List;

import com.studentslips.entities.Session;

public interface SessionService {
	public List<Session> selectAllSessions(Session session);
	public int deleteSession(Session session);
}
