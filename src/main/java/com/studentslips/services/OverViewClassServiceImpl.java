package com.studentslips.services;

import com.studentslips.common.SessionUtil;
import com.studentslips.dao.OverViewClassDao;
import com.studentslips.entities.SchoolAndClass;
import com.studentslips.entities.SchoolAndClassSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component(value = "OverViewClassService")
public class OverViewClassServiceImpl implements OverViewClassService{

    @Autowired
    OverViewClassDao overViewClassDao;

    @Override
    public List<SchoolAndClass> selectAllClass(SchoolAndClassSearch schoolAndClassSearch) throws Exception {
        schoolAndClassSearch.setSchoolId(SessionUtil.getSchoolId());
        return overViewClassDao.selectAllClass(schoolAndClassSearch);
    }

    @Override
    public List<SchoolAndClass> selectDetailClass(SchoolAndClassSearch schoolAndClassSearch) throws Exception {
        schoolAndClassSearch.setSchoolId(SessionUtil.getSchoolId());
        return overViewClassDao.selectDetailClass(schoolAndClassSearch);
    }
}
