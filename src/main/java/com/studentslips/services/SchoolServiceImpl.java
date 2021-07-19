package com.studentslips.services;

import com.studentslips.dao.SchoolDao;
import com.studentslips.entities.School;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;
@Component(value = "SchoolService")
public class SchoolServiceImpl implements SchoolService{

    @Autowired
    private SchoolDao schoolDao;
    @Override
    public int insertSchool(School school) {
        school.setInsertId(100);
        school.setInsertDate(new Timestamp(System.currentTimeMillis()));
        return schoolDao.insertSchool(school);
    }

    @Override
    public int updateSchool(School school) {
        school.setUpdateId(100);
        school.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        return schoolDao.updateSchool(school);
    }

    @Override
    public int deleteSchoolById(int id) {
        School school = new School();
        school.setId(id);
        school.setUpdateId(100);
        school.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        return schoolDao.deleteSchoolById(school);
    }

    @Override
    public List<School> selectAllSchool(School school) throws Exception {
        return schoolDao.selectAllSchool(school);
    }

    @Override
    public School selectSchoolById(int schoolId) {
        return schoolDao.selectSchoolById(schoolId);
    }
}