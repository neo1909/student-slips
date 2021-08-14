package com.studentslips.services.impl;

import com.studentslips.dao.BankStatementDao;
import com.studentslips.dao.StudentOverviewBalanceDao;
import com.studentslips.entities.Student;
import com.studentslips.entities.StudentOverview;
import com.studentslips.entities.StudentOverviewBalanceDTO;
import com.studentslips.services.StudentOverviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.util.*;

@Service(value = "StudentOverviewServiceImpl")
public class StudentOverviewServiceImpl implements StudentOverviewService {

    @Autowired
    StudentOverviewBalanceDao studentOverviewBalanceDao;

    @Override
    public List<StudentOverview> selectStudentOverview(Student std) {

        return new ArrayList<>();
    }

    @Override
    public List<StudentOverviewBalanceDTO> selectStudentOverviewBalance(Student std) throws Exception {

        List<StudentOverviewBalanceDTO> studentOverviewBalanceList = studentOverviewBalanceDao.selectStudentOverviewBalance(std);

        if (CollectionUtils.isEmpty(studentOverviewBalanceList)){
            return new ArrayList<>();
        }

        Collections.sort(studentOverviewBalanceList, new Comparator<StudentOverviewBalanceDTO>() {
            @Override
            public int compare(StudentOverviewBalanceDTO o1, StudentOverviewBalanceDTO o2) {
                return o1.getDate().compareTo(o2.getDate());
            }
        });

        BigDecimal balanceMonth = BigDecimal.valueOf(0);
        for (int i = 1; i < studentOverviewBalanceList.size(); i+=2) {
            BigDecimal bankBalance = BigDecimal.valueOf(0);
            if(studentOverviewBalanceList.get(i-1).getRowType() == 1) {
                balanceMonth = studentOverviewBalanceList.get(i - 1).getBalance();
                if(i - 2 > 0) {
                    balanceMonth = balanceMonth.add(studentOverviewBalanceList.get(i - 2).getBalance());
                }
                bankBalance = balanceMonth.subtract(studentOverviewBalanceList.get(i).getClaims());
                studentOverviewBalanceList.get(i-1).setBalance(balanceMonth);
                studentOverviewBalanceList.get(i).setBalance(bankBalance);
            }
        }

        BigDecimal totalBalance = studentOverviewBalanceList.get(studentOverviewBalanceList.size()-1).getBalance();

        BigDecimal totalClaims = new BigDecimal(0);
        BigDecimal totalDebit = new BigDecimal(0);

        for (StudentOverviewBalanceDTO dto: studentOverviewBalanceList) {
            totalClaims = totalClaims.add(dto.getClaims());
        }

        for (StudentOverviewBalanceDTO dto: studentOverviewBalanceList) {
            totalDebit = totalDebit.add(dto.getDebit());
        }

        StudentOverviewBalanceDTO totalObj = new StudentOverviewBalanceDTO();
        totalObj.setDate(null);
        totalObj.setDescription("TOTAL");
        totalObj.setDebit(totalDebit);
        totalObj.setPrint(true);
        totalObj.setClaims(totalClaims);
        totalObj.setBalance(totalBalance);

        studentOverviewBalanceList.add(totalObj);

        return studentOverviewBalanceList;
    }
}
