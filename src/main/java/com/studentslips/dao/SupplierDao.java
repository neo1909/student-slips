package com.studentslips.dao;

import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SupplierDao {

    private final SqlSession sqlSession;

    public SupplierDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<Supplier> selectAllSupplier(Supplier supplier) {
        return this.sqlSession.selectList("selectAllSupplier", supplier);
    }
    public List<SupplierServiceDTO> selectAllSupplierService(SupplierServiceDTO supplierServiceDTO) {
        return this.sqlSession.selectList("selectSupplierDetail", supplierServiceDTO);
    }
    public int insertSupplier(Supplier supplier) {
        return this.sqlSession.insert("insertSupplier", supplier);
    }

    public int insertSupplierService(SupplierServiceDTO supplierServiceDTO) {
        return this.sqlSession.insert("insertSupplierService", supplierServiceDTO);
    }
    public int updateSupplier(Supplier supplier) {
        return this.sqlSession.update("updateSupplier", supplier);
    }

    public int updateSupplierService(SupplierServiceDTO supplierServiceDTO) {
        return this.sqlSession.update("updateSupplierService", supplierServiceDTO);
    }
    public int deleteSupplier(Supplier supplier) {
        return this.sqlSession.update("deleteSupplier", supplier);
    }

    public int deleteSupplierService(SupplierServiceDTO supplierServiceDTO) {
        return this.sqlSession.update("deleteSupplierService", supplierServiceDTO);
    }
}
