package com.studentslips.entities;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

public class BankStatement {
    private int id;

    private int schoolId;

    private String filename;

    // DatumIzvoda
    private Date bankStatementDate;

//    // RacunIzvoda
//    private String accountNumber;

    // RacunZaduzenja
    private String payerAccount;

    // NazivZaduzenja
    private String payer;

    // Naziv
    private String payee;

    // Racun Izvoda
    private String payeeAccount;

    // SvrhaDoznake
    private String purpose;

    // BrNalogaPotrazuje
    private int noOfChanges;

    // IznosPotrazuje
    private BigDecimal balance;

    // BrojIzvoda
    private int noOfBankStatement;

    // Iznos
    private BigDecimal claims;

    // PozivOdobrenja
    private String referenceNo;

    // DatumValute
    private Date currencyDate;

    private Timestamp insertDate;
    private int insertId;
    private Timestamp updateDate;
    private int updateId;

    private String postPaymentYn;
    private String delYn;

    private int isHightLight;

    public BankStatement() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getBankStatementDate() {
        return bankStatementDate;
    }

    public void setBankStatementDate(Date bankStatementDate) {
        this.bankStatementDate = bankStatementDate;
    }

    public int getNoOfChanges() {
        return noOfChanges;
    }

    public void setNoOfChanges(int noOfChanges) {
        this.noOfChanges = noOfChanges;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public int getNoOfBankStatement() {
        return noOfBankStatement;
    }

    public void setNoOfBankStatement(int noOfBankStatement) {
        this.noOfBankStatement = noOfBankStatement;
    }

    public BigDecimal getClaims() {
        return claims;
    }

    public void setClaims(BigDecimal claims) {
        this.claims = claims;
    }

    public String getReferenceNo() {
        return referenceNo;
    }

    public void setReferenceNo(String referenceNo) {
        this.referenceNo = referenceNo;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Date getCurrencyDate() {
        return currencyDate;
    }

    public void setCurrencyDate(Date currencyDate) {
        this.currencyDate = currencyDate;
    }

    public Timestamp getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Timestamp insertDate) {
        this.insertDate = insertDate;
    }

    public int getInsertId() {
        return insertId;
    }

    public void setInsertId(int insertId) {
        this.insertId = insertId;
    }

    public Timestamp getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Timestamp updateDate) {
        this.updateDate = updateDate;
    }

    public int getUpdateId() {
        return updateId;
    }

    public void setUpdateId(int updateId) {
        this.updateId = updateId;
    }

    public String getDelYn() {
        return delYn;
    }

    public void setDelYn(String delYn) {
        this.delYn = delYn;
    }

    public String getPostPaymentYn() {
        return postPaymentYn;
    }

    public void setPostPaymentYn(String postPaymentYn) {
        this.postPaymentYn = postPaymentYn;
    }

/*    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }*/

    public String getPayer() {
        return payer;
    }

    public void setPayer(String payer) {
        this.payer = payer;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public int getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(int schoolId) {
        this.schoolId = schoolId;
    }

    public String getPayerAccount() {
        return payerAccount;
    }

    public void setPayerAccount(String payerAccount) {
        this.payerAccount = payerAccount;
    }

    public String getPayee() {
        return payee;
    }

    public void setPayee(String payee) {
        this.payee = payee;
    }

    public String getPayeeAcount() {
        return payeeAccount;
    }

    public void setPayeeAcount(String payeeAcount) {
        this.payeeAccount = payeeAcount;
    }

    public int getIsHightLight() {
        return isHightLight;
    }

    public void setIsHightLight(int isHightLight) {
        this.isHightLight = isHightLight;
    }
}
