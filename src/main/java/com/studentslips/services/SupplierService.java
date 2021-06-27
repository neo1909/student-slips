package com.studentslips.services;

import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDTO;

import java.util.List;

public interface SupplierService {
      public List<Supplier> selectAllSupplier(Supplier supplier);
      public List<SupplierServiceDTO> selectAllSupplierDetail(SupplierServiceDTO supplierServiceDTO);
      public void insertSupplier(Supplier supplier);
      public void updateSupplier(Supplier supplier);
      public void deleteSupplier(Supplier supplier);
}
