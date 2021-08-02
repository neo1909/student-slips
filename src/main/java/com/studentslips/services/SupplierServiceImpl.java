package com.studentslips.services;

import com.studentslips.dao.SupplierDao;
import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public void insertSupplier(Supplier supplier) {
        supplier.setInsertId(1000);
        supplier.setInsertDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.insertSupplier(supplier);
//        List<SupplierService> lstSupplierService =supplier.getLstSupplierServiceS();
//        if (!lstSupplierService.isEmpty()){
//            for (SupplierService entity: lstSupplierService) {
//                entity.setInsertId(1000);
//                entity.setInsertDate(new Timestamp(System.currentTimeMillis()));
//                supplierDao.insertSupplierService(entity);
//            }
//        }
    }

    @Override
    public void updateSupplier(Supplier supplier) {
        supplier.setUpdateId(1000);
        supplier.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.updateSupplier(supplier);

//        Supplier ObjSupp = supplierDao.selectSupplierById(supplier.getId());
//        if (ObjSupp != null && !ObjSupp.getName().equals(supplier.getName())){
//            supplier.setUpdateId(1000);
//            supplier.setUpdateDate(new Timestamp(System.currentTimeMillis()));
//            supplierDao.updateSupplier(supplier);
//        }
        //delete all supplier service
//        SupplierService dto = new SupplierService();
//        dto.setSuppliersId(supplier.getId());
//        dto.setUpdateId(1000);
//        dto.setUpdateDate(new Timestamp(System.currentTimeMillis()));
//        supplierDao.deleteSupplierService(dto);
//        //add new
//        List<SupplierService> lst =supplier.getLstSupplierServiceS();
//        if (!lst.isEmpty()){
//            for (SupplierService entity: lst) {
//                entity.setInsertId(1000);
//                entity.setInsertDate(new Timestamp(System.currentTimeMillis()));
//                supplierDao.insertSupplierService(entity);
//            }
//        }
    }

    @Override
    public void deleteSupplier(Supplier supplier) {
        supplier.setUpdateId(1000);
        supplier.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.deleteSupplier(supplier);

//        SupplierService entity = new SupplierService();
//        entity.setSuppliersId(supplier.getId());
//        entity.setUpdateId(1000);
//        entity.setUpdateDate(new Timestamp(System.currentTimeMillis()));
//        supplierDao.deleteSupplierService(entity);

    }
}
