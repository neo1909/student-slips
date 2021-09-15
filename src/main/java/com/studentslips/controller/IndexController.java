package com.studentslips.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.studentslips.common.SessionUtil;

@Controller
@RequestMapping("/")
public class IndexController {

	@GetMapping("")
	public String indexRedirect(HttpServletRequest req, HttpSession session) throws Exception {
		return "redirect:/index";
	}

	@GetMapping("index")
	public String index(HttpServletRequest req, HttpSession session) throws Exception {
		if (!SessionUtil.isAuthenticated() || session.getAttribute("login") == null  || !session.getAttribute("login").equals("OK")) {
			return "redirect:/login";
		}
		return "index";
	}

	@GetMapping("error")
	public String error(HttpServletResponse res, HttpServletRequest req, @RequestParam(required = false) String code) throws IOException {
		return "error/404";
	}

	@GetMapping("changePassword")
	public String changePassword(HttpServletRequest req, HttpSession session) throws Exception {
		return "profile/changePassword";
	}
}
