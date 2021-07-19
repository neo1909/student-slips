package com.studentslips.dao;

import com.studentslips.entities.StudentsDebts;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentDebtsDao {
    private final SqlSession sqlSession;

    public StudentDebtsDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<StudentsDebts> selectStudentDebts(StudentsDebts studentsDebts) throws Exception {
        return this.sqlSession.selectList("selectStudentDebts", studentsDebts);
    }


    public int insertStudentsDebts(StudentsDebts studentsDebts){
        return this.sqlSession.insert("insertStudentDebts", studentsDebts);
    }
    public int updateStudentsDebts(StudentsDebts studentsDebts){
        return this.sqlSession.update("updateStudentDebts", studentsDebts);
    }
    public int deleteStudentsDebtsById(StudentsDebts studentsDebts){
        return this.sqlSession.delete("deleteStudentDebtsById", studentsDebts);
    }
}
