package com.studentslips.entities;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class StudentDebtsObject {

    private int suppliersId;
    private int serviceId;
    private int grade;
    private int sClass;
    private BigDecimal price;
    private Date debitDate;
    private List<StudentsDebts> studentsDebtsList;

    public StudentDebtsObject() {
    }

    public int getSuppliersId() {
        return suppliersId;
    }

    public void setSuppliersId(int suppliersId) {
        this.suppliersId = suppliersId;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public int getsClass() {
        return sClass;
    }

    public void setsClass(int sClass) {
        this.sClass = sClass;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Date getDebitDate() {
        return debitDate;
    }

    public void setDebitDate(Date debitDate) {
        this.debitDate = debitDate;
    }

    public List<StudentsDebts> getStudentsDebtsList() {
        return studentsDebtsList;
    }

    public void setStudentsDebtsList(List<StudentsDebts> studentsDebtsList) {
        this.studentsDebtsList = studentsDebtsList;
    }
}
