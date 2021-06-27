package com.studentslips.services;

import com.studentslips.dao.HeadTeachersDao;
import com.studentslips.entities.HeadTeachers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service(value = "HeadTeachersService")
public class HeadTeachersServiceImpl implements HeadTeachersService{

    @Autowired
    HeadTeachersDao headTeachersDao;

    @Override
    public int insertHeadTeachers(HeadTeachers headTeachers) {
        headTeachers.setInsertId(100);
        headTeachers.setInsertDate(new Timestamp(System.currentTimeMillis()));
        return headTeachersDao.insertHeadTeachers(headTeachers);
    }

    @Override
    public int updateHeadTeachers(HeadTeachers headTeachers) {
        headTeachers.setUpdateId(100);
        headTeachers.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        return headTeachersDao.updateHeadTeachers(headTeachers);
    }

    @Override
    public int deleteHeadTeachersById(HeadTeachers headTeachers) {
        headTeachers.setUpdateId(100);
        headTeachers.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        return headTeachersDao.deleteHeadTeachersById(headTeachers);
    }

    @Override
    public List<HeadTeachers> selectAllHeadTeachers(HeadTeachers headTeachers) {
        return headTeachersDao.selectAllHeadTeachers(headTeachers);
    }

    @Override
    public HeadTeachers selectHeadTeachersById(int id) {
        return headTeachersDao.selectHeadTeachersById(id);
    }
}
