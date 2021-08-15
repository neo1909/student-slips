package com.studentslips.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studentslips.entities.Role;

@Repository
public class RoleDao {

    private final SqlSession sqlSession;

    public RoleDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public Role selectByName(String name) throws Exception {
        return this.sqlSession.selectOne("selectByName", name);
    }

	public List<Role> selectAll(Role role) {
		return this.sqlSession.selectList("selectAll", role);
	}
	
	public int insertRole(Role role) {
		return this.sqlSession.insert("insertRole", role);
	}
	
	public int deleteRole(Role role) {
		return this.sqlSession.update("deleteRole", role);
	}

}
