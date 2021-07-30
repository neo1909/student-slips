package com.studentslips.entities;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class TaskArchiveSearch {

    @JsonFormat(pattern="dd/MM/yyyy")
    private Date fromDate;
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date toDate;

    private int schoolId;

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
}
