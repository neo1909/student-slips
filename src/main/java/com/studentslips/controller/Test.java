package com.studentslips.controller;

import com.studentslips.config.AppConfig;
import com.studentslips.entities.Student;
import com.studentslips.services.StudentService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import java.util.List;

public class Test {
    public static void main(String[] args) {
        AbstractApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        StudentService studentService = (StudentService) context.getBean("StudentService");

        // create student
        Student student1 = new Student();
        student1.setDelYn(1);
        student1.setName("Jame");
        student1.setSchoolId(1);
        student1.setInsertId(1);

      //  studentService.insertStudent(student1);

        List<Student> lst = studentService.selectAllStudent();
       int i =  lst.size();
    }
}
