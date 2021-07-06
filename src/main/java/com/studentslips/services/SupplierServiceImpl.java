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
        Supplier ObjSupp = supplierDao.selectSupplierById(supplier.getId());
        if (ObjSupp != null && !ObjSupp.getName().equals(supplier.getName())){
            supplier.setUpdateId(1000);
            supplier.setUpdateDate(new Timestamp(System.currentTimeMillis()));
            supplierDao.updateSupplier(supplier);
        }
        //delete all supplier service
        SupplierServiceDTO dto = new SupplierServiceDTO();
        dto.setSuppliersId(supplier.getId());
        dto.setUpdateId(1000);
        dto.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.deleteSupplierService(dto);
        //add new
        List<SupplierServiceDTO> lst =supplier.getLstSupplierServiceDTOS();
        if (!lst.isEmpty()){
            for (SupplierServiceDTO entity: lst) {
                entity.setInsertId(1000);
                entity.setInsertDate(new Timestamp(System.currentTimeMillis()));
                supplierDao.insertSupplierService(entity);
            }
        }
    }

    @Override
    @Transactional
    public void deleteSupplier(Supplier supplier) {
        supplier.setUpdateId(1000);
        supplier.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.deleteSupplier(supplier);

        SupplierServiceDTO entity = new SupplierServiceDTO();
        entity.setSuppliersId(supplier.getId());
        entity.setUpdateId(1000);
        entity.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        supplierDao.deleteSupplierService(entity);

    }
}
