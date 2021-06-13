package com.studentslips.services;

import com.studentslips.dao.ServicesDao;
import com.studentslips.entities.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service(value = "ServicesService")
public class ServicesServiceImpl implements ServicesService{

    @Autowired
    ServicesDao servicesDao;

    @Override
    public int insertServices(Services services) {
        return servicesDao.insertServices(services);
    }

    @Override
    public int updateServices(Services services) {
        return servicesDao.updateServices(services);
    }

    @Override
    public int deleteServicesById(int id) {
        return servicesDao.deleteServicesById(id);
    }

    @Override
    public List<Services> selectAllServices(Services services) {
        return servicesDao.selectAllServices(services);
    }

    @Override
    public Services selectServicesById(int id) {
        return servicesDao.selectServicesById(id);
    }
}
