package com.studentslips.controller;

import java.util.HashMap;
import java.util.Map;

import com.studentslips.common.Common;
import com.studentslips.common.SessionUtil;
import com.studentslips.common.StudentSlipConstants;
import com.studentslips.common.StudentSlipException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studentslips.entities.Services;
import com.studentslips.services.ServicesService;

@RestController
@RequestMapping("api")
public class ServicesRestController {

    private static final Logger logger = LoggerFactory.getLogger(ServicesRestController.class);

    @Autowired
    private ServicesService servicesService;

    @RequestMapping(value = "/SV_R_01", method = RequestMethod.POST)
    public Map<String, ?> getAll(@RequestBody(required = false) Services std){
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, servicesService.selectAllServices(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            throw new StudentSlipException(ex.getMessage(), true);
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
            throw new StudentSlipException(ex.getMessage(), true);
        }

        return result;
    }

    @RequestMapping(value = "/SV_C_01", method = RequestMethod.POST)
    public Map<String, ?> addServices(@RequestBody Services std){
        Map<String, Object> result = new HashMap<>();
        
        if (std.getSupplierId() == 0 || !StringUtils.hasText(std.getName())) {
            throw new StudentSlipException("Invalid Supplier or Service information");
        }
        
        try {
            int dataStd = servicesService.insertServices(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            throw new StudentSlipException(ex.getMessage(), true);
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
            throw new StudentSlipException(ex.getMessage(), true);
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
            throw new StudentSlipException(ex.getMessage(), true);
        }

        return result;
    }
}
