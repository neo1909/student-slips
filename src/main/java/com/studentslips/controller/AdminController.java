package com.studentslips.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.studentslips.common.Common;
import com.studentslips.entities.User;
import com.studentslips.entities.UserRole;
import com.studentslips.services.UserRoleService;
import com.studentslips.services.UserService;

@Controller
@RequestMapping("/admin/")
public class AdminController {

	@Autowired
	private UserService userService;
	
	/**
	 * @Section User Management
	 * 
	 * */
	@GetMapping("user")
	public String manageUser(Model model) {
		return "user/manage";
	}
	
	@GetMapping("user/approve")
	public String approveUser(Model model, @RequestParam("id") String id) {
		User searchUser = new User(Integer.parseInt(id));
		model.addAttribute("user", userService.selectUser(searchUser));
		return "user/approve";
	}
	
	
	@GetMapping("user/create")
	public String createUser(Model model) {
		return "user/create";
	}
	
	@GetMapping("user/update")
	public String updateUser(Model model, @RequestParam("id") String id) {
		User searchUser = new User(Integer.parseInt(id));
		model.addAttribute("user", userService.selectUser(searchUser));
		return "user/update";
	}
	
	@GetMapping("user/assignRole")
	public String assignRole(Model model, @RequestParam("id") String id) {
		User searchUser = new User(Integer.parseInt(id));
		model.addAttribute("user", userService.selectUser(searchUser));
		return "user/assignRole";
	}

	/**
	 * @Section Session Management
	 * @TODO
	 * */
	@GetMapping("session")
	public String manageSession(Model model) {
		return "session/session";
	}

	/**
	 * @Section Role Management
	 * 
	 * */
	@GetMapping("role")
	public String manageRole(Model model) {
		return "role/role";
	}
	
	@GetMapping("role/create")
	public String createRole(Model model) {
		return "role/create";
	}

	/**
	 * @Section Log Management
	 * @TODO
	 * */
	@GetMapping("log")
	public String manageLog(Model model) {
		return "redirect:/index";
	}
}
