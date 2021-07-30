package com.studentslips.services;

import com.studentslips.entities.BankStatement;
import com.studentslips.entities.BankStatementArchiveSearch;
import com.studentslips.entities.HeadTeachers;

import java.util.List;

public interface BankStatementArchiveService {
    public int updateHeadBankStatementsArchive(BankStatement bankStatement);
    public List<BankStatement> selectAll(BankStatementArchiveSearch bankStatementArchiveSearch);
    public BankStatement selectById(BankStatement bankStatement);
}
