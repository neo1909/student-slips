package com.studentslips.services;

import com.studentslips.dao.StudentDebtsDao;
import com.studentslips.entities.StudentsDebts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service(value = "StudentDebtsService")
public class StudentDebtsServiceImpl implements StudentDebtsService{

    @Autowired
    StudentDebtsDao studentDebtsDao;

    @Override
    public List<StudentsDebts> selectStudentDebts(StudentsDebts studentsDebts) throws Exception {
        return studentDebtsDao.selectStudentDebts(studentsDebts);
    }

    @Override
    public int insertStudentsDebts(StudentsDebts studentsDebts) {
        studentsDebts.setInsertId(100);
        studentsDebts.setInsertDate(new Timestamp(System.currentTimeMillis()));
        return studentDebtsDao.insertStudentsDebts(studentsDebts);
    }

    @Override
    public int updateStudentsDebts(StudentsDebts studentsDebts) {
        studentsDebts.setUpdateId(100);
        studentsDebts.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        return studentDebtsDao.updateStudentsDebts(studentsDebts);
    }

    @Override
    public int deleteStudentsDebtsById(StudentsDebts studentsDebts) {
        studentsDebts.setUpdateId(100);
        studentsDebts.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        return studentDebtsDao.deleteStudentsDebtsById(studentsDebts);
    }
}
