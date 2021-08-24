package com.studentslips.controller;

import com.studentslips.common.Common;
import com.studentslips.entities.BankStatement;
import com.studentslips.entities.BankStatementArchiveSearch;
import com.studentslips.services.BankStatementArchiveService;
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
public class BankStatementArchiveController {

    private static final Logger logger = LoggerFactory.getLogger(BankStatementArchiveController.class);

    @Autowired
    private BankStatementArchiveService bankStatementArchiveService;

    @RequestMapping(value = "/BSA_R_01", method = RequestMethod.POST)
    public Map<String, ?> getAll(@RequestBody BankStatementArchiveSearch std){
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, bankStatementArchiveService.selectAll(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }


    @RequestMapping(value = "/BSA_R_02", method = RequestMethod.POST)
    public Map<String, ?> getBankStatementArchiveById(@RequestBody BankStatementArchiveSearch std) {

        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, bankStatementArchiveService.selectDetail(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }


    @RequestMapping(value = "/BSA_U_01", method = RequestMethod.POST)
    public  Map<String, ?> updateBankStatementArchive(@RequestBody BankStatement std){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = bankStatementArchiveService.updateHeadBankStatementsArchive(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }
}
