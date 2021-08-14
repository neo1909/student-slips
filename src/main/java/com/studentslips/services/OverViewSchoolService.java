package com.studentslips.services;

import com.studentslips.entities.SchoolAndClass;
import com.studentslips.entities.SchoolAndClassSearch;

import java.util.List;

public interface OverViewSchoolService {
    public List<SchoolAndClass> selectAllSchool(SchoolAndClassSearch schoolAndClassSearch) throws Exception;
    public List<SchoolAndClass> selectDetailSchool(SchoolAndClassSearch schoolAndClassSearch) throws Exception;
}
