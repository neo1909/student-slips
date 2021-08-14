package com.studentslips.services.impl;

import com.studentslips.entities.Student;
import com.studentslips.entities.StudentOverview;
import com.studentslips.services.StudentOverviewService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "StudentOverviewServiceImpl")
public class StudentOverviewServiceImpl implements StudentOverviewService {
    @Override
    public List<StudentOverview> selectStudentOverview(Student std) {
        return new ArrayList<StudentOverview>();
    }
}
