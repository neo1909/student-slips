package com.studentslips.services;

import com.studentslips.common.SessionUtil;
import com.studentslips.common.StudentSlipException;
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
    public int insertHeadTeachers(HeadTeachers headTeachers) throws Exception {

        HeadTeachers checkHT = new HeadTeachers();
        checkHT.setGrade(headTeachers.getGrade());
        checkHT.setsClass(headTeachers.getsClass());
        checkHT.setSchoolId(SessionUtil.getSchoolId());

        List<HeadTeachers> lst = headTeachersDao.selectAllHeadTeachers(checkHT);

        if (lst !=null && !lst.isEmpty()){
            throw new StudentSlipException("Class already exists head teacher !");
        }

        headTeachers.setInsertId(SessionUtil.getUserLoginId());
        headTeachers.setSchoolId(SessionUtil.getSchoolId());
        return headTeachersDao.insertHeadTeachers(headTeachers);
    }

    @Override
    public int updateHeadTeachers(HeadTeachers headTeachers) throws Exception {

        HeadTeachers checkHT = new HeadTeachers();
        checkHT.setGrade(headTeachers.getGrade());
        checkHT.setsClass(headTeachers.getsClass());
        checkHT.setSchoolId(SessionUtil.getSchoolId());

        List<HeadTeachers> lst = headTeachersDao.selectAllHeadTeachers(checkHT);

        if (lst !=null && !lst.isEmpty()){
            for (HeadTeachers ht : lst) {
                if (headTeachers.getId() != 0 && headTeachers.getId() != ht.getId()) {
                    throw new StudentSlipException("Class already exists head teacher !");
                }
            }
        }

        headTeachers.setUpdateId(SessionUtil.getUserLoginId());
        return headTeachersDao.updateHeadTeachers(headTeachers);
    }

    @Override
    public int deleteHeadTeachersById(int id) throws Exception {
        HeadTeachers headTeachers = new HeadTeachers();
        headTeachers.setId(id);
        headTeachers.setUpdateId(SessionUtil.getUserLoginId());
        headTeachers.setSchoolId(SessionUtil.getSchoolId());
        return headTeachersDao.deleteHeadTeachersById(headTeachers);
    }

    @Override
    public List<HeadTeachers> selectAllHeadTeachers(HeadTeachers headTeachers) throws Exception {
        headTeachers.setSchoolId(SessionUtil.getSchoolId());
        return headTeachersDao.selectAllHeadTeachers(headTeachers);
    }

    @Override
    public HeadTeachers selectHeadTeachersById(int id) {

        return headTeachersDao.selectHeadTeachersById(id);
    }

}
