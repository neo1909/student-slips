package com.studentslips.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/data-entry/")
public class DataEntryController {
	
	/**
	 * @Section Data entry > Student
	 * 
	 * */
    @GetMapping("student")
    public String getStudentPage() {
        return "student/student";
    }

	/**
	 * @Section Data entry > Head teacher
	 * 
	 * */
    @GetMapping("headteacher")
    public String getHeadTeacherPage() {
        return "head-teacher/headTeacher";
    }

	/**
	 * @Section Data entry > School
	 * 
	 * */
    @GetMapping("school")
    public String getSchoolPage() {
        return "school/school";
    }

	/**
	 * @Section Data entry > Supplier
	 * 
	 * */
    @GetMapping("supplier")
    public String getSupplierPage() {
        return "supplierServices/supplier";
    }

	/**
	 * @Section Data entry > Service
	 * 
	 * */
    @GetMapping("service")
    public String getServicePage() {
        return "supplierServices/service";
    }

	/**
	 * @Section Data entry > Supplier service
	 * 
	 * */
    @GetMapping("supplier-service")
    public String getSupplierServicePage() {
        return "supplierServices/supplierService";
    }
}