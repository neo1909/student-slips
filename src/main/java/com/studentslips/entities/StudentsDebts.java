package com.studentslips.entities;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

public class StudentsDebts {
    private int studentId;
    private int schoolId;
    private int suppliersId;
    private int serviceId;
    private String referenceNo;
    private int quantity;
    private String purpose;
    private Date debitDate;
    private BigDecimal amountDebt;
    private String delYn;
    private int insertId;
    private Timestamp insertDate;
    private int updateId;
    private Timestamp updateDate;

    public StudentsDebts() {
    }

    public BigDecimal getAmountDebt() {
        return amountDebt;
    }

    public void setAmountDebt(BigDecimal amountDebt) {
        this.amountDebt = amountDebt;
    }

    public int getSuppliersId() {
        return suppliersId;
    }

    public void setSuppliersId(int suppliersId) {
        this.suppliersId = suppliersId;
    }

    public Date getDebitDate() {
        return debitDate;
    }

    public void setDebitDate(Date debitDate) {
        this.debitDate = debitDate;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(int schoolId) {
        this.schoolId = schoolId;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public String getReferenceNo() {
        return referenceNo;
    }

    public void setReferenceNo(String referenceNo) {
        this.referenceNo = referenceNo;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDelYn() {
        return delYn;
    }

    public void setDelYn(String delYn) {
        this.delYn = delYn;
    }

    public int getInsertId() {
        return insertId;
    }

    public void setInsertId(int insertId) {
        this.insertId = insertId;
    }

    public Timestamp getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Timestamp insertDate) {
        this.insertDate = insertDate;
    }

    public int getUpdateId() {
        return updateId;
    }

    public void setUpdateId(int updateId) {
        this.updateId = updateId;
    }

    public Timestamp getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Timestamp updateDate) {
        this.updateDate = updateDate;
    }
}
