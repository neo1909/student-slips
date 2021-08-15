package com.studentslips.services;

import com.studentslips.entities.StudentDebtsObject;
import com.studentslips.entities.StudentsDebts;
import com.studentslips.entities.TaskArchiveSearch;

import java.util.List;

public interface StudentDebtsService {

    public List<StudentsDebts> selectStudentDebts(StudentsDebts studentsDebts) throws Exception;
    public int insertStudentsDebts(StudentsDebts studentsDebts) throws Exception;
    public int updateStudentsDebts(StudentsDebts studentsDebts) throws Exception;
    public int deleteStudentsDebtsById(StudentsDebts studentsDebts) throws Exception;
    public List<StudentsDebts> search(StudentsDebts studentsDebts) throws Exception;
    public void insertStudentsDebtsObj(StudentDebtsObject studentDebtsObject) throws Exception;
    public void updateStudentsDebtsObj(StudentDebtsObject studentDebtsObject) throws Exception;
    //TaskArchive
    public List<StudentsDebts> searchTaskArchive(TaskArchiveSearch taskArchiveSearch) throws Exception;
}
