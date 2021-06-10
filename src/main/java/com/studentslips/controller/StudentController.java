package com.studentslips.controller;


import com.studentslips.entities.Student;
import com.studentslips.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("api")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/students_01", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<Student>> getAll(){
        List<Student> listStudent = studentService.selectAllStudent();
        if(listStudent.isEmpty()){
            return new ResponseEntity<List<Student>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Student>>(listStudent, HttpStatus.OK);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/students_02", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Student> getUser(@RequestBody Student std) {

        Student student = studentService.selectStudentById(std.getId());
        if (student == null) {
            System.out.println("Student with id " + std.getId() + " not found");
            return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Student>(student, HttpStatus.OK);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/students_03", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addStudent(@RequestBody Student std){
        int dataStd = studentService.insertStudent(std);
        if (dataStd == 1) {
            return new ResponseEntity<Integer>(dataStd, HttpStatus.OK);
        }
        return new ResponseEntity<String>("Can not create student ", HttpStatus.NOT_FOUND);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/students_04", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateStudent(@RequestBody Student std){
        Student dataStd = studentService.selectStudentById(std.getId());
        if (dataStd == null) {
            return new ResponseEntity<String>("Not found student id: "+ std.getId(), HttpStatus.NOT_FOUND);
        } else {
            dataStd.setName(std.getName());
            dataStd.setSchoolId(std.getSchoolId());
            dataStd.setUpdateId(100);
            studentService.updateStudent(dataStd);
            return new ResponseEntity<Student>(dataStd, HttpStatus.OK);
        }
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/students_05", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Student> deleteStudent(@RequestBody Student std) {

        Student student = studentService.selectStudentById(std.getId());
        if (student == null) {
            System.out.println("Unable to delete. Student with id " + std.getId() + " not found");
            return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
        }

        studentService.deleteStudentById(std.getId());
        return new ResponseEntity<Student>(HttpStatus.OK);
    }

    @CrossOrigin(origins = "/**")
    @RequestMapping(value = "/students_06", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<Student>> searchStudent(@RequestBody Student std) {

        List<Student> listStudent = studentService.selectAllStudent();
        if(listStudent.isEmpty()){
            return new ResponseEntity<List<Student>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Student>>(listStudent, HttpStatus.OK);
    }
}
