package com.studentslips.controller;

import com.studentslips.common.Common;
import com.studentslips.entities.Student;
import com.studentslips.entities.StudentOverviewBalancePrintDTO;
import com.studentslips.entities.StudentOverviewBalanceRequestDTO;
import com.studentslips.services.StudentOverviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api")
public class StudentOverviewRestController {
    private static final Logger logger = LoggerFactory.getLogger(StudentRestController.class);

    @Autowired
    StudentOverviewService studentOverviewService;

    @RequestMapping(value = "/ST_OV_01", method = RequestMethod.POST)
    public Map<String, ?> getAll(@RequestBody(required = false) Student std) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, studentOverviewService.selectStudentOverview(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/ST_OV_02", method = RequestMethod.POST)
    public Map<String, ?> getStudentOverviewBalance(@RequestBody(required = false) StudentOverviewBalanceRequestDTO requestDTO) {
        Map<String, Object> result = new HashMap<>();

        try {

            result = studentOverviewService.selectStudentOverviewBalance(requestDTO);

            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            ex.printStackTrace();
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/ST_OV_03", method = RequestMethod.POST)
    public Map<String, ?> getPrintData(@RequestBody(required = false) StudentOverviewBalancePrintDTO dto) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, studentOverviewService.selectPrintData(dto));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            ex.printStackTrace();
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }
}
