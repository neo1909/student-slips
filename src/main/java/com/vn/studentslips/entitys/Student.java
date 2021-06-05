package com.vn.studentslips.entitys;

import java.sql.Timestamp;

public class Student {
    private int id;
    private String name;
    private int schoolId;
    private int delYn;
    private int insertId;
    private Timestamp insertDate;
    private int updateId;
    private Timestamp updateDate;

    public Student() {
    }

    public Student(int id, String name, int schoolId, int delYn, int insertId, Timestamp insertDate, int updateId, Timestamp updateDate) {
        this.id = id;
        this.name = name;
        this.schoolId = schoolId;
        this.delYn = delYn;
        this.insertId = insertId;
        this.insertDate = insertDate;
        this.updateId = updateId;
        this.updateDate = updateDate;
    }
    public Student(Student std) {
        this.id = std.id;
        this.name = std.name;
        this.schoolId = std.schoolId;
        this.delYn = std.delYn;
        this.insertId = std.insertId;
        this.insertDate = std.insertDate;
        this.updateId = std.updateId;
        this.updateDate = std.updateDate;
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

    public int getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(int schoolId) {
        this.schoolId = schoolId;
    }

    public int getDelYn() {
        return delYn;
    }

    public void setDelYn(int delYn) {
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
