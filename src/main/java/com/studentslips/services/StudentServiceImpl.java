package com.studentslips.services;

import com.studentslips.entities.Student;
import com.studentslips.dao.StudentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.sql.Timestamp;
import java.util.List;
@Service(value = "StudentService")
public class StudentServiceImpl implements StudentService{

    @Autowired
    StudentDao studentDao;

    @Override
    public int insertStudent(Student student) {
        student.setInsertId(100);
        student.setInsertDate(new Timestamp(System.currentTimeMillis()));
        return studentDao.insertStudent(student);
    }

    @Override
    public int updateStudent(Student student) {
        return studentDao.updateStudent(student);
    }

    @Override
    public int deleteStudentById(int studentId) {
        return studentDao.deleteStudentById(studentId);
    }

    @Override
    public List<Student> selectAllStudent(Student student) {
        return studentDao.selectAllStudent(student);
    }

    @Override
    public Student selectStudentById(int studentId) {
        return studentDao.selectStudentById(studentId);
    }

}
