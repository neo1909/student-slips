package com.studentslips.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class StudentDebtsController {

    @GetMapping("studentDebts")
    public String getStudentDebtsPage() {
        return "studentDebts/studentDebts";
    }
}
