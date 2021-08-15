package com.studentslips.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentslips.dao.UserRoleDao;
import com.studentslips.entities.UserRole;

@Service
public class UserRoleServiceImpl implements UserRoleService {

	@Autowired
	private UserRoleDao userRoleDao;
	
	@Override
	public List<UserRole> selectAllUserRoles(UserRole userRole) {
		return userRoleDao.selectAllUserRoles(userRole);
	}

	@Override
	public int insertMultiUserRole(UserRole userRole) {
		deleteMultiUserRoleNotIn(userRole);
		return userRoleDao.insertMultiUserRole(userRole);
	}

	@Override
	public int deleteMultiUserRoleNotIn(UserRole userRole) {
		return userRoleDao.deleteMultiUserRoleNotIn(userRole);
	}

}
