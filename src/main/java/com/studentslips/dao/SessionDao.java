package com.studentslips.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studentslips.entities.Session;

@Repository
public class SessionDao {

	private final SqlSession sqlSession;

    public SessionDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

	public List<Session> selectAllSessions(Session session) {
		return this.sqlSession.selectList("selectAllSessions", session);
	}
	public int deleteSession(Session session) {
		return this.sqlSession.update("deleteSession", session);
	}
}
