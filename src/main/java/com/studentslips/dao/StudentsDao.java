package com.studentslips.dao;

import com.studentslips.entities.Student;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentsDao {
    private final SqlSession sqlSession;

    public StudentsDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<Student> selectAllStudent(Student student) {
        return this.sqlSession.selectList("selectAllStudent", student);
    }

    public Student selectStudentById(int studentId){
        return this.sqlSession.selectOne("selectStudentById",studentId);
    }

    public int insertStudent(Student student){
        return this.sqlSession.selectOne("insertStudent", student);
    }
    public int updateStudent(Student student){
        return this.sqlSession.selectOne("updateStudent", student);
    }
    public int deleteStudentById(int studentId){
        return this.sqlSession.selectOne("deleteStudentById", studentId);
    }
}
