package com.studentslips.dao;

import com.studentslips.entities.SupplierDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SupplierDao {

    private final SqlSession sqlSession;

    public SupplierDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<SupplierDTO> selectAllSupplier(SupplierDTO supplierDTO) {
        return this.sqlSession.selectList("selectAllSupplier", supplierDTO);
    }
}
