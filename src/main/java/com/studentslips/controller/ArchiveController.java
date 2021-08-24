package com.studentslips.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/archive")
public class ArchiveController {
	
	/**
	 * @Section Archive > Task archive
	 * 
	 * */
	@GetMapping("task-archive")
	public String getStudentDebtsPage() {
		return "task-archive/taskArchive";
	}

	
	/**
	 * @Section Archive > Bank statements
	 * 
	 * */
	@GetMapping("bank-statement")
	public String getBankStatementPage() {
		return "bankStatement/bankStatement";
	}
}
