package com.studentslips.entities;

import java.util.List;

public class StudentSearch {
	private int id;
	private String name;
	private int schoolId;
	private int sClass;
	private int grade;
	private String delYn;
	private String schoolName;
	private String studentId;
	private String schoolAccountNumber;
	private String schoolAddress;

	private List<String> listStudentIds;

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

	public String getDelYn() {
		return delYn;
	}

	public void setDelYn(String delYn) {
		this.delYn = delYn;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public String getStudentId() {
		return studentId;
	}

	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}

	public String getSchoolAccountNumber() {
		return schoolAccountNumber;
	}

	public void setSchoolAccountNumber(String schoolAccountNumber) {
		this.schoolAccountNumber = schoolAccountNumber;
	}

	public String getSchoolAddress() {
		return schoolAddress;
	}

	public void setSchoolAddress(String schoolAddress) {
		this.schoolAddress = schoolAddress;
	}

	public List<String> getListStudentIds() {
		return listStudentIds;
	}

	public void setListStudentIds(List<String> listStudentIds) {
		this.listStudentIds = listStudentIds;
	}

}
