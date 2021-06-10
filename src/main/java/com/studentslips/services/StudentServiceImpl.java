package com.studentslips.services;

import com.studentslips.entities.Student;
import com.studentslips.dao.StudentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service(value = "StudentService")
public class StudentServiceImpl implements StudentService{

    @Autowired
    StudentDao studentDao;

    @Override
    public int insertStudent(Student student) {
        return studentDao.insertStudent(student);
    }

    @Override
    public List<Student> selectAllStudent() {
        return studentDao.selectAllStudent();
    }

    @Override
    public Student selectStudentById(int studentId) {
        return studentDao.selectStudentById(studentId);
    }
}
