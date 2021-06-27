package com.studentslips.services;

import com.studentslips.entities.Services;

import java.util.List;

public interface ServicesService {
    public int insertServices(Services services);
    public int updateServices(Services services);
    public int deleteServicesById(Services services);
    public List<Services> selectAllServices(Services services);
    public Services selectServicesById(int id);
}
