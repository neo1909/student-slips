package com.studentslips.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostingPaymentService {
    String saveUploadedFiles(List<MultipartFile> files) throws Exception;

    boolean isNotPostStatement() throws Exception;

    String saveAndPostPayment() throws Exception;

    boolean validateBeforeUpload(List<MultipartFile> files);
}
