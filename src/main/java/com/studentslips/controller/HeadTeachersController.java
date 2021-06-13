package com.studentslips.controller;

import com.studentslips.common.ErrorCode;
import com.studentslips.common.ResultEntity;
import com.studentslips.entities.HeadTeachers;
import com.studentslips.services.HeadTeachersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("api/headteachers")
public class HeadTeachersController {
    private static final Logger logger = LoggerFactory.getLogger(HeadTeachersController.class);
    @Autowired
    private HeadTeachersService headTeachersService;

    @RequestMapping(value = "/HT_R_01", method = RequestMethod.GET)
    public ResponseEntity<List<HeadTeachers>> getAll(@RequestBody HeadTeachers std){
        List<HeadTeachers> listHeadTeachers = headTeachersService.selectAllHeadTeachers(std);
        if(listHeadTeachers.isEmpty()){
            return new ResponseEntity<List<HeadTeachers>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<HeadTeachers>>(listHeadTeachers, HttpStatus.OK);
    }


    @RequestMapping(value = "/HT_R_02", method = RequestMethod.GET)
    public ResponseEntity<HeadTeachers> getHeadTeachers(@RequestBody HeadTeachers std) {

        HeadTeachers headTeachers = headTeachersService.selectHeadTeachersById(std.getId());
        if (headTeachers == null) {
            return new ResponseEntity<HeadTeachers>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<HeadTeachers>(headTeachers, HttpStatus.OK);
    }


    @RequestMapping(value = "/HT_C_01", method = RequestMethod.POST)
    public ResponseEntity<?> addHeadTeachers(@RequestBody HeadTeachers std){
        int dataStd = headTeachersService.insertHeadTeachers(std);
        if (dataStd == 1) {
            return new ResponseEntity<Integer>(dataStd, HttpStatus.OK);
        }
        ResultEntity re = new ResultEntity(ErrorCode.INSERT_FAIL,"Can not create Head Teachers");
        return new ResponseEntity<ResultEntity>(re, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/HT_U_01", method = RequestMethod.POST)
    public ResponseEntity<?> updateHeadTeachers(@RequestBody HeadTeachers std){
        HeadTeachers dataStd = headTeachersService.selectHeadTeachersById(std.getId());
        if (dataStd == null) {
            ResultEntity re = new ResultEntity(ErrorCode.NOT_FOUND,"Not found Head Teachers id: "+ std.getId());
            return new ResponseEntity<ResultEntity>(re, HttpStatus.NOT_FOUND);
        } else {
            dataStd.setName(std.getName());
            dataStd.setsClass(std.getsClass());
            dataStd.setGrade(std.getGrade());
            dataStd.setUpdateId(100);
            dataStd.setUpdateDate(new Timestamp(System.currentTimeMillis()));
            headTeachersService.updateHeadTeachers(dataStd);
            return new ResponseEntity<HeadTeachers>(dataStd, HttpStatus.OK);
        }
    }


    @RequestMapping(value = "/HT_D_01", method = RequestMethod.POST)
    public ResponseEntity<?> deleteHeadTeachers(@RequestBody HeadTeachers std) {

        HeadTeachers headTeachers = headTeachersService.selectHeadTeachersById(std.getId());
        if (headTeachers == null) {
            ResultEntity re = new ResultEntity(ErrorCode.NOT_FOUND,"Not found Head Teachers id: "+ std.getId());
            return new ResponseEntity<ResultEntity>(re, HttpStatus.NOT_FOUND);
        }
        std.setDelYn("Y");
        std.setUpdateId(100);
        std.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        headTeachersService.updateHeadTeachers(std);
        return new ResponseEntity<HeadTeachers>(HttpStatus.OK);
    }
}
