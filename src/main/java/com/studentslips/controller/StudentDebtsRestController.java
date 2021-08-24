package com.studentslips.controller;

import com.studentslips.common.Common;
import com.studentslips.entities.StudentDebtsObject;
import com.studentslips.entities.StudentsDebts;
import com.studentslips.entities.StudentsDebtsTask;
import com.studentslips.entities.TaskArchiveSearch;
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
    public Map<String, ?> getSudentDebts(@RequestBody StudentsDebts std){
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
    @RequestMapping(value = "/SD_R_02", method = RequestMethod.POST)
    public Map<String, ?> search(@RequestBody StudentsDebts std){
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, studentDebtsService.search(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }
    @RequestMapping(value = "/SD_C_01", method = RequestMethod.POST)
    public Map<String, ?> addStudentsDebts(@RequestBody StudentDebtsObject std){
        Map<String, Object> result = new HashMap<>();
        try {
        	StudentsDebtsTask newTask = studentDebtsService.insertTaskArchive(std);
        	std.setTaskId(newTask.getId());
            studentDebtsService.insertStudentsDebtsObj(std);
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SD_U_01", method = RequestMethod.POST)
    public Map<String, ?> updateStudentsDebts(@RequestBody StudentDebtsObject std){
        Map<String, Object> result = new HashMap<>();
        try {
           studentDebtsService.updateStudentsDebtsObj(std);
           StudentsDebtsTask task = new StudentsDebtsTask();
           task.setId(std.getTaskId());
           task.setNote(std.getPurpose());
           studentDebtsService.updateTaskArchive(task);
                result.put(Common.STATUS, HttpStatus.OK.value());
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

    @RequestMapping(value = "/TA_R_01", method = RequestMethod.POST)
    public Map<String, ?> searchTaskArchive(@RequestBody TaskArchiveSearch std){
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, studentDebtsService.searchTaskArchives(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/TA_D_01", method = RequestMethod.POST)
    public Map<String, ?> deleteTaskArchive(@RequestBody StudentsDebtsTask studentsDebtsTask){
        Map<String, Object> result = new HashMap<>();

        try {
        	StudentsDebts std = new StudentsDebts();
        	std.setTaskId(studentsDebtsTask.getId());
        	int cnt = studentDebtsService.deleteStudentsDebtsById(std);
        	int cntParent = studentDebtsService.deleteTaskArchive(studentsDebtsTask);
        	if (cnt > 0 && cntParent > 0) {        		        		
        		result.put(Common.STATUS, HttpStatus.OK.value());
        	} else {
                result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
        	}
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }
}
