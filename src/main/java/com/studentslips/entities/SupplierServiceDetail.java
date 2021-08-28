package com.studentslips.entities;

import java.sql.Timestamp;
import java.util.List;

public class SupplierServiceDetail {
	private int id;
	private int schoolId;
	private int groupId;
	private String name;
	private int supplierId;
	private String supplierName;
	private int serviceId;
	private String serviceName;
	private int grade;
	private String delYn;
	private String listGradeIdsStr;
	private List<Integer> listGradeIds;
	private int insertId;
	private Timestamp insertDate;
	private int updateId;
	private Timestamp updateDate;

	public SupplierServiceDetail() {
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
}
