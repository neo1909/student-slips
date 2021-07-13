package com.studentslips.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.studentslips.common.Common;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studentslips.common.ErrorCode;
import com.studentslips.common.ResultEntity;
import com.studentslips.entities.Services;
import com.studentslips.services.ServicesService;

@RestController
@RequestMapping("api")
public class ServicesRestController {

    private static final Logger logger = LoggerFactory.getLogger(ServicesRestController.class);

    @Autowired
    private ServicesService servicesService;

    @RequestMapping(value = "/SV_R_01", method = RequestMethod.POST)
    public Map<String, ?> getAll(@RequestBody Services std){
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, servicesService.selectAllServices(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SV_R_02", method = RequestMethod.POST)
    public Map<String, ?> getServices(@RequestBody Services std) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.OBJECT, servicesService.selectServicesById(std.getId()));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SV_C_01", method = RequestMethod.POST)
    public Map<String, ?> addServices(@RequestBody Services std){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = servicesService.insertServices(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SV_U_01", method = RequestMethod.POST)
    public Map<String, ?> updateServices(@RequestBody Services std){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = servicesService.updateServices(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SV_D_01", method = RequestMethod.POST)
    public Map<String, ?> deleteServices(@RequestBody Services std) {
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = servicesService.deleteServicesById(std.getId());
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
