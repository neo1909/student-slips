package com.studentslips.dao;

import com.studentslips.entities.SchoolAndClass;
import com.studentslips.entities.SchoolAndClassSearch;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OverViewSchoolDao {
    private final SqlSession sqlSession;

    public OverViewSchoolDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }


    public List<SchoolAndClass> selectAllSchool(SchoolAndClassSearch schoolAndClassSearch){
        return this.sqlSession.selectList("searchAllSchool", schoolAndClassSearch);
    }
    public List<SchoolAndClass> selectDetailSchool(SchoolAndClassSearch schoolAndClassSearch){
        return this.sqlSession.selectList("searchDetailSchool", schoolAndClassSearch);
    }
}
