package com.studentslips.services;

import com.studentslips.dao.StudentsDao;
import com.studentslips.entities.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.sql.Timestamp;
import java.util.List;
@Component(value = "StudentService")
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentsDao studentDao;

    @Override
    public int insertStudent(Student student) {
        student.setInsertId(100);
        student.setInsertDate(new Timestamp(System.currentTimeMillis()));
       return studentDao.insertStudent(student);
    }

    @Override
    public int updateStudent(Student student) {
        student.setUpdateId(100);
        student.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        return studentDao.updateStudent(student);
    }

    @Override
    public int deleteStudentById(Student student) {

        student.setUpdateId(100);
        student.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        return studentDao.deleteStudentById(student);
    }

    @Override
    public List<Student> selectAllStudent(Student student) throws Exception {
        return studentDao.selectAllStudent(student);
    }

    @Override
    public Student selectStudentById(int studentId) {
       return studentDao.selectStudentById(studentId);
    }

}
