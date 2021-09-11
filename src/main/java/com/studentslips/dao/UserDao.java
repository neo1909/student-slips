package com.studentslips.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studentslips.entities.User;
import com.studentslips.entities.UserSearchResult;

@Repository
public class UserDao {

	private final SqlSession sqlSession;

    public UserDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public User selectUser(User user) {
        return this.sqlSession.selectOne("selectUser", user);
    }
    
    public User selectUserWithRoles(User user) {
        return this.sqlSession.selectOne("selectUserWithRoles", user);
    }

	public int insertUser(User user) {
		return this.sqlSession.insert("insertUser", user);
	}

	public List<UserSearchResult> searchAllUsers(User user) {
		return this.sqlSession.selectList("searchAllUsers", user);
	}

	public int updateUser(User user) {
		return this.sqlSession.update("updateUser", user);
	}

	public int deleteUserById(User user) {
		return this.sqlSession.update("deleteUserById", user);
	}

	public int updateUserForAdmin(User user) {
		return this.sqlSession.update("updateUserForAdmin", user);
	}

	public int approveUser(User user) {
		return this.sqlSession.update("approveUser", user);
	}
}
