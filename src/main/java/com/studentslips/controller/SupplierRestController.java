package com.studentslips.controller;


import com.studentslips.common.Common;
import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDetail;
import com.studentslips.entities.SupplierServiceDetailGroup;
import com.studentslips.services.SupplierService;
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
public class SupplierRestController {

    private static final Logger logger = LoggerFactory.getLogger(SupplierRestController.class);

    @Autowired
    private SupplierService supplierService;

    @RequestMapping(value = "/SL_R_01", method = RequestMethod.POST)
    public Map<String,?> getAll(@RequestBody(required = false) Supplier std){
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, supplierService.selectAllSupplier(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/SL_R_02", method = RequestMethod.POST)
    public Map<String,?> getSupplierById(@RequestBody Supplier std){
        Map<String, Object> result = new HashMap<>();
        try {
            result.put(Common.OBJECT, supplierService.selectSupplierById(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/SL_C_01", method = RequestMethod.POST)
    public Map<String,?> insertSupplier(@RequestBody Supplier std){
        Map<String, Object> result = new HashMap<>();
        try {
            supplierService.insertSupplier(std);
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }
    @RequestMapping(value = "/SL_U_01", method = RequestMethod.POST)
    public Map<String,?> updateSupplier(@RequestBody Supplier std){
        Map<String, Object> result = new HashMap<>();
        try {
            supplierService.updateSupplier(std);
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SL_D_01", method = RequestMethod.POST)
    public Map<String,?> deleteSupplier(@RequestBody Supplier std){
        Map<String, Object> result = new HashMap<>();
        try {
            supplierService.deleteSupplier(std);
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }
}
