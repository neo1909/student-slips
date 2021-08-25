package com.studentslips.services;

import com.studentslips.common.SessionUtil;
import com.studentslips.dao.SupplierDao;
import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDetail;
import com.studentslips.entities.SupplierServiceDetailGroup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

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
    public List<SupplierServiceDetail> selectAllSupplierDetail(SupplierServiceDetail supplierServiceDetail) throws Exception {
        supplierServiceDetail.setSchoolId(SessionUtil.getSchoolId());
        return supplierDao.selectAllSupplierService(supplierServiceDetail);
    }

    @Override
    public Supplier selectSupplierById(Supplier supplier) throws Exception {
        supplier.setSchoolId(SessionUtil.getSchoolId());
        return supplierDao.selectSupplierById(supplier.getId());
    }

    @Override
    public void insertSupplier(Supplier supplier) throws Exception {
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
    public void insertSupplierServiceDetail(SupplierServiceDetail std) throws Exception {
    	List<Integer> listGradeIds = std.getListGradeIds();
    	std.setInsertId(SessionUtil.getUserLoginId());
    	std.setSchoolId(SessionUtil.getSchoolId());
    	for (Integer gradeId: listGradeIds) {
    		std.setGrade(gradeId);
    		supplierDao.insertSupplierService(std);
    	}
    }

    @Override
    public void updateSupplierServiceDetail(SupplierServiceDetail std) throws Exception {
    	SupplierServiceDetailGroup searchGroup = getSupplierServiceGroupByGroupId(std);
        std.setUpdateId(SessionUtil.getUserLoginId());
    	for (Integer gradeId: std.getTrInsert()) {
    		std.setGrade(gradeId);
    		std.setSchoolId(searchGroup.getSchoolId());
    		std.setInsertId(SessionUtil.getUserLoginId());
            supplierDao.insertSupplierService(std);
    	}
    	for (Integer gradeId: std.getTrDelete()) {
    		std.setGrade(gradeId);
            supplierDao.deleteSupplierService(std);
    	}
    	
    	std.setId(0);
    	std.setGrade(0);
        supplierDao.updateSupplierService(std);
    	
    	SupplierServiceDetailGroup group = new SupplierServiceDetailGroup();
    	group.setGroupId(std.getGroupId());
    	group.setName(std.getName());
    	group.setUpdateId(SessionUtil.getUserLoginId());
        supplierDao.updateSupplierServiceGroup(group);
    }

    @Override
    public void deleteSupplierServiceDetail(SupplierServiceDetail std) throws Exception {
    	SupplierServiceDetailGroup group = new SupplierServiceDetailGroup();
    	group.setGroupId(std.getGroupId());
    	group.setUpdateId(SessionUtil.getUserLoginId());
    	int cnt = supplierDao.deleteSupplierServiceGroup(group);
    	if (cnt > 0) {
    		std.setUpdateId(SessionUtil.getUserLoginId());
    		supplierDao.deleteSupplierService(std);
    	}
    }

	@Override
	public List<SupplierServiceDetailGroup> getAllSupplierServiceGroups(SupplierServiceDetail std) {
		return supplierDao.getAllSupplierServiceGroups(std);
	}

	@Override
	public SupplierServiceDetailGroup getSupplierServiceGroupByGroupId(SupplierServiceDetail std) {
		return supplierDao.getSupplierServiceGroupByGroupId(std);
	}

    @Override
    public SupplierServiceDetailGroup insertSupplierServiceGroup(SupplierServiceDetail std) throws Exception {
    	SupplierServiceDetailGroup group = new SupplierServiceDetailGroup();
    	group.setName(std.getName());
    	group.setInsertId(SessionUtil.getUserLoginId());
    	group.setSchoolId(SessionUtil.getSchoolId());
        supplierDao.insertSupplierServiceGroup(group);
        return group;
    }
}
