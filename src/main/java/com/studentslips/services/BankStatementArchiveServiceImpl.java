package com.studentslips.services;

import com.studentslips.common.SessionUtil;
import com.studentslips.dao.BankStatementsArchiveDao;
import com.studentslips.dao.StudentDebtsDao;
import com.studentslips.entities.BankStatement;
import com.studentslips.entities.BankStatementArchiveSearch;
import com.studentslips.entities.StudentsDebts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service(value = "BankStatementArchiveService")
public class BankStatementArchiveServiceImpl implements  BankStatementArchiveService{

    @Autowired
    BankStatementsArchiveDao bankStatementsArchiveDao;

    @Autowired
    StudentDebtsDao studentDebtsDao;

    @Override
    public int updateHeadBankStatementsArchive(BankStatement bankStatement) throws Exception {
        bankStatement.setUpdateId(SessionUtil.getUserLoginId());
        bankStatement.setSchoolId(SessionUtil.getSchoolId());
        return bankStatementsArchiveDao.updateHeadBankStatementsArchive(bankStatement);
    }

    @Override
    public List<BankStatement> selectAll(BankStatementArchiveSearch bankStatementArchiveSearch) throws Exception {

        bankStatementArchiveSearch.setSchoolId(SessionUtil.getSchoolId());
        return bankStatementsArchiveDao.selectAll(bankStatementArchiveSearch);
    }

    @Override
    public List<BankStatement> selectDetail(BankStatementArchiveSearch bankStatementArchiveSearch) throws Exception {

        bankStatementArchiveSearch.setSchoolId(SessionUtil.getSchoolId());
        return bankStatementsArchiveDao.selectDetail(bankStatementArchiveSearch);
    }
}
