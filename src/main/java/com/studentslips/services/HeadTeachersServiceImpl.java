package com.studentslips.services;

import com.studentslips.dao.HeadTeachersDao;
import com.studentslips.entities.HeadTeachers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "HeadTeachersService")
public class HeadTeachersServiceImpl implements HeadTeachersService{

    @Autowired
    HeadTeachersDao headTeachersDao;

    @Override
    public int insertHeadTeachers(HeadTeachers headTeachers) {
        return headTeachersDao.insertHeadTeachers(headTeachers);
    }

    @Override
    public int updateHeadTeachers(HeadTeachers headTeachers) {
        return headTeachersDao.updateHeadTeachers(headTeachers);
    }

    @Override
    public int deleteHeadTeachersById(int id) {
        return headTeachersDao.deleteHeadTeachersById(id);
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
