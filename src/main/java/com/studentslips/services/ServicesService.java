package com.studentslips.services;

import com.studentslips.entities.Services;

import java.util.List;

public interface ServicesService {
    public int insertServices(Services services) throws Exception;
    public int updateServices(Services services) throws Exception;
    public int deleteServicesById(int id) throws Exception;
    public List<Services> selectAllServices(Services services) throws Exception;
    public Services selectServicesById(int id);
}
