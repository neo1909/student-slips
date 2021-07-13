package com.studentslips.services;


import com.studentslips.entities.HeadTeachers;

import java.util.List;

public interface HeadTeachersService {
    public int insertHeadTeachers(HeadTeachers headTeachers);
    public int updateHeadTeachers(HeadTeachers headTeachers);
    public int deleteHeadTeachersById(int id);
    public List<HeadTeachers> selectAllHeadTeachers(HeadTeachers headTeachers);
    public HeadTeachers selectHeadTeachersById(int id);
}
