package com.studentslips.services;

import com.studentslips.entities.Student;

import java.util.List;

public interface StudentService {
    public int insertStudent(Student student);
//    public int updateStudent(Student student);
//    public int deleteStudentById(int studentId);
    public List<Student> selectAllStudent();
    public Student selectStudentById(int studentId);
}
