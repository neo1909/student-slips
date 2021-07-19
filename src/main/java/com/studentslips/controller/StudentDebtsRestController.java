package com.studentslips.controller;

import com.studentslips.common.Common;
import com.studentslips.entities.StudentsDebts;
import com.studentslips.services.StudentDebtsService;
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
public class StudentDebtsRestController {
    private static final Logger logger = LoggerFactory.getLogger(StudentDebtsRestController.class);

    @Autowired
    private StudentDebtsService studentDebtsService;

    @RequestMapping(value = "/SD_R_01", method = RequestMethod.POST)
    public Map<String, ?> getAll(@RequestBody StudentsDebts std){
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, studentDebtsService.selectStudentDebts(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SD_C_01", method = RequestMethod.POST)
    public Map<String, ?> addStudentsDebts(@RequestBody StudentsDebts std){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = studentDebtsService.insertStudentsDebts(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SD_U_01", method = RequestMethod.POST)
    public Map<String, ?> updateStudentsDebts(@RequestBody StudentsDebts std){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = studentDebtsService.updateStudentsDebts(std);
            if (dataStd == 1) {
                result.put(Common.STATUS, HttpStatus.OK.value());
            }
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SD_D_01", method = RequestMethod.POST)
    public Map<String, ?> deleteStudentsDebts(@RequestBody StudentsDebts std) {
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = studentDebtsService.deleteStudentsDebtsById(std);
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