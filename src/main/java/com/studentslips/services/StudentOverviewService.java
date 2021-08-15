package com.studentslips.services;

import com.studentslips.entities.Student;
import com.studentslips.entities.StudentOverview;
import com.studentslips.entities.StudentOverviewBalanceDTO;
import com.studentslips.entities.StudentOverviewBalancePrintDTO;

import java.util.List;

public interface StudentOverviewService {
    List<StudentOverview> selectStudentOverview(Student std);

    List<StudentOverviewBalanceDTO> selectStudentOverviewBalance(Student std) throws Exception;

    StudentOverviewBalancePrintDTO selectPrintData(StudentOverviewBalancePrintDTO dto);
}
