package com.studentslips.services;

import com.studentslips.entities.SupplierDTO;

import java.util.List;

public interface SupplierService {
    public List<SupplierDTO> selectAllSupplier(SupplierDTO supplierDTO);
}
