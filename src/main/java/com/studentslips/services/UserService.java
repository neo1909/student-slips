package com.studentslips.services;

import java.util.List;

import com.studentslips.entities.AuthRegister;
import com.studentslips.entities.User;
import com.studentslips.entities.UserSearchResult;

public interface UserService {
	public int register(AuthRegister authRegister) throws Exception;
	public User selectUser(User user);
	public User selectUserWithRoles(User user);
	public List<UserSearchResult> searchAllUsers(User user);
	public int insertUser(User user) throws Exception;
	public int updateUser(User user);
	public int deleteUserById(User user);
	public int updateUserForAdmin(User user);
	public int approveUser(User user);
}
