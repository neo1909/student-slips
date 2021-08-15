package com.studentslips.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studentslips.common.Common;
import com.studentslips.entities.Role;
import com.studentslips.services.RoleService;

@RestController
@RequestMapping("api")
public class RoleRestController {
    private static final Logger logger = LoggerFactory.getLogger(RoleRestController.class);

    @Autowired
    private RoleService roleService;

    @RequestMapping(value = "/R_R_01", method = RequestMethod.POST)
    public Map<String, ?> selectAllRoles(@RequestBody(required=false) Role role) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, roleService.selectAll(role));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/R_C_01", method = RequestMethod.POST)
    public Map<String, ?> insertRole(@RequestBody(required=false) Role role) {
        Map<String, Object> result = new HashMap<>();

        try {
            int cnt = roleService.insertRole(role);
            if (cnt > 0) {            	
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

    @RequestMapping(value = "/R_D_01", method = RequestMethod.POST)
    public Map<String, ?> deleteRole(@RequestBody(required=false) Role role) {
        Map<String, Object> result = new HashMap<>();

        try {
            int cnt = roleService.deleteRole(role);
            if (cnt > 0) {            	
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
