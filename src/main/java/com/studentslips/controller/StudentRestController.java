package com.studentslips.controller;


import com.studentslips.common.Common;
import com.studentslips.common.ErrorCode;
import com.studentslips.common.ResultEntity;
import com.studentslips.entities.Student;
import com.studentslips.services.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @RequestMapping(value = "/ST_R_02", method = RequestMethod.GET)
    public ResponseEntity<Student> getStudent(@RequestBody Student std) {

        Student student = studentService.selectStudentById(std.getId());
        if (student == null) {
            return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Student>(student, HttpStatus.OK);
    }

    @RequestMapping(value = "/ST_C_01", method = RequestMethod.POST)
    public ResponseEntity<?> addStudent(@RequestBody Student std){
        int dataStd = studentService.insertStudent(std);
        if (dataStd == 1) {
            return new ResponseEntity<Integer>(dataStd, HttpStatus.OK);
        }
        ResultEntity re = new ResultEntity(ErrorCode.INSERT_FAIL,"Can not create student");
        return new ResponseEntity<ResultEntity>(re, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/ST_U_01", method = RequestMethod.POST)
    public ResponseEntity<?> updateStudent(@RequestBody Student std){
        Student dataStd = studentService.selectStudentById(std.getId());
        if (dataStd == null) {
            ResultEntity re = new ResultEntity(ErrorCode.NOT_FOUND,"Not found student id: "+ std.getId());
            return new ResponseEntity<ResultEntity>(re, HttpStatus.NOT_FOUND);
        } else {
            studentService.updateStudent(std);
            return new ResponseEntity<Student>(std, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/ST_D_01", method = RequestMethod.POST)
    public ResponseEntity<?> deleteStudent(@RequestBody Student std) {

        Student student = studentService.selectStudentById(std.getId());
        if (student == null) {
            ResultEntity re = new ResultEntity(ErrorCode.NOT_FOUND,"Not found student id: "+ std.getId());
            return new ResponseEntity<ResultEntity>(re, HttpStatus.NOT_FOUND);
        }
        studentService.deleteStudentById(std);
        return new ResponseEntity<Student>(HttpStatus.OK);
    }
}
