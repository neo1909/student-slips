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
        return this.sqlSession.selectOne("insertService", services);
    }
    public int updateServices(Services services){
        return this.sqlSession.selectOne("updateService", services);
    }
    public int deleteServicesById(int id){
        return this.sqlSession.selectOne("deleteServiceById", id);
    }
    public List<Services> selectAllServices(Services services){
        return this.sqlSession.selectList("selectAllService", services);
    }
    public Services selectServicesById(int id){
        return this.sqlSession.selectOne("selectServiceById", id);
    }
}
