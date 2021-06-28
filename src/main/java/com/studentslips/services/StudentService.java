package com.studentslips.services;

import com.studentslips.entities.Student;

import java.util.List;

public interface StudentService {
    public int insertStudent(Student student);
    public int updateStudent(Student student);
    public int deleteStudentById(Student student);
    public List<Student> selectAllStudent(Student student) throws Exception;
    public Student selectStudentById(int studentId);
}
