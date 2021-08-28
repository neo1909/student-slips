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
import com.studentslips.common.StudentSlipException;
import com.studentslips.entities.SupplierServiceDetail;
import com.studentslips.entities.SupplierServiceDetailGroup;
import com.studentslips.services.SupplierService;

@RestController
@RequestMapping("api")
public class SupplierServiceRestController {

    private static final Logger logger = LoggerFactory.getLogger(SupplierServiceRestController.class);

    @Autowired
    private SupplierService supplierService;

	/**
	 * ====================
	 * @Section Supplier - Service 
	 * ====================
	 */
	@RequestMapping(value = "/SL_R_03", method = RequestMethod.POST)
	public Map<String, ?> getSupplierService(@RequestBody SupplierServiceDetail ssd) {
		Map<String, Object> result = new HashMap<>();
		try {
			result.put(Common.LIST, supplierService.selectAllSupplierDetail(ssd));
			result.put(Common.STATUS, HttpStatus.OK.value());
		} catch (Exception ex) {
			result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
			logger.error(ex.getMessage());
		}
		return result;
	}

	@RequestMapping(value = "/SL_R_04", method = RequestMethod.POST)
	public Map<String, ?> getAllInstallmentsByGradeAndService(@RequestBody SupplierServiceDetail ssd) {
		Map<String, Object> result = new HashMap<>();
		try {
			result.put(Common.OBJECT, supplierService.getAllInstallmentsByGradeAndService(ssd));
			result.put(Common.STATUS, HttpStatus.OK.value());
		} catch (Exception ex) {
			result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
			logger.error(ex.getMessage());
		}

		return result;
	}
	
	/**
	 * ====================
	 * @Section Supplier - Service Detail 
	 * ====================
	 */
	@RequestMapping(value = "/SL_C_03", method = RequestMethod.POST)
	public Map<String, ?> insertSupplierServiceDetail(@RequestBody SupplierServiceDetailGroup ssg) {
		Map<String, Object> result = new HashMap<>();
		try {
			supplierService.insertSupplierServiceDetail(ssg);
			result.put(Common.STATUS, HttpStatus.OK.value());
		} catch (StudentSlipException e) {
			throw e;
		} catch (Exception ex) {
			result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
			logger.error(ex.getMessage());
		}

		return result;
	}

	@RequestMapping(value = "/SL_U_03", method = RequestMethod.POST)
	public Map<String, ?> updateSupplierServiceDetail(@RequestBody SupplierServiceDetailGroup ssg) {
		Map<String, Object> result = new HashMap<>();
		try {
			supplierService.updateSupplierServiceDetail(ssg);
			result.put(Common.STATUS, HttpStatus.OK.value());
		} catch (StudentSlipException e) {
			throw e;
		} catch (Exception ex) {
			result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
			logger.error(ex.getMessage());
		}

		return result;
	}

	@RequestMapping(value = "/SL_D_03", method = RequestMethod.POST)
	public Map<String, ?> deleteSupplierServiceDetail(@RequestBody SupplierServiceDetailGroup ssg) {
		Map<String, Object> result = new HashMap<>();
		try {
			supplierService.deleteSupplierServiceDetail(ssg);
			result.put(Common.STATUS, HttpStatus.OK.value());
		} catch (Exception ex) {
			result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
			logger.error(ex.getMessage());
		}

		return result;
	}

	@RequestMapping(value = "/SLG_R_01", method = RequestMethod.POST)
	public Map<String, ?> getAllSupplierServiceGroups(@RequestBody SupplierServiceDetail std) {
		Map<String, Object> result = new HashMap<>();
		try {
			result.put(Common.LIST, supplierService.getAllSupplierServiceGroups(std));
			result.put(Common.STATUS, HttpStatus.OK.value());
		} catch (Exception ex) {
			result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
			logger.error(ex.getMessage());
		}

		return result;
	}

	@RequestMapping(value = "/SLG_R_02", method = RequestMethod.POST)
	public Map<String, ?> getSupplierServiceGroupByGroupId(@RequestBody SupplierServiceDetail std) {
		Map<String, Object> result = new HashMap<>();
		try {
			result.put(Common.OBJECT, supplierService.getSupplierServiceGroupByGroupId(std));
			result.put(Common.STATUS, HttpStatus.OK.value());
		} catch (Exception ex) {
			result.put(Common.STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
			logger.error(ex.getMessage());
		}

		return result;
	}
}
