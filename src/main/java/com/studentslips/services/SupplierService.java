package com.studentslips.services;

import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDetail;

import java.util.List;

public interface SupplierService {
      public List<Supplier> selectAllSupplier(Supplier supplier) throws Exception;
      public List<SupplierServiceDetail> selectAllSupplierDetail(SupplierServiceDetail supplierServiceDetail) throws Exception;
      public Supplier selectSupplierById(Supplier supplier) throws Exception;
      public void insertSupplier(Supplier supplier) throws Exception;
      public void updateSupplier(Supplier supplier) throws Exception;
      public void deleteSupplier(Supplier supplier) throws Exception;

      public void insertSupplierServiceDetail(SupplierServiceDetail std) throws Exception;
      public void updateSupplierServiceDetail(SupplierServiceDetail std) throws Exception;
      public void deleteSupplierServiceDetail(SupplierServiceDetail std) throws Exception;
}
