package com.studentslips.controller;

import com.studentslips.common.Common;
import com.studentslips.entities.SchoolAndClass;
import com.studentslips.entities.SchoolAndClassSearch;
import com.studentslips.services.OverViewSchoolService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
public class OverViewSchoolRestController {

    private static final Logger logger = LoggerFactory.getLogger(OverViewSchoolRestController.class);

    @Autowired
    private OverViewSchoolService overViewSchoolService;

    @RequestMapping(value = "/OVS_R_01", method = RequestMethod.POST)
    public Map<String, ?> getAll(@RequestBody SchoolAndClassSearch std){
        Map<String, Object> result = new HashMap<>();

        try {
            List<SchoolAndClass> schoolList = new ArrayList<>();
            if (!std.getServiceListId().isEmpty()) {
                schoolList = overViewSchoolService.selectAllSchool(std);

                schoolList.forEach(c -> {
                    c.setServiceListString(std.getServiceListString());
                });
            }
            result.put(Common.LIST, schoolList);
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/OVS_R_02", method = RequestMethod.POST)
    public Map<String, ?> getDetail(@RequestBody SchoolAndClassSearch std){
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, overViewSchoolService.selectDetailSchool(std));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }
}
