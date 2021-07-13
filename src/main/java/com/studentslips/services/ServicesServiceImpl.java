package com.studentslips.services;

import com.studentslips.dao.ServicesDao;
import com.studentslips.entities.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
@Service(value = "ServicesService")
public class ServicesServiceImpl implements ServicesService{

    @Autowired
    ServicesDao servicesDao;

    @Override
    public int insertServices(Services services) {
        services.setInsertId(100);
        services.setInsertDate(new Timestamp(System.currentTimeMillis()));
        return servicesDao.insertServices(services);
    }

    @Override
    public int updateServices(Services services) {
        services.setUpdateId(100);
        services.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        return servicesDao.updateServices(services);
    }

    @Override
    public int deleteServicesById(int id) {
        Services services = new Services();
        services.setId(id);
        services.setUpdateId(100);
        services.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        return servicesDao.deleteServicesById(services);
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
