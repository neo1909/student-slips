package com.studentslips.entities;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

public class StudentOverviewBalancePrintDTO {

    private Date date;
    private int studentDebtsId;
    private int id;
    private String payerInfo;
    private String purpose;
    private String payee;
    private BigDecimal amount;
    private String payerAcc;
    private String payeeAcc;
    private String refNo;

    public StudentOverviewBalancePrintDTO() {
    }

    public String getPayerInfo() {
        return payerInfo;
    }

    public void setPayerInfo(String payerInfo) {
        this.payerInfo = payerInfo;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getPayee() {
        return payee;
    }

    public void setPayee(String payee) {
        this.payee = payee;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPayerAcc() {
        return payerAcc;
    }

    public void setPayerAcc(String payerAcc) {
        this.payerAcc = payerAcc;
    }

    public String getPayeeAcc() {
        return payeeAcc;
    }

    public void setPayeeAcc(String payeeAcc) {
        this.payeeAcc = payeeAcc;
    }

    public String getRefNo() {
        return refNo;
    }

    public void setRefNo(String refNo) {
        this.refNo = refNo;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStudentDebtsId() {
        return studentDebtsId;
    }

    public void setStudentDebtsId(int studentDebtsId) {
        this.studentDebtsId = studentDebtsId;
    }
}
