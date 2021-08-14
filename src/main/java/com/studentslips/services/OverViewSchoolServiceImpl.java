package com.studentslips.services;

import com.studentslips.common.SessionUtil;
import com.studentslips.dao.OverViewSchoolDao;
import com.studentslips.entities.SchoolAndClass;
import com.studentslips.entities.SchoolAndClassSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component(value = "OverViewSchoolService")
public class OverViewSchoolServiceImpl implements OverViewSchoolService{

    @Autowired
    OverViewSchoolDao overViewSchoolDao;

    @Override
    public List<SchoolAndClass> selectAllSchool(SchoolAndClassSearch schoolAndClassSearch) throws Exception {
        schoolAndClassSearch.setSchoolId(SessionUtil.getSchoolId());
        return overViewSchoolDao.selectAllSchool(schoolAndClassSearch);
    }

    @Override
    public List<SchoolAndClass> selectDetailSchool(SchoolAndClassSearch schoolAndClassSearch) throws Exception {
        schoolAndClassSearch.setSchoolId(SessionUtil.getSchoolId());
        return overViewSchoolDao.selectDetailSchool(schoolAndClassSearch);
    }
}
