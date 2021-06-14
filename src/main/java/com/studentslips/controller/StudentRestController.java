package com.studentslips.controller;


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

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("api")
public class StudentRestController {
    private static final Logger logger = LoggerFactory.getLogger(StudentRestController.class);

    @Autowired
    private StudentService studentService;

    @RequestMapping(value = "/ST_R_01", method = RequestMethod.GET)
    public ResponseEntity<List<Student>> getAll(@RequestBody Student std){
        List<Student> listStudent = studentService.selectAllStudent(std);
        if(listStudent.isEmpty()){
            return new ResponseEntity<List<Student>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Student>>(listStudent, HttpStatus.OK);
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
            dataStd.setName(std.getName());
            dataStd.setsClass(std.getsClass());
            dataStd.setGrade(std.getGrade());
            dataStd.setUpdateId(100);
            dataStd.setUpdateDate(new Timestamp(System.currentTimeMillis()));
            studentService.updateStudent(dataStd);
            return new ResponseEntity<Student>(dataStd, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/ST_D_01", method = RequestMethod.POST)
    public ResponseEntity<?> deleteStudent(@RequestBody Student std) {

        Student student = studentService.selectStudentById(std.getId());
        if (student == null) {
            ResultEntity re = new ResultEntity(ErrorCode.NOT_FOUND,"Not found student id: "+ std.getId());
            return new ResponseEntity<ResultEntity>(re, HttpStatus.NOT_FOUND);
        }
        std.setDelYn("Y");
        std.setUpdateId(100);
        std.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        studentService.updateStudent(std);
        return new ResponseEntity<Student>(HttpStatus.OK);
    }
}
