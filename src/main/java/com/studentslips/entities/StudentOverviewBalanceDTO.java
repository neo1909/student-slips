package com.studentslips.entities;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

public class StudentOverviewBalanceDTO {
    private int studentDebtsId;
    private int id;
    private int serviceId;
    private String serviceNm;
    private Date date;
    private String description;
    private BigDecimal debit;
    private boolean print;
    private BigDecimal claims;
    private BigDecimal balance;
    private int rowType;

    public StudentOverviewBalanceDTO() {

    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getDebit() {
        return debit;
    }

    public void setDebit(BigDecimal debit) {
        this.debit = debit;
    }

    public boolean isPrint() {
        return print;
    }

    public void setPrint(boolean print) {
        this.print = print;
    }

    public BigDecimal getClaims() {
        return claims;
    }

    public void setClaims(BigDecimal claims) {
        this.claims = claims;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public int getRowType() {
        return rowType;
    }

    public void setRowType(int rowType) {
        this.rowType = rowType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceNm() {
        return serviceNm;
    }

    public void setServiceNm(String serviceNm) {
        this.serviceNm = serviceNm;
    }

    public int getStudentDebtsId() {
        return studentDebtsId;
    }

    public void setStudentDebtsId(int studentDebtsId) {
        this.studentDebtsId = studentDebtsId;
    }
}
