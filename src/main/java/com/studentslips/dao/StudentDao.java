package com.studentslips.dao;

import com.studentslips.entities.Student;

import java.util.List;

public interface StudentDao {
    public int insertStudent(Student student);
//    public int updateStudent(Student student);
//    public int deleteStudentById(int studentId);
    public List<Student> selectAllStudent();
    public Student selectStudentById(int studentId);
}
