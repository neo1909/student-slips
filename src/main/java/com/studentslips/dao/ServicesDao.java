package com.studentslips.dao;

import com.studentslips.entities.Services;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ServicesDao {
    public int insertServices(Services services);
    public int updateServices(Services services);
    public int deleteServicesById(int id);
    public List<Services> selectAllServices(Services services);
    public Services selectServicesById(int id);
}
