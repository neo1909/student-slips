package com.studentslips.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/overview/")
public class OverviewController {

	/**
	 * @Section Overview > Student
	 * 
	 * */
//	@GetMapping("class")
//	public String manageOverviewStudent(Model model) {
//		return "overview/overviewStudent";
//	}
	
	/**
	 * @Section Overview > Class
	 * 
	 * */
	@GetMapping("class")
	public String manageOverviewClass(Model model) {
		return "overview/overviewClass";
	}
	
	/**
	 * @Section Overview > School
	 * 
	 * */
//	@GetMapping("class")
//	public String manageOverviewSchool(Model model) {
//		return "overview/overviewSchool";
//	}
}