package com.studentslips.services;

import com.studentslips.entities.School;

import java.util.List;

public interface SchoolService {
    public int insertSchool(School school);
    public int updateSchool(School school);
    public int deleteSchoolById(int id);
    public List<School> selectAllSchool(School school) throws Exception;
    public School selectSchoolById(int schoolId);
}
