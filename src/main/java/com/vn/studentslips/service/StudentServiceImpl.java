package com.vn.studentslips.service;

import com.vn.studentslips.entitys.Student;
import com.vn.studentslips.mapper.StudentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service(value = "StudentService")
public class StudentServiceImpl implements StudentService{

    @Autowired
    StudentMapper studentMapper;

    @Override
    public int insertStudent(Student student) {
        return studentMapper.insertStudent(student);
    }

    @Override
    public List<Student> selectAllStudent() {
        return studentMapper.selectAllStudent();
    }

    @Override
    public Student selectStudentById(int studentId) {
        return studentMapper.selectStudentById(studentId);
    }
}
