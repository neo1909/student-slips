package com.studentslips.dao;

import com.studentslips.entities.School;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SchoolDao {
    private final SqlSession sqlSession;

    public SchoolDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<School> selectAllSchool(School school) throws Exception {
        return this.sqlSession.selectList("selectAllSchool", school);
    }

    public School selectSchoolById(int schoolId){
        return this.sqlSession.selectOne("selectSchoolById",schoolId);
    }

    public int insertSchool(School school){
        return this.sqlSession.insert("insertSchool", school);
    }
    public int updateSchool(School school){
        return this.sqlSession.update("updateSchool", school);
    }
    public int deleteSchoolById(School school){
        return this.sqlSession.delete("deleteSchoolById", school);
    }
}
