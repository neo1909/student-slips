package com.studentslips.dao;

import com.studentslips.entities.BankStatement;
import com.studentslips.entities.BankStatementArchiveSearch;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BankStatementsArchiveDao {

    private final SqlSession sqlSession;

    public BankStatementsArchiveDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }


    public int updateHeadBankStatementsArchive(BankStatement bankStatement){
        return this.sqlSession.update("updateBankStatementArchive", bankStatement);
    }

    public List<BankStatement> selectAll(BankStatementArchiveSearch bankStatementArchiveSearch){
        return this.sqlSession.selectList("selectBankStatementArchive", bankStatementArchiveSearch);
    }
    public List<BankStatement> selectDetail(BankStatementArchiveSearch bankStatementArchiveSearch){
        return this.sqlSession.selectList("selectBankStatementArchiveById", bankStatementArchiveSearch);
    }
}
