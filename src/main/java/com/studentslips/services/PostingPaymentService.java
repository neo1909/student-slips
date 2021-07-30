package com.studentslips.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostingPaymentService {
    public void saveUploadedFiles(List<MultipartFile> files) throws Exception;

    boolean isNotPostStatement() throws Exception;

    void saveAndPostPayment() throws Exception;
}
