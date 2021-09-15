package com.studentslips.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.studentslips.common.Common;
import com.studentslips.common.SessionUtil;
import com.studentslips.common.StudentSlipException;
import com.studentslips.common.i18nUtil;
import com.studentslips.dao.SupplierDao;
import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDetail;
import com.studentslips.entities.SupplierServiceDetailGroup;

@Component(value = "SupplierService")
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    SupplierDao supplierDao;

    @Override
    public List<Supplier> selectAllSupplier(Supplier supplier) throws Exception {
        supplier.setSchoolId(SessionUtil.getSchoolId());
        return supplierDao.selectAllSupplier(supplier);
    }

    @Override
    public Supplier selectSupplierById(Supplier supplier) throws Exception {
        supplier.setSchoolId(SessionUtil.getSchoolId());
        return supplierDao.selectSupplierById(supplier.getId());
    }

    @Override
    public void insertSupplier(Supplier supplier) throws Exception {

		int sqSupplierId =  genSupplierId(supplierDao.selectMaxSupplierId(SessionUtil.getSchoolId()));

		Supplier supplierExist = new Supplier();
		supplierExist.setSupplierId(sqSupplierId);
		supplierExist.setSchoolId(SessionUtil.getSchoolId());
		supplierExist = supplierDao.selectSupplierExist(supplierExist);

		if(supplierExist !=null && supplierExist.getId()!=0){
			throw new StudentSlipException(i18nUtil.getMessage(SessionUtil.getLang(), Common.Message.EXISTED_SUPPLIER));
		}

		supplier.setSupplierId(sqSupplierId);
        supplier.setInsertId(SessionUtil.getUserLoginId());
        supplier.setSchoolId(SessionUtil.getSchoolId());
        supplierDao.insertSupplier(supplier);
    }

    @Override
    public void updateSupplier(Supplier supplier) throws Exception {
        supplier.setUpdateId(SessionUtil.getUserLoginId());
        supplierDao.updateSupplier(supplier);

    }

    @Override
    public void deleteSupplier(Supplier supplier) throws Exception {
        supplier.setUpdateId(SessionUtil.getUserLoginId());
        supplierDao.deleteSupplier(supplier);
    }

    @Override
    public List<SupplierServiceDetail> selectAllSupplierDetail(SupplierServiceDetail supplierServiceDetail) throws Exception {
        supplierServiceDetail.setSchoolId(SessionUtil.getSchoolId());
        if (supplierServiceDetail.getGrade() == 0) {
            return supplierDao.selectSupplierServiceAllGrades(supplierServiceDetail);
        }
        return supplierDao.selectAllSupplierService(supplierServiceDetail);
    }

    @Override
    public void insertSupplierServiceDetail(SupplierServiceDetailGroup ssg) throws Exception {
    	ssg.setSchoolId(SessionUtil.getSchoolId());
    	int count = supplierDao.countSupplierServiceGroup(ssg);
    	if (count > 0) {
        	throw new StudentSlipException(i18nUtil.getMessage(SessionUtil.getLang(), Common.Message.SUPPLIER_SERVICE_EXISTED_NO_INSERT));
    	}
    	
    	ssg.setInsertId(SessionUtil.getUserLoginId());
    	ssg.setSchoolId(SessionUtil.getSchoolId());
        int result = supplierDao.insertSupplierServiceGroup(ssg);
        if (result > 0) {
        	SupplierServiceDetail ssd = new SupplierServiceDetail();
        	ssd.setGroupId(ssg.getGroupId());
        	ssd.setListGradeIdsStr(ssg.getListGradeIdsStr());
        	ssd.setListGradeIds(ssg.getListGradeIds());
        	ssd.setName(ssg.getName());
        	ssd.setSupplierId(ssg.getSupplierId());
        	ssd.setServiceId(ssg.getServiceId());
        	ssd.setSchoolId(ssg.getSchoolId());
        	ssd.setInsertId(SessionUtil.getUserLoginId());
        	for (Integer grade: ssd.getListGradeIds()) {
        		ssd.setId(0);
        		ssd.setGrade(grade);
    			supplierDao.insertSupplierService(ssd);
        	}
        } else {
        	throw new StudentSlipException("Failed to create Supplier - Service Detail");
        }
    }

    @Override
    public void updateSupplierServiceDetail(SupplierServiceDetailGroup ssg) throws Exception {
    	ssg.setSchoolId(SessionUtil.getSchoolId());
    	int count = supplierDao.countSupplierServiceGroup(ssg);
    	if (count > 0) {
        	throw new StudentSlipException(i18nUtil.getMessage(SessionUtil.getLang(), Common.Message.SUPPLIER_SERVICE_EXISTED_NO_UPDATE));
    	}
    	
    	ssg.setUpdateId(SessionUtil.getUserLoginId());
        supplierDao.updateSupplierServiceGroup(ssg);

		SupplierServiceDetail ssdInsert = new SupplierServiceDetail();
		ssdInsert.setName(ssg.getName());
		ssdInsert.setSupplierId(ssg.getSupplierId());
		ssdInsert.setServiceId(ssg.getServiceId());
		ssdInsert.setGroupId(ssg.getGroupId());
		ssdInsert.setSchoolId(SessionUtil.getSchoolId());
		ssdInsert.setInsertId(SessionUtil.getUserLoginId());
    	if (!ssg.getTrInsert().isEmpty()) {
	    	for (Integer grade: ssg.getTrInsert()) {
	    		ssdInsert.setId(0);
	    		ssdInsert.setGrade(grade);
	            supplierDao.insertSupplierService(ssdInsert);
	    	}
    	}

    	if (!ssg.getTrDelete().isEmpty()) {
    		SupplierServiceDetail ssdDelete = new SupplierServiceDetail();
    		ssdDelete.setListGradeIds(ssg.getTrDelete());
    		ssdDelete.setGroupId(ssg.getGroupId());
    		ssdDelete.setUpdateId(SessionUtil.getUserLoginId());
    		supplierDao.deleteSupplierService(ssdDelete);
    	}

    	if (!ssg.getTrUpdate().isEmpty()) {
	    	SupplierServiceDetail ssdUpdate = new SupplierServiceDetail();
	    	ssdUpdate.setName(ssg.getName());
	    	ssdUpdate.setListGradeIds(ssg.getTrUpdate());
	    	ssdUpdate.setSupplierId(ssg.getSupplierId());
	    	ssdUpdate.setServiceId(ssg.getServiceId());
	    	ssdUpdate.setSchoolId(SessionUtil.getSchoolId());
	    	ssdUpdate.setGroupId(ssg.getGroupId());
	    	ssdUpdate.setUpdateId(SessionUtil.getUserLoginId());
	    	supplierDao.updateSupplierService(ssdUpdate);
    	}
    }

    @Override
    public void deleteSupplierServiceDetail(SupplierServiceDetailGroup ssg) throws Exception {
    	ssg.setUpdateId(SessionUtil.getUserLoginId());
    	int cnt = supplierDao.deleteSupplierServiceGroup(ssg);
    	if (cnt > 0) {
    		SupplierServiceDetail ssd = new SupplierServiceDetail();
    		ssd.setGroupId(ssg.getGroupId());
    		supplierDao.deleteSupplierService(ssd);
    	}
    }

	@Override
	public List<SupplierServiceDetailGroup> getAllSupplierServiceGroups(SupplierServiceDetail ssd) throws Exception {
		ssd.setSchoolId(SessionUtil.getSchoolId());
		return supplierDao.selectAllSupplierServiceGroups(ssd);
	}

	@Override
	public SupplierServiceDetailGroup getSupplierServiceGroupByGroupId(SupplierServiceDetail ssd) throws Exception {
		ssd.setSchoolId(SessionUtil.getSchoolId());
		return supplierDao.selectSupplierServiceGroupByGroupId(ssd);
	}
    
    @Override
    public SupplierServiceDetailGroup getAllInstallmentsByGradeAndService(SupplierServiceDetail ssd) throws Exception {
		ssd.setSchoolId(SessionUtil.getSchoolId());
    	return supplierDao.getAllInstallmentsByGradeAndService(ssd);
    }

	private int genSupplierId(String supplierId){
		int  number = 1;
		if (supplierId == null || supplierId.equals("")){
			return number;
		}
		return  Integer.valueOf(supplierId) + 1;
	}
}
