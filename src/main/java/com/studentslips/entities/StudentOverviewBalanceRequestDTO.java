package com.studentslips.entities;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Date;

public class StudentOverviewBalanceRequestDTO {
    private int id;
    private int serviceId;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date fromDate;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date toDate;

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
}
