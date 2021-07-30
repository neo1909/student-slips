package com.studentslips.controller;


import com.studentslips.common.Common;
import com.studentslips.services.PostingPaymentService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api")
public class PostingPaymentRestController {

    private static final Logger logger = LoggerFactory.getLogger(PostingPaymentRestController.class);

    @Autowired
    private PostingPaymentService postingPaymentService;


    @RequestMapping(value = "/PP_R_01", method = RequestMethod.POST)
    public Map<String, ?> uploadPostingPayment(@RequestParam("files") MultipartFile[] uploadFiles) {
        logger.debug("### START file upload!");

        Map<String, Object> result = new HashMap<>();

        String uploadedFileName = Arrays.stream(uploadFiles).map(MultipartFile::getOriginalFilename)
                .filter(StringUtils::isNotEmpty).collect(Collectors.joining(" , "));

        if (StringUtils.isEmpty(uploadedFileName)) {
            result.put("errMsg", "Please select a file!");
            result.put(Common.STATUS, HttpStatus.OK.value());
            return result;
        }

        try {
            postingPaymentService.saveUploadedFiles(Arrays.asList(uploadFiles));
            result.put("msg", "File uploaded");
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            return result;
        }

        return result;
    }

    @RequestMapping(value = "/PP_R_02", method = RequestMethod.POST)
    public Map<String, ?> isNotPostStatement() {
        logger.debug("### START isNotPostStatement!");
        Map<String, Object> result = new HashMap<>();

        try {
            boolean isNotPostStatement = postingPaymentService.isNotPostStatement();
            result.put("isNotPostStatement", isNotPostStatement);
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            return result;
        }

        return result;
    }

    @RequestMapping(value = "/PP_R_03", method = RequestMethod.POST)
    public Map<String, ?> saveAndPostPayment() {
        logger.debug("### START saveAndPostPayment!");
        Map<String, Object> result = new HashMap<>();

        try {
            postingPaymentService.saveAndPostPayment();

            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            return result;
        }

        return result;
    }
}
