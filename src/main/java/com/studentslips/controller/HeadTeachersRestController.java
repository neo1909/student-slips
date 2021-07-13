package com.studentslips.controller;

import java.util.HashMap;
import java.util.Map;


import com.studentslips.common.Common;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studentslips.entities.HeadTeachers;
import com.studentslips.services.HeadTeachersService;

@RestController
@RequestMapping("api")
public class HeadTeachersRestController {
    private static final Logger logger = LoggerFactory.getLogger(HeadTeachersRestController.class);
    @Autowired
    private HeadTeachersService headTeachersService;


    @RequestMapping(value = "/HT_R_01", method = RequestMethod.POST)
    public Map<String, ?> getAll(@RequestBody HeadTeachers std){
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, headTeachersService.selectAllHeadTeachers(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }


    @RequestMapping(value = "/HT_R_02", method = RequestMethod.POST)
    public Map<String, ?> getHeadTeachers(@RequestBody HeadTeachers std) {

        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.OBJECT, headTeachersService.selectHeadTeachersById(std.getId()));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }


    @RequestMapping(value = "/HT_C_01", method = RequestMethod.POST)
    public Map<String, ?> addHeadTeachers(@RequestBody HeadTeachers std){

        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = headTeachersService.insertHeadTeachers(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/HT_U_01", method = RequestMethod.POST)
    public  Map<String, ?> updateHeadTeachers(@RequestBody HeadTeachers std){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = headTeachersService.updateHeadTeachers(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }


    @RequestMapping(value = "/HT_D_01", method = RequestMethod.POST)
    public Map<String, ?> deleteHeadTeachers(@RequestBody HeadTeachers std) {
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = headTeachersService.deleteHeadTeachersById(std.getId());
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
