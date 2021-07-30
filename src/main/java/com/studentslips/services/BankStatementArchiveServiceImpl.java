package com.studentslips.services;

import com.studentslips.dao.BankStatementsArchiveDao;
import com.studentslips.entities.BankStatement;
import com.studentslips.entities.BankStatementArchiveSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service(value = "BankStatementArchiveService")
public class BankStatementArchiveServiceImpl implements  BankStatementArchiveService{

    @Autowired
    private BankStatementsArchiveDao bankStatementsArchiveDao;

    @Override
    public int updateHeadBankStatementsArchive(BankStatement bankStatement) {
        bankStatement.setUpdateId(100);
        bankStatement.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        return bankStatementsArchiveDao.updateHeadBankStatementsArchive(bankStatement);
    }

    @Override
    public List<BankStatement> selectAll(BankStatementArchiveSearch bankStatementArchiveSearch) {
        return bankStatementsArchiveDao.selectAll(bankStatementArchiveSearch);
    }

    @Override
    public BankStatement selectById(BankStatement bankStatement) {
        return bankStatementsArchiveDao.selectById(bankStatement);
    }
}
