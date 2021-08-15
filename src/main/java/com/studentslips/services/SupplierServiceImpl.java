package com.studentslips.services;

import com.studentslips.common.SessionUtil;
import com.studentslips.dao.SupplierDao;
import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

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
        std.setInsertId(SessionUtil.getUserLoginId());
        std.setSchoolId(SessionUtil.getSchoolId());
        supplierDao.insertSupplierService(std);
    }

    @Override
    public void updateSupplierServiceDetail(SupplierServiceDetail std) throws Exception {
        std.setUpdateId(SessionUtil.getUserLoginId());
        supplierDao.updateSupplierService(std);
    }

    @Override
    public void deleteSupplierServiceDetail(SupplierServiceDetail std) throws Exception {
        std.setUpdateId(SessionUtil.getUserLoginId());
        supplierDao.deleteSupplierService(std);
    }
}
