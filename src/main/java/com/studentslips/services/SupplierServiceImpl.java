package com.studentslips.services;

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
    public List<Supplier> selectAllSupplier(Supplier supplier) {
        return supplierDao.selectAllSupplier(supplier);
    }

    @Override
    public List<SupplierServiceDetail> selectAllSupplierDetail(SupplierServiceDetail supplierServiceDetail) {
        return supplierDao.selectAllSupplierService(supplierServiceDetail);
    }

    @Override
    public Supplier selectSupplierById(Supplier supplier) {
        return supplierDao.selectSupplierById(supplier.getId());
    }

    @Override
    public void insertSupplier(Supplier supplier) {
        supplier.setInsertId(1000);
        supplier.setInsertDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.insertSupplier(supplier);
    }

    @Override
    public void updateSupplier(Supplier supplier) {
        supplier.setUpdateId(1000);
        supplier.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.updateSupplier(supplier);

    }

    @Override
    public void deleteSupplier(Supplier supplier) {
        supplier.setUpdateId(1000);
        supplier.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.deleteSupplier(supplier);
    }

    @Override
    public void insertSupplierServiceDetail(SupplierServiceDetail std) {
        supplierDao.insertSupplierService(std);
    }

    @Override
    public void updateSupplierServiceDetail(SupplierServiceDetail std) {
        supplierDao.updateSupplierService(std);
    }

    @Override
    public void deleteSupplierServiceDetail(SupplierServiceDetail std) {
        supplierDao.deleteSupplierService(std);
    }
}
