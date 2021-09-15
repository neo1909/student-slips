package com.studentslips.services;

import com.studentslips.entities.Student;

import java.util.List;

public interface StudentService {
    public int insertStudent(Student student) throws Exception;
    public int updateStudent(Student student) throws Exception;
    public int deleteStudentById(int id) throws Exception;
    public List<Student> selectAllStudent(Student student) throws Exception;
    public Student selectStudentById(int studentId);
	public List<Student> getAllStudentsWithSchool(Student student) throws Exception;
    public Student selectStudentExist(Student student) throws Exception;
}
