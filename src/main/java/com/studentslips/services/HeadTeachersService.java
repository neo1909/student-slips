package com.studentslips.services;


import com.studentslips.entities.HeadTeachers;

import java.util.List;

public interface HeadTeachersService {
    public int insertHeadTeachers(HeadTeachers headTeachers) throws Exception;
    public int updateHeadTeachers(HeadTeachers headTeachers) throws Exception;
    public int deleteHeadTeachersById(int id) throws Exception;
    public List<HeadTeachers> selectAllHeadTeachers(HeadTeachers headTeachers) throws Exception;
    public HeadTeachers selectHeadTeachersById(int id);
}
