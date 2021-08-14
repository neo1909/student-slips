package com.studentslips.entities;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class StudentOverviewBalanceDTO {
    private Timestamp date;
    private String description;
    private BigDecimal debit;
    private boolean print;
    private BigDecimal claims;
    private BigDecimal balance;
    private int rowType;

    public StudentOverviewBalanceDTO() {

    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
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
}
