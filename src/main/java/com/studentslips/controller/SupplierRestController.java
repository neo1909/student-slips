package com.studentslips.controller;


import com.studentslips.common.ErrorCode;
import com.studentslips.common.ResultEntity;
import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDTO;
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
    private com.studentslips.services.SupplierService supplierService;

    @RequestMapping(value = "/SL_R_01", method = RequestMethod.GET)
    public ResponseEntity<List<Supplier>> getAll(@RequestBody Supplier std){

        List<Supplier> list= supplierService.selectAllSupplier(std);
        if(list.isEmpty()){
            return new ResponseEntity<List<Supplier>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Supplier>>(list, HttpStatus.OK);
    }
    @RequestMapping(value = "/SL_R_02", method = RequestMethod.GET)
    public ResponseEntity<List<SupplierServiceDTO>> getSupplierService(@RequestBody SupplierServiceDTO std){

        List<SupplierServiceDTO> list= supplierService.selectAllSupplierDetail(std);
        if(list.isEmpty()){
            return new ResponseEntity<List<SupplierServiceDTO>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<SupplierServiceDTO>>(list, HttpStatus.OK);
    }
    @RequestMapping(value = "/SL_C_01", method = RequestMethod.POST)
    public ResponseEntity<?> insertSupplier(@RequestBody Supplier std){
        try {
            supplierService.insertSupplier(std);
            return new ResponseEntity<Supplier>(std, HttpStatus.OK);
        }catch (Exception e){
            ResultEntity entity = new ResultEntity(ErrorCode.CONTACT_ADMIN,e.getMessage());
            return new ResponseEntity<ResultEntity>(entity, HttpStatus.NO_CONTENT);
        }
    }
    @RequestMapping(value = "/SL_U_01", method = RequestMethod.POST)
    public ResponseEntity<?> updateSupplier(@RequestBody Supplier std){
        try {
            supplierService.updateSupplier(std);
            return new ResponseEntity<Supplier>(std, HttpStatus.OK);
        }catch (Exception e){
            ResultEntity entity = new ResultEntity(ErrorCode.CONTACT_ADMIN,e.getMessage());
            return new ResponseEntity<ResultEntity>(entity, HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/SL_D_01", method = RequestMethod.POST)
    public ResponseEntity<?> deleteSupplier(@RequestBody Supplier std){
        try {
            supplierService.deleteSupplier(std);
            return new ResponseEntity<Supplier>(std, HttpStatus.OK);
        }catch (Exception e){
            ResultEntity entity = new ResultEntity(ErrorCode.CONTACT_ADMIN,e.getMessage());
            return new ResponseEntity<ResultEntity>(entity, HttpStatus.NO_CONTENT);
        }
    }
}
