package com.studentslips.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studentslips.entities.UserSession;

@Repository
public class UserSessionDao {
	private final SqlSession sqlSession;

    public UserSessionDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public UserSession selectUserSession(UserSession userSession) {
        return this.sqlSession.selectOne("selectUserSession", userSession);
    }

	public int insertUserSession(UserSession userSession) {
		return this.sqlSession.insert("insertUserSession", userSession);
	}

	public int countUserSession(UserSession userSession) {
		return this.sqlSession.selectOne("countUserSession", userSession);
	}

	public int deleteUserSession(UserSession userSession) {
		return this.sqlSession.delete("deleteUserSession", userSession);
	}
}
