package com.studentslips.services;

import com.studentslips.entities.BankStatement;
import com.studentslips.entities.BankStatementArchiveSearch;
import com.studentslips.entities.HeadTeachers;

import java.util.List;

public interface BankStatementArchiveService {
    public int updateHeadBankStatementsArchive(BankStatement bankStatement) throws Exception;
    public List<BankStatement> selectAll(BankStatementArchiveSearch bankStatementArchiveSearch) throws Exception;
    public List<BankStatement> selectDetail(BankStatementArchiveSearch bankStatementArchiveSearch) throws Exception;
}
