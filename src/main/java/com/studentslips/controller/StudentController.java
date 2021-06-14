package com.studentslips.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class StudentController {

    @GetMapping("student")
    public String getStudentPage() {
        return "student/student";
    }
}
