package com.studentslips.services;

import com.studentslips.dao.SupplierDao;
import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDTO;
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
    public List<SupplierServiceDTO> selectAllSupplierDetail(SupplierServiceDTO supplierServiceDTO) {
        return supplierDao.selectAllSupplierService(supplierServiceDTO);
    }

    @Override
    @Transactional
    public void insertSupplier(Supplier supplier) {
        supplier.setInsertId(1000);
        supplier.setInsertDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.insertSupplier(supplier);
        List<SupplierServiceDTO> lstSupplierServiceDTO =supplier.getLstSupplierServiceDTOS();
        if (!lstSupplierServiceDTO.isEmpty()){
            for (SupplierServiceDTO entity: lstSupplierServiceDTO) {
                entity.setInsertId(1000);
                entity.setInsertDate(new Timestamp(System.currentTimeMillis()));
                supplierDao.insertSupplierService(entity);
            }
        }
    }

    @Override
    @Transactional
    public void updateSupplier(Supplier supplier) {
        supplier.setUpdateId(1000);
        supplier.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.updateSupplier(supplier);
        List<SupplierServiceDTO> lstSupplierServiceDTO =supplier.getLstSupplierServiceDTOS();
        if (!lstSupplierServiceDTO.isEmpty()){
            for (SupplierServiceDTO entity: lstSupplierServiceDTO) {
                entity.setUpdateId(1000);
                entity.setUpdateDate(new Timestamp(System.currentTimeMillis()));
                supplierDao.updateSupplierService(entity);
            }
        }
    }

    @Override
    @Transactional
    public void deleteSupplier(Supplier supplier) {
        supplier.setUpdateId(1000);
        supplier.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.updateSupplier(supplier);
        List<SupplierServiceDTO> lstSupplierServiceDTO =supplier.getLstSupplierServiceDTOS();
        if (!lstSupplierServiceDTO.isEmpty()){
            for (SupplierServiceDTO entity: lstSupplierServiceDTO) {
                entity.setUpdateId(1000);
                entity.setUpdateDate(new Timestamp(System.currentTimeMillis()));
                supplierDao.updateSupplierService(entity);
            }
        }
    }
}
