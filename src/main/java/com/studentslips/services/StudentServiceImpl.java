package com.studentslips.services;

import com.studentslips.common.SessionUtil;
import com.studentslips.dao.StudentsDao;
import com.studentslips.entities.Student;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.sql.Timestamp;
import java.util.List;
@Component(value = "StudentService")
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentsDao studentDao;

    @Override
    public int insertStudent(Student student) throws Exception {
        student.setInsertId(SessionUtil.getUserLoginId());
        student.setSchoolId(SessionUtil.getSchoolId());

       return studentDao.insertStudent(student);
    }

    @Override
    public int updateStudent(Student student) throws Exception {
        student.setUpdateId(SessionUtil.getUserLoginId());
        return studentDao.updateStudent(student);
    }

    @Override
    public int deleteStudentById(int id) throws Exception {
        Student student = new Student();
        student.setId(id);
        student.setUpdateId(SessionUtil.getUserLoginId());
        student.setSchoolId(SessionUtil.getSchoolId());
        return studentDao.deleteStudentById(student);
    }

    @Override
    public List<Student> selectAllStudent(Student student) throws Exception {
        student.setSchoolId(SessionUtil.getSchoolId());
        return studentDao.selectAllStudent(student);
    }

    @Override
    public Student selectStudentById(int id) {
       return studentDao.selectStudentById(id);
    }


    private String genStudentId(String index){
        String sqStudentId= null;
        if(index == null){
            return "0001";
        }

        int length = index.length();
        int sqIndex= Integer.valueOf(index) +1;
        if (length == 1){
            sqStudentId = "000"+sqIndex;
        } else if (length == 2) {
            sqStudentId = "00"+sqIndex;
        } else if (length == 3) {
            sqStudentId = "0"+sqIndex;
        }else {
            sqStudentId = String.valueOf(sqIndex);
        }
        return sqStudentId;
    }
}
