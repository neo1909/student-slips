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
import com.studentslips.entities.Session;
import com.studentslips.services.SessionService;

@RestController
@RequestMapping("api")
public class SessionRestController {
    private static final Logger logger = LoggerFactory.getLogger(SessionRestController.class);

    @Autowired
    private SessionService sessionService;
    
	
	@RequestMapping(value = "/SS_R_01", method = RequestMethod.POST)
    public Map<String, ?> selectAllSessions(@RequestBody Session session) {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put(Common.LIST, sessionService.selectAllSessions(session));
            result.put(Common.STATUS, HttpStatus.OK.value());
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }

    @RequestMapping(value = "/SS_D_01", method = RequestMethod.POST)
    public Map<String,?> deleteUser(@RequestBody Session session) {

        Map<String, Object> result = new HashMap<>();
        try {
            int dataStd = sessionService.deleteSession(session);
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
