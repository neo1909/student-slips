package com.studentslips.entities;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

public class SchoolAndClassSearch {

    @JsonFormat(pattern="dd/MM/yyyy")
    private Date fromDate;
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date toDate;

    private int schoolId;
    private int studentId;
    private List<Integer> serviceListId;
    private String serviceListString;
    private int sClass;
    private int grade;
    private int headTeacherId;

    public SchoolAndClassSearch() {
    }
    
    public String getServiceListString() {
		return serviceListString;
	}

	public void setServiceListString(String serviceListString) {
		this.serviceListString = serviceListString;
	}

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

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public List<Integer> getServiceListId() {
        return serviceListId;
    }

    public void setServiceListId(List<Integer> serviceListId) {
        this.serviceListId = serviceListId;
    }

    public int getsClass() {
        return sClass;
    }

    public void setsClass(int sClass) {
        this.sClass = sClass;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public int getHeadTeacherId() {
        return headTeacherId;
    }

    public void setHeadTeacherId(int headTeacherId) {
        this.headTeacherId = headTeacherId;
    }
}
