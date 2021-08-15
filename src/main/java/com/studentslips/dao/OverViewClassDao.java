package com.studentslips.dao;

import com.studentslips.entities.SchoolAndClass;
import com.studentslips.entities.SchoolAndClassSearch;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OverViewClassDao {
    private final SqlSession sqlSession;

    public OverViewClassDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }


    public List<SchoolAndClass> selectAllClass(SchoolAndClassSearch schoolAndClassSearch){
        return this.sqlSession.selectList("searchAllClass", schoolAndClassSearch);
    }
    public List<SchoolAndClass> selectDetailClass(SchoolAndClassSearch schoolAndClassSearch){
        return this.sqlSession.selectList("searchDetailClass", schoolAndClassSearch);
    }

}
