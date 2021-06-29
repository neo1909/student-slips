package com.studentslips.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.studentslips.common.ErrorCode;
import com.studentslips.common.ResultEntity;
import com.studentslips.entities.Services;
import com.studentslips.services.ServicesService;

@RestController
@RequestMapping("api/SV")
public class ServicesRestController {

    private static final Logger logger = LoggerFactory.getLogger(ServicesRestController.class);

    @Autowired
    private ServicesService servicesService;

    @RequestMapping(value = "/SV_R_01", method = RequestMethod.GET)
    public ResponseEntity<List<Services>> getAll(@RequestBody Services std){
        List<Services> list = servicesService.selectAllServices(std);
        if(list.isEmpty()){
            return new ResponseEntity<List<Services>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Services>>(list, HttpStatus.OK);
    }

    @RequestMapping(value = "/SV_R_02", method = RequestMethod.GET)
    public ResponseEntity<Services> getServices(@RequestBody Services std) {

        Services services = servicesService.selectServicesById(std.getId());
        if (services == null) {
            return new ResponseEntity<Services>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Services>(services, HttpStatus.OK);
    }

    @RequestMapping(value = "/SV_C_01", method = RequestMethod.POST)
    public ResponseEntity<?> addServices(@RequestBody Services std){
        int dataStd = servicesService.insertServices(std);
        if (dataStd == 1) {
            return new ResponseEntity<Integer>(dataStd, HttpStatus.OK);
        }
        ResultEntity re = new ResultEntity(ErrorCode.INSERT_FAIL,"Can not create Services");
        return new ResponseEntity<ResultEntity>(re, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/SV_U_01", method = RequestMethod.POST)
    public ResponseEntity<?> updateServices(@RequestBody Services std){
        Services dataStd = servicesService.selectServicesById(std.getId());
        if (dataStd == null) {
            ResultEntity re = new ResultEntity(ErrorCode.NOT_FOUND,"Not found Services id: "+ std.getId());
            return new ResponseEntity<ResultEntity>(re, HttpStatus.NOT_FOUND);
        } else {
            servicesService.updateServices(dataStd);
            return new ResponseEntity<Services>(dataStd, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/SV_D_01", method = RequestMethod.POST)
    public ResponseEntity<?> deleteServices(@RequestBody Services std) {

        Services services = servicesService.selectServicesById(std.getId());
        if (services == null) {
            ResultEntity re = new ResultEntity(ErrorCode.NOT_FOUND,"Not found services id: "+ std.getId());
            return new ResponseEntity<ResultEntity>(re, HttpStatus.NOT_FOUND);
        }
        servicesService.deleteServicesById(std);
        return new ResponseEntity<Services>(HttpStatus.OK);
    }
}
