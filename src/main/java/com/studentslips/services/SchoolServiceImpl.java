package com.studentslips.services;

import com.studentslips.common.SessionUtil;
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
    public int insertSchool(School school) throws Exception {
        school.setInsertId(SessionUtil.getUserLoginId());
        return schoolDao.insertSchool(school);
    }

    @Override
    public int updateSchool(School school) throws Exception {
        school.setUpdateId(SessionUtil.getUserLoginId());
        return schoolDao.updateSchool(school);
    }

    @Override
    public int deleteSchoolById(int id) throws Exception {
        School school = new School();
        school.setId(id);
        school.setUpdateId(SessionUtil.getUserLoginId());
        return schoolDao.deleteSchoolById(school);
    }

    @Override
    public List<School> selectAllSchool(School school) throws Exception {
    	school.setId(SessionUtil.getSchoolId());
        return schoolDao.selectAllSchool(school);
    }

    @Override
    public List<School> selectAllSimpleSchool(School school) throws Exception {
    	// Don't add session schoolId as query condition here => Use for register (no user authenticatication) also
    	List<School> listSimpleSchools = schoolDao.selectAllSchool(school);
    	for (School s: listSimpleSchools) {
    		s.setBackAccountNumber(null);
    		s.setDelYn(null);
    		s.setMunicipality(null);
    	}
        return listSimpleSchools;
    }

    @Override
    public School selectSchoolById(int schoolId) {
        return schoolDao.selectSchoolById(schoolId);
    }
}
