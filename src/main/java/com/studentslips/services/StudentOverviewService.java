package com.studentslips.services;

import com.studentslips.entities.Student;
import com.studentslips.entities.StudentOverview;

import java.util.List;

public interface StudentOverviewService {
    List<StudentOverview> selectStudentOverview(Student std);
}
