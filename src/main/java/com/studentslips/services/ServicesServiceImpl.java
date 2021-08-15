package com.studentslips.services;

import com.studentslips.common.SessionUtil;
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
    public int insertServices(Services services) throws Exception {
        services.setInsertId(SessionUtil.getUserLoginId());
        services.setSchoolId(SessionUtil.getSchoolId());
        return servicesDao.insertServices(services);
    }

    @Override
    public int updateServices(Services services) throws Exception {
        services.setUpdateId(SessionUtil.getUserLoginId());
        return servicesDao.updateServices(services);
    }

    @Override
    public int deleteServicesById(int id) throws Exception {
        Services services = new Services();
        services.setId(id);
        services.setUpdateId(SessionUtil.getUserLoginId());
        return servicesDao.deleteServicesById(services);
    }

    @Override
    public List<Services> selectAllServices(Services services) throws Exception {
        services.setSchoolId(SessionUtil.getSchoolId());
        return servicesDao.selectAllServices(services);
    }

    @Override
    public Services selectServicesById(int id) {
        return servicesDao.selectServicesById(id);
    }
}
