package com.studentslips.entities;

import java.math.BigDecimal;

public class SchoolAndClass {

    private String studentId;
    private String nameStudent;
    private int serviceId;
    private String nameService;
    private BigDecimal debit;
    private BigDecimal claims;
    private BigDecimal balance;
    private int isHightColor;
    private String gradeClass;
    private int headTeacherId;
    private String headTeacherName;
    private String serviceListString;

    public SchoolAndClass() {
    }
    
    public String getServiceListString() {
		return serviceListString;
	}

	public void setServiceListString(String serviceListString) {
		this.serviceListString = serviceListString;
	}

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getNameStudent() {
        return nameStudent;
    }

    public void setNameStudent(String nameStudent) {
        this.nameStudent = nameStudent;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public String getNameService() {
        return nameService;
    }

    public void setNameService(String nameService) {
        this.nameService = nameService;
    }

    public BigDecimal getDebit() {
        return debit;
    }

    public void setDebit(BigDecimal debit) {
        this.debit = debit;
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

    public int getIsHightColor() {
        return isHightColor;
    }

    public void setIsHightColor(int isHightColor) {
        this.isHightColor = isHightColor;
    }

    public String getGradeClass() {
        return gradeClass;
    }

    public void setGradeClass(String gradeClass) {
        this.gradeClass = gradeClass;
    }

    public int getHeadTeacherId() {
        return headTeacherId;
    }

    public void setHeadTeacherId(int headTeacherId) {
        this.headTeacherId = headTeacherId;
    }

    public String getHeadTeacherName() {
        return headTeacherName;
    }

    public void setHeadTeacherName(String headTeacherName) {
        this.headTeacherName = headTeacherName;
    }
}
