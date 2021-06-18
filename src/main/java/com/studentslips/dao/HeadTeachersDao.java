package com.studentslips.dao;

import com.studentslips.entities.HeadTeachers;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HeadTeachersDao {

    private final SqlSession sqlSession;

    public HeadTeachersDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public int insertHeadTeachers(HeadTeachers headTeachers){
        return this.sqlSession.selectOne("insertHeadTeachers", headTeachers);
    }
    public int updateHeadTeachers(HeadTeachers headTeachers){
        return this.sqlSession.selectOne("updateHeadTeachers", headTeachers);
    }
    public int deleteHeadTeachersById(int id){
        return this.sqlSession.selectOne("deleteHeadTeachersById", id);
    }
    public List<HeadTeachers> selectAllHeadTeachers(HeadTeachers headTeachers){
        return this.sqlSession.selectList("selectAllHeadTeachers", headTeachers);
    }
    public HeadTeachers selectHeadTeachersById(int id){
        return this.sqlSession.selectOne("selectHeadTeachersById", id);
    }
}
