package com.studentslips.entities;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SupplierServiceDetail {
    private int id;
    private String name;

    private int supplierId;
    private String supplierName;

    private int schoolId;

    private int serviceId;
    private String serviceName;

    private BigDecimal price;
    private int noPayment;
    private BigDecimal amount1;
    private BigDecimal amount2;
    private BigDecimal amount3;
    private BigDecimal amount4;
    private BigDecimal amount5;
    private BigDecimal amount6;
    private BigDecimal amount7;
    private BigDecimal amount8;
    private BigDecimal amount9;
    private BigDecimal amount10;
    private BigDecimal amount11;
    private BigDecimal amount12;
    private int grade;
    private String delYn;
    private int insertId;
    private Timestamp insertDate;
    private int updateId;
    private Timestamp updateDate;
    
    private String listGradeIdsStr;
    private List<Integer> listGradeIds;
    private int groupId;
    private List<Integer> trInsert;
    private List<Integer> trUpdate;
    private List<Integer> trDelete;
    
    public SupplierServiceDetail() {
    }

    public List<Integer> getTrInsert() {
		return trInsert;
	}

	public void setTrInsert(List<Integer> trInsert) {
		this.trInsert = trInsert;
	}

	public List<Integer> getTrUpdate() {
		return trUpdate;
	}

	public void setTrUpdate(List<Integer> trUpdate) {
		this.trUpdate = trUpdate;
	}

	public List<Integer> getTrDelete() {
		return trDelete;
	}

	public void setTrDelete(List<Integer> trDelete) {
		this.trDelete = trDelete;
	}

	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public String getListGradeIdsStr() {
		return listGradeIdsStr;
	}

	public void setListGradeIdsStr(String listGradeIdsStr) {
		this.listGradeIdsStr = listGradeIdsStr;
	}

	public List<Integer> getListGradeIds() {
		return listGradeIds;
	}

	public void setListGradeIds(List<Integer> listGradeIds) {
		this.listGradeIds = listGradeIds;
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

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
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

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getNoPayment() {
        return noPayment;
    }

    public void setNoPayment(int noPayment) {
        this.noPayment = noPayment;
    }

    public BigDecimal getAmount1() {
        return amount1;
    }

    public void setAmount1(BigDecimal amount1) {
        this.amount1 = amount1;
    }

    public BigDecimal getAmount2() {
        return amount2;
    }

    public void setAmount2(BigDecimal amount2) {
        this.amount2 = amount2;
    }

    public BigDecimal getAmount3() {
        return amount3;
    }

    public void setAmount3(BigDecimal amount3) {
        this.amount3 = amount3;
    }

    public BigDecimal getAmount4() {
        return amount4;
    }

    public void setAmount4(BigDecimal amount4) {
        this.amount4 = amount4;
    }

    public BigDecimal getAmount5() {
        return amount5;
    }

    public void setAmount5(BigDecimal amount5) {
        this.amount5 = amount5;
    }

    public BigDecimal getAmount6() {
        return amount6;
    }

    public void setAmount6(BigDecimal amount6) {
        this.amount6 = amount6;
    }

    public BigDecimal getAmount7() {
        return amount7;
    }

    public void setAmount7(BigDecimal amount7) {
        this.amount7 = amount7;
    }

    public BigDecimal getAmount8() {
        return amount8;
    }

    public void setAmount8(BigDecimal amount8) {
        this.amount8 = amount8;
    }

    public BigDecimal getAmount9() {
        return amount9;
    }

    public void setAmount9(BigDecimal amount9) {
        this.amount9 = amount9;
    }

    public BigDecimal getAmount10() {
        return amount10;
    }

    public void setAmount10(BigDecimal amount10) {
        this.amount10 = amount10;
    }

    public BigDecimal getAmount11() {
        return amount11;
    }

    public void setAmount11(BigDecimal amount11) {
        this.amount11 = amount11;
    }

    public BigDecimal getAmount12() {
        return amount12;
    }

    public void setAmount12(BigDecimal amount12) {
        this.amount12 = amount12;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
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
