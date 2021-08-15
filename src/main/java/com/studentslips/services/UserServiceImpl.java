package com.studentslips.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.studentslips.common.StudentSlipException;
import com.studentslips.dao.RoleDao;
import com.studentslips.dao.UserDao;
import com.studentslips.dao.UserRoleDao;
import com.studentslips.entities.AuthRegister;
import com.studentslips.entities.Role;
import com.studentslips.entities.User;
import com.studentslips.entities.UserRole;
import com.studentslips.entities.UserSearchResult;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;
    
    @Autowired
    UserRoleDao userRoleDao;
    
    @Autowired
    RoleDao roleDao;
    
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    
	@Override
	public int register(AuthRegister authRegister) throws Exception {
		
		User checkUsernameUser = new User();
		checkUsernameUser.setUsername(authRegister.getUsername());
		if (isUserExisted(checkUsernameUser)) throw new StudentSlipException("Username has already been taken.");

		User checkEmailUser = new User();
		checkEmailUser.setEmail(authRegister.getEmail());
		if (isUserExisted(checkEmailUser)) throw new StudentSlipException("E-mail has already been taken.");
		
		User user = new User();
		user.setFullName(authRegister.getFullName());
		user.setEmail(authRegister.getEmail());
		user.setUsername(authRegister.getUsername());
		user.setPassword(passwordEncoder.encode(authRegister.getPassword()));
		user.setLoginRetryCount(0);
		user.setStatus("ACTIVE");
		user.setSchoolId(authRegister.getSchoolId());
		Role roleUser = roleDao.selectByName("USER");
		List<Role> roles = new ArrayList<>();
		roles.add(roleUser);
		user.setRoles(roles);
		int cntInsertUser = userDao.insertUser(user);
		if (cntInsertUser > 0) {
			UserRole userRole = new UserRole();
			userRole.setRoleId(roleUser.getId());
			userRole.setUserId(user.getId());
			int cntInsertUserRole = userRoleDao.insertUserRole(userRole);
			if (cntInsertUserRole > 0) {
				return 1;
			}
		}
		return 0;
	}
	
	private boolean isUserExisted(User user) {
		return (selectUser(user) != null);
	}

	@Override
	public User selectUser(User user) {
		return userDao.selectUser(user);
	}

	@Override
	public User selectUserWithRoles(User user) {
		return userDao.selectUserWithRoles(user);
	}

	@Override
	public List<UserSearchResult> searchAllUsers(User user) {
		return userDao.searchAllUsers(user);
	}

	@Override
	public int insertUser(User user) throws Exception {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setLoginRetryCount(0);
		user.setStatus("ACTIVE");
		Role roleUser = roleDao.selectByName("USER");
		List<Role> roles = new ArrayList<>();
		roles.add(roleUser);
		user.setRoles(roles);
		int cntInsertUser = userDao.insertUser(user);
		if (cntInsertUser > 0) {
			UserRole userRole = new UserRole();
			userRole.setRoleId(roleUser.getId());
			userRole.setUserId(user.getId());
			int cntInsertUserRole = userRoleDao.insertUserRole(userRole);
			if (cntInsertUserRole > 0) {
				return 1;
			}
		}
		return 0;
	}

	@Override
	public int updateUser(User user) {
		return userDao.updateUser(user);
	}

	@Override
	public int deleteUserById(User user) {
		return userDao.deleteUserById(user);
	}

}
