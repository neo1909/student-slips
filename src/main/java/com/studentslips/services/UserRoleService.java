package com.studentslips.services;

import java.util.List;

import com.studentslips.entities.UserRole;

public interface UserRoleService {
	public List<UserRole> selectAllUserRoles(UserRole userRole);
	public int insertMultiUserRole(UserRole userRole);
	public int deleteMultiUserRoleNotIn(UserRole userRole);
}
