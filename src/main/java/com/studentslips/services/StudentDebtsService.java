package com.studentslips.services;

import com.studentslips.entities.StudentDebtsObject;
import com.studentslips.entities.StudentsDebts;

import java.util.List;

public interface StudentDebtsService {

    public List<StudentsDebts> selectStudentDebts(StudentsDebts studentsDebts) throws Exception;
    public int insertStudentsDebts(StudentsDebts studentsDebts);
    public int updateStudentsDebts(StudentsDebts studentsDebts);
    public int deleteStudentsDebtsById(StudentsDebts studentsDebts);
    public List<StudentsDebts> search(StudentsDebts studentsDebts) throws Exception;
    public void insertStudentsDebtsObj(StudentDebtsObject studentDebtsObject);
    public void updateStudentsDebtsObj(StudentDebtsObject studentDebtsObject);
}
