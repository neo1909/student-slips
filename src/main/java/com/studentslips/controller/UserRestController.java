package com.studentslips.controller;

import java.util.HashMap;
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
import com.studentslips.entities.User;
import com.studentslips.entities.UserRole;
import com.studentslips.services.UserRoleService;
import com.studentslips.services.UserService;

@RestController
@RequestMapping("api")
public class UserRestController {
    private static final Logger logger = LoggerFactory.getLogger(UserRestController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/U_R_01", method = RequestMethod.POST)
    public Map<String, ?> searchAllUsers(@RequestBody User user) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, userService.searchAllUsers(user));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/U_C_01", method = RequestMethod.POST)
    public Map<String,?> addUser(@RequestBody User user){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = userService.insertUser(user);
            if (dataStd == 1) {
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

    @RequestMapping(value = "/U_U_01", method = RequestMethod.POST)
    public Map<String,?> updateUser(@RequestBody User user){
        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = userService.updateUserForAdmin(user);
            if (dataStd == 1) {
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

    @RequestMapping(value = "/U_D_01", method = RequestMethod.POST)
    public Map<String,?> deleteUser(@RequestBody User user) {

        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = userService.deleteUserById(user);
            if (dataStd == 1) {
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
