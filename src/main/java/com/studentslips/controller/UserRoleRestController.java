package com.studentslips.controller;

import java.util.ArrayList;
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
import com.studentslips.entities.UserRole;
import com.studentslips.services.UserRoleService;

@RestController
@RequestMapping("api")
public class UserRoleRestController {
    private static final Logger logger = LoggerFactory.getLogger(UserRoleRestController.class);

    @Autowired
    private UserRoleService userRoleService;

    @RequestMapping(value = "/UR_R_01", method = RequestMethod.POST)
    public Map<String, ?> selectAllUserRoles(@RequestBody UserRole userRole) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, userRoleService.selectAllUserRoles(userRole));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/UR_R_02", method = RequestMethod.POST)
    public Map<String, ?> selectAllSimpleUserRoles(@RequestBody UserRole userRole) {
        Map<String, Object> result = new HashMap<>();
        
        List<String> listSimpleUserRoles = new ArrayList<>();
        List<UserRole> listUserRoles = userRoleService.selectAllUserRoles(userRole);
        listUserRoles.forEach(r -> {
        	listSimpleUserRoles.add(String.valueOf(r.getRoleId()));
        });

        try {
            result.put(Common.LIST, listSimpleUserRoles);
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/UR_C_01", method = RequestMethod.POST)
    public Map<String, ?> insertMultiUserRole(@RequestBody UserRole userRole) {
        Map<String, Object> result = new HashMap<>();

        try {
        	int cnt = userRoleService.insertMultiUserRole(userRole);
        	if (cnt > 0) {        		
        		result.put(Common.STATUS, HttpStatus.OK.value());
        	}
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }
}
