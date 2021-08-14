package com.studentslips.dao;

import com.studentslips.entities.Student;
import com.studentslips.entities.StudentOverviewBalanceDTO;
import com.studentslips.entities.StudentsDebts;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentOverviewBalanceDao {

    private final SqlSession sqlSession;

    public StudentOverviewBalanceDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<StudentOverviewBalanceDTO> selectStudentOverviewBalance(Student std) throws Exception {
        return this.sqlSession.selectList("selectStudentOverviewBalance", std);
    }
}
