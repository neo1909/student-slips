package com.studentslips.controller;

import com.studentslips.common.ErrorCode;
import com.studentslips.common.ResultEntity;
import com.studentslips.entities.Services;
import com.studentslips.services.ServicesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("api")
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
            dataStd.setName(std.getName());
            dataStd.setUpdateId(100);
            dataStd.setUpdateDate(new Timestamp(System.currentTimeMillis()));
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
        std.setDelYn("Y");
        std.setUpdateId(100);
        std.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        servicesService.updateServices(std);
        return new ResponseEntity<Services>(HttpStatus.OK);
    }
}
