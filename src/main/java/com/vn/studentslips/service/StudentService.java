package com.vn.studentslips.service;

import com.vn.studentslips.entitys.Student;

import java.util.List;

public interface StudentService {
    public int insertStudent(Student student);
//    public int updateStudent(Student student);
//    public int deleteStudentById(int studentId);
    public List<Student> selectAllStudent();
    public Student selectStudentById(int studentId);
}
