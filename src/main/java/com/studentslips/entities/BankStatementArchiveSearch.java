package com.studentslips.entities;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class BankStatementArchiveSearch {

    @JsonFormat(pattern="dd/MM/yyyy")
    private Date fromDate;
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date toDate;

    private int schoolId;

    private String filename;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date bankStatementDate;
    private String referenceNo;

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public int getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(int schoolId) {
        this.schoolId = schoolId;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Date getBankStatementDate() {
        return bankStatementDate;
    }

    public void setBankStatementDate(Date bankStatementDate) {
        this.bankStatementDate = bankStatementDate;
    }

    public String getReferenceNo() {
        return referenceNo;
    }

    public void setReferenceNo(String referenceNo) {
        this.referenceNo = referenceNo;
    }
}
