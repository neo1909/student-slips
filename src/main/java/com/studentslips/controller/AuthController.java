package com.studentslips.controller;

import javax.servlet.http.HttpSession;

import org.springframework.security.web.WebAttributes;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.studentslips.common.SessionUtil;

@Controller
@RequestMapping("/")
public class AuthController {

	@GetMapping("login")
	public String login(HttpSession session, Model model) throws Exception {
		
		boolean isAuthenticated = SessionUtil.isAuthenticated();
		if (isAuthenticated) {
			return "redirect:/index";
		}
		
		if (session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION) != null) {
			Throwable exception = (Throwable) session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
			model.addAttribute("errorMessage", exception.getMessage());
			session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
		}
		
		return "auth/auth";
	}
	
	@GetMapping("comp/login-component")
	public String loginComponent() {
		return "auth/login-panel";
	}
	
	@GetMapping("comp/register-component")
	public String registerComponent() {
		return "auth/register-panel";
	}
	
	@GetMapping("comp/resetPassword-component")
	public String resetPasswordComponent() {
		return "auth/resetPassword-panel";
	}

}