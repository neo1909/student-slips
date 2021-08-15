package com.studentslips.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studentslips.common.Common;
import com.studentslips.entities.School;
import com.studentslips.services.SchoolService;

@RestController
@RequestMapping("api")
public class SchoolRestController {
    private static final Logger logger = LoggerFactory.getLogger(SchoolRestController.class);

    @Autowired
    private SchoolService schoolService;

    @RequestMapping(value = "/SC_R_01", method = RequestMethod.POST)
    public Map<String, ?> getAll(@RequestBody(required = false) School std) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, schoolService.selectAllSchool(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SC_R_02", method = RequestMethod.POST)
    public Map<String, ?> getSchool(@RequestBody School std) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.OBJECT, schoolService.selectSchoolById(std.getId()));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }
    

    @RequestMapping(value = "/SC_R_03", method = RequestMethod.POST)
    public Map<String, ?> getAllSimple(@RequestBody(required = false) School std) {
        Map<String, Object> result = new HashMap<>();

        try {
        	List<School> simpleSchools = schoolService.selectAllSchool(std);
        	for (School s: simpleSchools) {
        		s.setBackAccountNumber(null);
        		s.setDelYn(null);
        		s.setMunicipality(null);
        	}
            result.put(Common.LIST, simpleSchools);
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SC_C_01", method = RequestMethod.POST)
    public Map<String,?> addSchool(@RequestBody School std){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = schoolService.insertSchool(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SC_U_01", method = RequestMethod.POST)
    public Map<String,?> updateSchool(@RequestBody School std){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = schoolService.updateSchool(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SC_D_01", method = RequestMethod.POST)
    public Map<String,?> deleteSchool(@RequestBody School std) {

        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = schoolService.deleteSchoolById(std.getId());
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
