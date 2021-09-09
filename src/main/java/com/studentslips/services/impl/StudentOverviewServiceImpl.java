package com.studentslips.services.impl;

import com.studentslips.common.Common;
import com.studentslips.common.SessionUtil;
import com.studentslips.common.i18nUtil;
import com.studentslips.dao.BankStatementDao;
import com.studentslips.dao.StudentOverviewBalanceDao;
import com.studentslips.entities.*;
import com.studentslips.services.StudentOverviewService;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import com.studentslips.common.i18nUtil;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service(value = "StudentOverviewServiceImpl")
public class StudentOverviewServiceImpl implements StudentOverviewService {

    @Autowired
    StudentOverviewBalanceDao studentOverviewBalanceDao;

    @Override
    public List<StudentOverview> selectStudentOverview(Student std) {

        return new ArrayList<>();
    }

    @Override
    public  Map<String, Object> selectStudentOverviewBalance(StudentOverviewBalanceRequestDTO requestDTO) throws Exception {
        Map<String, Object> result = new HashMap<>();
        List<Integer> serviceList = studentOverviewBalanceDao.selectDistinctServiceStdDebts(requestDTO.getId());
        result.put(Common.LIST + 1,new ArrayList<>());
        if (CollectionUtils.isEmpty(serviceList)) {
            return result;
        }
        Set<Integer> serviceSet = new HashSet<>(serviceList);
        int indexService = 1;
        for (int serviceId : serviceSet) {
            requestDTO.setServiceId(serviceId);

            List<StudentOverviewBalanceDTO> studentOverviewBalanceList = studentOverviewBalanceDao.selectStudentOverviewBalance(requestDTO);

            if (CollectionUtils.isEmpty(studentOverviewBalanceList)) {
                continue;
            }

            Collections.sort(studentOverviewBalanceList, new Comparator<StudentOverviewBalanceDTO>() {
                @Override
                public int compare(StudentOverviewBalanceDTO o1, StudentOverviewBalanceDTO o2) {
                    return o1.getDate().compareTo(o2.getDate());
                }
            });

            BigDecimal bankBalance = BigDecimal.valueOf(0);
            for (int i = 0; i < studentOverviewBalanceList.size(); i++) {
                StudentOverviewBalanceDTO dto1 = studentOverviewBalanceList.get(i);
                if (dto1.getRowType() == 1) {

                    dto1.setBalance(dto1.getDebit());
                    if (i > 0) {
                        if(studentOverviewBalanceList.get(i-1).getRowType() == 1) {
                            bankBalance = bankBalance.add(dto1.getDebit());
                        } else {
                            bankBalance = dto1.getDebit().add(bankBalance);
                        }
                        dto1.setBalance(bankBalance);
                    } else {
                        bankBalance = dto1.getDebit();
                    }
                    continue;
                } else if(dto1.getRowType() == 2) {
                    if(i == 0) {
                        bankBalance = bankBalance.subtract(dto1.getClaims());
                        dto1.setBalance(bankBalance);
                    } else {
                        StudentOverviewBalanceDTO dto2 = studentOverviewBalanceList.get(i-1);
                        if(dto2.getRowType() == 2) {
                            bankBalance = bankBalance.subtract(dto1.getClaims());
                        } else {
                            bankBalance = bankBalance.subtract(dto1.getClaims());
                        }
                        dto1.setBalance(bankBalance);
                    }
                    continue;
                }

            }

            studentOverviewBalanceList = studentOverviewBalanceList.stream().filter(studentOverviewBalanceDTO -> (DateUtils.isSameDay(studentOverviewBalanceDTO.getDate(), requestDTO.getFromDate()) || studentOverviewBalanceDTO.getDate().after(requestDTO.getFromDate()))
                    && (DateUtils.isSameDay(studentOverviewBalanceDTO.getDate(), requestDTO.getToDate()) || studentOverviewBalanceDTO.getDate().before(requestDTO.getToDate()))
            ).collect(Collectors.toList());

            BigDecimal totalClaims = new BigDecimal(0);
            BigDecimal totalDebit = new BigDecimal(0);

            for (StudentOverviewBalanceDTO dto : studentOverviewBalanceList) {
                totalClaims = totalClaims.add(dto.getClaims());
            }

            for (StudentOverviewBalanceDTO dto : studentOverviewBalanceList) {
                totalDebit = totalDebit.add(dto.getDebit());
            }
            BigDecimal totalBalance = new BigDecimal(0);

            if (!CollectionUtils.isEmpty(studentOverviewBalanceList)) {
                totalBalance = studentOverviewBalanceList.get(0).getBalance();
                if (studentOverviewBalanceList.size() > 0) {
                    totalBalance = studentOverviewBalanceList.get(studentOverviewBalanceList.size() - 1).getBalance();
                }
            }
            StudentOverviewBalanceDTO totalObj = new StudentOverviewBalanceDTO();
            totalObj.setDate(null);
            totalObj.setDescription(i18nUtil.getMessage(SessionUtil.getLang(), "lang.total"));
            totalObj.setDebit(totalDebit);
            totalObj.setPrint(false);
            totalObj.setClaims(totalClaims);
            totalObj.setBalance(totalBalance);
            totalObj.setServiceId(-1);

            studentOverviewBalanceList.add(totalObj);
            result.put(Common.LIST + indexService, studentOverviewBalanceList);
            indexService++;
        }
        return result;

    }

    @Override
    public StudentOverviewBalancePrintDTO selectPrintData(StudentOverviewBalancePrintDTO dto) {
        dto = studentOverviewBalanceDao.selectPrintData(dto);
        return dto;
    }
}
