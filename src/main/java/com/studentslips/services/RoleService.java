package com.studentslips.services;

import java.util.List;

import com.studentslips.entities.Role;

public interface RoleService {
	public List<Role> selectAll(Role role) throws Exception;
	public int insertRole(Role role);
	public int deleteRole(Role role);
}
