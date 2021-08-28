package com.studentslips.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

public class StudentsDebtsTask implements Serializable {

	private static final long serialVersionUID = 1L;

	private int id;
	private int schoolId;
	private int grade;
	private int sClass;
	private int serviceId;
	private String serviceName;
	private String note;
	private Timestamp debitDate;
	private String delYn;
	private int installment;
	private BigDecimal price;
	private int insertId;
	private Timestamp insertDate;
	private int updateId;
	private Timestamp updateDate;

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public int getInstallment() {
		return installment;
	}

	public void setInstallment(int installment) {
		this.installment = installment;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public int getId() {
		return id;
	}

	public Timestamp getDebitDate() {
		return debitDate;
	}

	public void setDebitDate(Timestamp debitDate) {
		this.debitDate = debitDate;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(int schoolId) {
		this.schoolId = schoolId;
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

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
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
