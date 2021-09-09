package com.studentslips.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studentslips.common.Common;
import com.studentslips.common.i18nUtil;
import com.studentslips.entities.AuthRegister;
import com.studentslips.entities.User;
import com.studentslips.services.AuthenticationService;
import com.studentslips.services.UserService;

@RestController
@RequestMapping("api")
public class AuthRestController {
    private static final Logger logger = LoggerFactory.getLogger(HeadTeachersRestController.class);
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthenticationService authService;
	
	@RequestMapping(value = "/A_R_01", method = RequestMethod.POST)
    public Map<String, ?> authRegister(@RequestBody AuthRegister authRegister, HttpSession session){
        Map<String, Object> result = new HashMap<>();
        String lang = session.getAttribute("lang") != null ? (String) session.getAttribute("lang") : "sr";
        
        try {
        	userService.register(authRegister);
            result.put(Common.STATUS, HttpStatus.OK.value());
            result.put(Common.MESSAGE, i18nUtil.getMessage(lang, Common.Message.REGISTER_OK));
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            result.put(Common.MESSAGE, ex.getMessage());
            logger.error(ex.getMessage());
        }
        return result;
    }
	
	@RequestMapping(value = "/A_R_02", method = RequestMethod.POST)
    public Map<String, ?> resetPassword(@RequestBody User user, HttpSession session){
        Map<String, Object> result = new HashMap<>();
        String lang = session.getAttribute("lang") != null ? (String) session.getAttribute("lang") : "sr";
        
        try {
        	if (authService.checkPassword(user) == 0) {
                result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
                result.put(Common.MESSAGE, i18nUtil.getMessage(lang, Common.Message.INCORRECT_EMAIL));
        	} else {
            	int cnt = authService.resetPassword(user);
            	if (cnt > 0) {        		
            		result.put(Common.STATUS, HttpStatus.OK.value());
                    result.put(Common.MESSAGE, i18nUtil.getMessage(lang, Common.Message.RESET_PWD_OK));
            	} else {
                    result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
                    result.put(Common.MESSAGE, i18nUtil.getMessage(lang, Common.Message.RESET_PWD_NG));
            	}
        	}
        } catch (Exception ex) {
            result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error(ex.getMessage());
        }

        return result;
    }
}