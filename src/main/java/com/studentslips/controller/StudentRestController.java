package com.studentslips.controller;


import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studentslips.common.Common;
import com.studentslips.common.ErrorCode;
import com.studentslips.common.ResultEntity;
import com.studentslips.entities.Student;
import com.studentslips.services.StudentService;

@RestController
@RequestMapping("api")
public class StudentRestController {
    private static final Logger logger = LoggerFactory.getLogger(StudentRestController.class);

    @Autowired
    private StudentService studentService;

    @RequestMapping(value = "/ST_R_01", method = RequestMethod.POST)
    public Map<String, ?> getAll(@RequestBody(required = false) Student std) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, studentService.selectAllStudent(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/ST_R_02", method = RequestMethod.POST)
    public Map<String, ?> getStudent(@RequestBody Student student) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.OBJECT, studentService.selectStudentById(student.getId()));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/ST_C_01", method = RequestMethod.POST)
    public Map<String,?> addStudent(@RequestBody Student std){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = studentService.insertStudent(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/ST_U_01", method = RequestMethod.POST)
    public Map<String,?> updateStudent(@RequestBody Student std){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = studentService.updateStudent(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/ST_D_01", method = RequestMethod.POST)
    public Map<String,?> deleteStudent(@RequestBody Student student) {

        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = studentService.deleteStudentById(student.getId());
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }
}
