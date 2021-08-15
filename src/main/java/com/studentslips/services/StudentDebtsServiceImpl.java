package com.studentslips.services;

import com.studentslips.common.SessionUtil;
import com.studentslips.dao.StudentDebtsDao;
import com.studentslips.entities.StudentDebtsObject;
import com.studentslips.entities.StudentsDebts;
import com.studentslips.entities.TaskArchiveSearch;
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
    public int insertStudentsDebts(StudentsDebts studentsDebts) throws Exception {
        studentsDebts.setInsertId(SessionUtil.getUserLoginId());
        return studentDebtsDao.insertStudentsDebts(studentsDebts);
    }

    @Override
    public int updateStudentsDebts(StudentsDebts studentsDebts) throws Exception {
        studentsDebts.setUpdateId(SessionUtil.getUserLoginId());
        return studentDebtsDao.updateStudentsDebts(studentsDebts);
    }

    @Override
    public int deleteStudentsDebtsById(StudentsDebts studentsDebts) throws Exception {
        studentsDebts.setUpdateId(SessionUtil.getUserLoginId());
        return studentDebtsDao.deleteStudentsDebtsById(studentsDebts);
    }

    @Override
    public List<StudentsDebts> search(StudentsDebts studentsDebts) throws Exception {
        studentsDebts.setSchoolId(SessionUtil.getSchoolId());
        return studentDebtsDao.search(studentsDebts);
    }

    @Override
    public void insertStudentsDebtsObj(StudentDebtsObject studentDebtsObject) throws Exception {

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
                sd.setsClass(studentDebtsObject.getsClass());
                sd.setGrade(studentDebtsObject.getGrade());
                sd.setInsertId(SessionUtil.getUserLoginId());
                sd.setSchoolId(SessionUtil.getSchoolId());
                studentDebtsDao.insertStudentsDebts(sd);
            }
        }
    }

    @Override
    public void updateStudentsDebtsObj(StudentDebtsObject studentDebtsObject) throws Exception {
        List<StudentsDebts> updateStudentsDebtsList = studentDebtsObject.getStudentsDebtsList();
        if(!updateStudentsDebtsList.isEmpty()){
            for (StudentsDebts sd : updateStudentsDebtsList){
                sd.setUpdateId(SessionUtil.getUserLoginId());
                studentDebtsDao.updateStudentsDebts(sd);
            }
        }
    }

    @Override
    public List<StudentsDebts> searchTaskArchive(TaskArchiveSearch taskArchiveSearch) throws Exception {
        taskArchiveSearch.setSchoolId(SessionUtil.getSchoolId());
        return studentDebtsDao.searchTaskArchive(taskArchiveSearch);
    }
}
