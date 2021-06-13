package com.studentslips.entities;

import java.sql.Timestamp;

public class Services {
    private int id;
    private String name;
    private String delYn;
    private int insertId;
    private Timestamp insertDate;
    private int updateId;
    private Timestamp updateDate;

    public Services() {
    }

    public Services(int id, String name, String delYn, int insertId, Timestamp insertDate, int updateId, Timestamp updateDate) {
        this.id = id;
        this.name = name;
        this.delYn = delYn;
        this.insertId = insertId;
        this.insertDate = insertDate;
        this.updateId = updateId;
        this.updateDate = updateDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
