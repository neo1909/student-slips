package com.studentslips.dao;

import com.studentslips.entities.BankStatement;
import com.studentslips.entities.HeadTeachers;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BankStatementDao {

    private final SqlSession sqlSession;

    public BankStatementDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public int insertBankStatement(BankStatement bankStatement) {
        return this.sqlSession.insert("insertBankStatement", bankStatement);
    }

    public int updateBankStatement(BankStatement bankStatement) {
        return this.sqlSession.update("updateBankStatement", bankStatement);
    }

    public int deleteBankStatementById(BankStatement bankStatement) {
        return this.sqlSession.delete("deleteBankStatementById", bankStatement);
    }

    public List<BankStatement> selectAllBankStatement(BankStatement bankStatement) {
        return this.sqlSession.selectList("selectAllBankStatement", bankStatement);
    }

    public BankStatement selectBankStatementById(int id) {
        return this.sqlSession.selectOne("selectBankStatementById", id);
    }

    public List<BankStatement> selectUploadedBankStatement(List<String> filenames) {
        return this.sqlSession.selectList("selectUploadedBankStatement", filenames);
    }
}
