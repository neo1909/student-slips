package com.studentslips.entities;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public class StudentDebtsObject {

	private int suppliersId;
	private int serviceId;
	private int grade;
	private int sClass;
	private BigDecimal price;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Timestamp debitDate;
	private String purpose;
	private List<StudentsDebts> studentsDebtsList;
	private int taskId;
	private int installment;

	public StudentDebtsObject() {
	}

	public int getInstallment() {
		return installment;
	}

	public void setInstallment(int installment) {
		this.installment = installment;
	}

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public int getSuppliersId() {
		return suppliersId;
	}

	public void setSuppliersId(int suppliersId) {
		this.suppliersId = suppliersId;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
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

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Timestamp getDebitDate() {
		return debitDate;
	}

	public void setDebitDate(Timestamp debitDate) {
		this.debitDate = debitDate;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public List<StudentsDebts> getStudentsDebtsList() {
		return studentsDebtsList;
	}

	public void setStudentsDebtsList(List<StudentsDebts> studentsDebtsList) {
		this.studentsDebtsList = studentsDebtsList;
	}
}
