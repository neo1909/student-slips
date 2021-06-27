package com.studentslips.dao;

import com.studentslips.entities.Services;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ServicesDao {

    private final SqlSession sqlSession;

    public ServicesDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public int insertServices(Services services){
        return this.sqlSession.insert("insertService", services);
    }
    public int updateServices(Services services){
        return this.sqlSession.update("updateService", services);
    }
    public int deleteServicesById(Services services){
        return this.sqlSession.delete("deleteServiceById", services);
    }
    public List<Services> selectAllServices(Services services){
        return this.sqlSession.selectList("selectAllService", services);
    }
    public Services selectServicesById(int id){
        return this.sqlSession.selectOne("selectServiceById", id);
    }
}
