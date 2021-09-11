package com.studentslips.services;

import com.studentslips.entities.*;

import java.util.List;
import java.util.Map;

public interface StudentOverviewService {
    List<StudentOverview> selectStudentOverview(Student std);

    Map<String, Object> selectStudentOverviewBalance(StudentOverviewBalanceRequestDTO requestDTO) throws Exception;

    StudentOverviewBalancePrintDTO selectPrintData(StudentOverviewBalancePrintDTO dto) throws Exception;
}
