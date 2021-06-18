package com.studentslips.controller;

import com.studentslips.entities.SupplierDTO;
import com.studentslips.services.SupplierService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/SL")
public class SupplierRestController {

    private static final Logger logger = LoggerFactory.getLogger(SupplierRestController.class);

    @Autowired
    private SupplierService supplierService;

    @RequestMapping(value = "/SL_R_01", method = RequestMethod.GET)
    public ResponseEntity<List<SupplierDTO>> getAll(@RequestBody SupplierDTO std){

        List<SupplierDTO> list= supplierService.selectAllSupplier(std);
        if(list.isEmpty()){
            return new ResponseEntity<List<SupplierDTO>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<SupplierDTO>>(list, HttpStatus.OK);
    }
}
