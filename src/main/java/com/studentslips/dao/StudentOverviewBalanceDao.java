package com.studentslips.dao;

import com.studentslips.entities.*;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public class StudentOverviewBalanceDao {

    private final SqlSession sqlSession;

    public StudentOverviewBalanceDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<StudentOverviewBalanceDTO> selectStudentOverviewBalance(StudentOverviewBalanceRequestDTO requestDTO) throws Exception {
        return this.sqlSession.selectList("selectStudentOverviewBalance", requestDTO);
    }

    public StudentOverviewBalancePrintDTO selectPrintData(StudentOverviewBalancePrintDTO dto) {
        return this.sqlSession.selectOne("selectPrintData", dto);
    }


    public List<Integer> selectDistinctServiceStdDebts(StudentOverviewBalanceRequestDTO dto) throws Exception {
        return this.sqlSession.selectList("selectDistinctServiceStdDebts", dto);
    }
}
