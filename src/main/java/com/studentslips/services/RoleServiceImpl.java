package com.studentslips.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentslips.dao.RoleDao;
import com.studentslips.entities.Role;

@Service
public class RoleServiceImpl implements RoleService {
	
	@Autowired
	private RoleDao roleDao;
	
	@Override
	public List<Role> selectAll(Role role) throws Exception {
		return roleDao.selectAll(role);
	}

	@Override
	public int insertRole(Role role) {
		return roleDao.insertRole(role);
	}

	@Override
	public int deleteRole(Role role) {
		return roleDao.deleteRole(role);
	}

}
