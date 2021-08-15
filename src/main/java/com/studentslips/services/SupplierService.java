package com.studentslips.services;

import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDetail;

import java.util.List;

public interface SupplierService {
      public List<Supplier> selectAllSupplier(Supplier supplier);
      public List<SupplierServiceDetail> selectAllSupplierDetail(SupplierServiceDetail supplierServiceDetail);
      public Supplier selectSupplierById(Supplier supplier);
      public void insertSupplier(Supplier supplier);
      public void updateSupplier(Supplier supplier);
      public void deleteSupplier(Supplier supplier);

      public void insertSupplierServiceDetail(SupplierServiceDetail std);
      public void updateSupplierServiceDetail(SupplierServiceDetail std);
      public void deleteSupplierServiceDetail(SupplierServiceDetail std);
}
