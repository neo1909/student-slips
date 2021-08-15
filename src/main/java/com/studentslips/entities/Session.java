package com.studentslips.entities;

import java.sql.Timestamp;

public class Session {
	private int rnum;
	private String primaryId;
	private String sessionId;
	private long createTimeInMillis;
	private long lastAccessTimeInMillis;
	private long maxInactiveInterval;
	private long expiryTimeInMillis;
	private String principalName;

	private Timestamp createTime;
	private Timestamp lastAccessTime;
	private Timestamp expiryTime;
	
	private String fullName;
	
	public int getRnum() {
		return rnum;
	}

	public void setRnum(int rnum) {
		this.rnum = rnum;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public Timestamp getLastAccessTime() {
		return lastAccessTime;
	}

	public void setLastAccessTime(Timestamp lastAccessTime) {
		this.lastAccessTime = lastAccessTime;
	}

	public Timestamp getExpiryTime() {
		return expiryTime;
	}

	public void setExpiryTime(Timestamp expiryTime) {
		this.expiryTime = expiryTime;
	}

	public String getPrimaryId() {
		return primaryId;
	}

	public void setPrimaryId(String primaryId) {
		this.primaryId = primaryId;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public long getCreateTimeInMillis() {
		return createTimeInMillis;
	}

	public void setCreateTimeInMillis(long createTimeInMillis) {
		this.createTimeInMillis = createTimeInMillis;
	}

	public long getLastAccessTimeInMillis() {
		return lastAccessTimeInMillis;
	}

	public void setLastAccessTimeInMillis(long lastAccessTimeInMillis) {
		this.lastAccessTimeInMillis = lastAccessTimeInMillis;
	}

	public long getMaxInactiveInterval() {
		return maxInactiveInterval;
	}

	public void setMaxInactiveInterval(long maxInactiveInterval) {
		this.maxInactiveInterval = maxInactiveInterval;
	}

	public long getExpiryTimeInMillis() {
		return expiryTimeInMillis;
	}

	public void setExpiryTimeInMillis(long expiryTimeInMillis) {
		this.expiryTimeInMillis = expiryTimeInMillis;
	}

	public String getPrincipalName() {
		return principalName;
	}

	public void setPrincipalName(String principalName) {
		this.principalName = principalName;
	}

}
