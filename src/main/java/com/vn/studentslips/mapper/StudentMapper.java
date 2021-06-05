package com.vn.studentslips.mapper;

import com.vn.studentslips.entitys.Student;

import java.util.List;

public interface StudentMapper {
    public int insertStudent(Student student);
//    public int updateStudent(Student student);
//    public int deleteStudentById(int studentId);
    public List<Student> selectAllStudent();
    public Student selectStudentById(int studentId);
}
