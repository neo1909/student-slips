package com.studentslips.dao;

import com.studentslips.entities.BankStatement;
import com.studentslips.entities.BankStatementUploadHistory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BankStatementUploadHistoryDao {

    private final SqlSession sqlSession;

    public BankStatementUploadHistoryDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public int insertBankStatementUploadHistory(BankStatementUploadHistory bankStatementUploadHistory) {
        return this.sqlSession.insert("insertBankStatementUploadHistory", bankStatementUploadHistory);
    }

    public int updateBankStatementUploadHistory(BankStatementUploadHistory bankStatementUploadHistory) {
        return this.sqlSession.update("updateBankStatementUploadHistory", bankStatementUploadHistory);
    }

    public int deleteBankStatementUploadHistoryById(BankStatementUploadHistory bankStatementUploadHistory) {
        return this.sqlSession.delete("deleteBankStatementUploadHistoryById", bankStatementUploadHistory);
    }

    public List<BankStatementUploadHistory> selectAllBankStatementUploadHistory(BankStatementUploadHistory bankStatementUploadHistory) {
        return this.sqlSession.selectList("selectAllBankStatementUploadHistory", bankStatementUploadHistory);
    }

    public BankStatementUploadHistory selectBankStatementUploadHistoryById(int id) {
        return this.sqlSession.selectOne("selectBankStatementUploadHistoryById", id);
    }

}
