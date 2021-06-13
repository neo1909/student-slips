package com.studentslips.dao;

import com.studentslips.entities.Student;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface StudentDao {
    public int insertStudent(Student student);
    public int updateStudent(Student student);
    public int deleteStudentById(int studentId);
    public List<Student> selectAllStudent(Student student);
    public Student selectStudentById(int studentId);
}
