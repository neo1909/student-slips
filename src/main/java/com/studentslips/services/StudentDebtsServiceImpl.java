package com.studentslips.services;

import com.studentslips.dao.StudentDebtsDao;
import com.studentslips.entities.StudentDebtsObject;
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

    @Override
    public List<StudentsDebts> search(StudentsDebts studentsDebts) throws Exception {

        return studentDebtsDao.search(studentsDebts);
    }

    @Override
    public void insertStudentsDebtsObj(StudentDebtsObject studentDebtsObject) {

        List<StudentsDebts> studentsDebtsList = studentDebtsObject.getStudentsDebtsList();
        if(!studentsDebtsList.isEmpty()){
            for (StudentsDebts sd : studentsDebtsList){
                sd.setPrice(studentDebtsObject.getPrice());
                sd.setsClass(studentDebtsObject.getsClass());
                sd.setGrade(studentDebtsObject.getGrade());
                sd.setSuppliersId(studentDebtsObject.getSuppliersId());
                sd.setServiceId(studentDebtsObject.getServiceId());
                sd.setDebitDate(studentDebtsObject.getDebitDate());
                sd.setPurpose(studentDebtsObject.getPurpose());
                studentDebtsDao.insertStudentsDebts(sd);
            }
        }
    }

    @Override
    public void updateStudentsDebtsObj(StudentDebtsObject studentDebtsObject) {
        List<StudentsDebts> updateStudentsDebtsList = studentDebtsObject.getStudentsDebtsList();
        if(!updateStudentsDebtsList.isEmpty()){
            for (StudentsDebts sd : updateStudentsDebtsList){
                studentDebtsDao.updateStudentsDebts(sd);
            }
        }
    }
}
