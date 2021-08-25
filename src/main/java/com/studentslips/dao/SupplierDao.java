package com.studentslips.dao;

import com.studentslips.entities.Supplier;
import com.studentslips.entities.SupplierServiceDetail;
import com.studentslips.entities.SupplierServiceDetailGroup;

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
    public List<SupplierServiceDetail> selectAllSupplierService(SupplierServiceDetail supplierServiceDetail) {
        return this.sqlSession.selectList("selectSupplierDetail", supplierServiceDetail);
    }
    public int insertSupplier(Supplier supplier) {
        return this.sqlSession.insert("insertSupplier", supplier);
    }

    public int insertSupplierService(SupplierServiceDetail supplierServiceDetail) {
        return this.sqlSession.insert("insertSupplierService", supplierServiceDetail);
    }
    public int updateSupplier(Supplier supplier) {
        return this.sqlSession.update("updateSupplier", supplier);
    }

    public int updateSupplierService(SupplierServiceDetail supplierServiceDetail) {
        return this.sqlSession.update("updateSupplierService", supplierServiceDetail);
    }
    public int deleteSupplier(Supplier supplier) {
        return this.sqlSession.update("deleteSupplier", supplier);
    }

    public int deleteSupplierService(SupplierServiceDetail supplierServiceDetail) {
        return this.sqlSession.update("deleteSupplierService", supplierServiceDetail);
    }
    public Supplier selectSupplierById(int supplierId) {
        return this.sqlSession.selectOne("selectSupplierById", supplierId);
    }



    public int insertSupplierServiceGroup(SupplierServiceDetailGroup supplierServiceDetailGroup) {
        return this.sqlSession.insert("insertSupplierServiceGroup", supplierServiceDetailGroup);
    }

    public int updateSupplierServiceGroup(SupplierServiceDetailGroup supplierServiceDetailGroup) {
        return this.sqlSession.insert("updateSupplierServiceGroup", supplierServiceDetailGroup);
    }
    
    
    public List<SupplierServiceDetailGroup> getAllSupplierServiceGroups(SupplierServiceDetail supplierServiceDetail) {
        return this.sqlSession.selectList("getAllSupplierServiceGroups", supplierServiceDetail);
    }

    public SupplierServiceDetailGroup getSupplierServiceGroupByGroupId(SupplierServiceDetail supplierServiceDetail) {
        return this.sqlSession.selectOne("getSupplierServiceGroupByGroupId", supplierServiceDetail);
    }
}
