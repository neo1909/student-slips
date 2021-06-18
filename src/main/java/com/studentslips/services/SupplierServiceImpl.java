package com.studentslips.services;

import com.studentslips.dao.SupplierDao;
import com.studentslips.entities.SupplierDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component(value = "SupplierService")
public class SupplierServiceImpl implements SupplierService{

    @Autowired
    SupplierDao supplierDao;
    @Override
    public List<SupplierDTO> selectAllSupplier(SupplierDTO supplierDTO) {
        return supplierDao.selectAllSupplier(supplierDTO);
    }
}
