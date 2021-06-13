package com.studentslips.common;

public class ResultEntity {
    private String code;
    private String error;

    public ResultEntity(String code, String error) {
        this.code = code;
        this.error = error;
    }
    public ResultEntity(ResultEntity re) {
        this.code = re.code;
        this.error = re.error;
    }
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
