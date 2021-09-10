package com.studentslips.entities;

import java.sql.Timestamp;
import java.util.List;

public class Supplier {

    private int id;
    private String name;
    private int schoolId;
    private int insertId;
    private Timestamp insertDate;
    private int updateId;
    private Timestamp updateDate;
    private String delYn;
    private List<SupplierServiceDetail> lstSupplierServiceDetail;
    private String schoolName;
    private int supplierId;

    public Supplier() {
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
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

    public String getDelYn() {
        return delYn;
    }

    public void setDelYn(String delYn) {
        this.delYn = delYn;
    }

    public List<SupplierServiceDetail> getLstSupplierServiceS() {
        return lstSupplierServiceDetail;
    }

    public void setLstSupplierServiceS(List<SupplierServiceDetail> lstSupplierServiceDetail) {
        this.lstSupplierServiceDetail = lstSupplierServiceDetail;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }
}
