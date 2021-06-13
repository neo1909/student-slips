package com.studentslips.dao;

import com.studentslips.entities.HeadTeachers;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface HeadTeachersDao {
    public int insertHeadTeachers(HeadTeachers headTeachers);
    public int updateHeadTeachers(HeadTeachers headTeachers);
    public int deleteHeadTeachersById(int id);
    public List<HeadTeachers> selectAllHeadTeachers(HeadTeachers headTeachers);
    public HeadTeachers selectHeadTeachersById(int id);
}
