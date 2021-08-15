package com.studentslips.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studentslips.entities.UserRole;

@Repository
public class UserRoleDao {
	private final SqlSession sqlSession;

    public UserRoleDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

	public int insertUserRole(UserRole userRole) {
		return this.sqlSession.insert("insertUserRole", userRole);
	}

	public List<UserRole> selectAllUserRoles(UserRole userRole) {
		return this.sqlSession.selectList("selectAllUserRoles", userRole);
	}

	public int insertMultiUserRole(UserRole userRole) {
		return this.sqlSession.insert("insertMultiUserRole", userRole);
	}

	public int deleteMultiUserRoleNotIn(UserRole userRole) {
		return this.sqlSession.update("deleteMultiUserRoleNotIn", userRole);
	}
	
}
