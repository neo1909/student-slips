package com.studentslips.services;

import com.studentslips.entities.SchoolAndClass;
import com.studentslips.entities.SchoolAndClassSearch;

import java.util.List;

public interface OverViewClassService {
    public List<SchoolAndClass> selectAllClass(SchoolAndClassSearch schoolAndClassSearch) throws Exception;
    public List<SchoolAndClass> selectDetailClass(SchoolAndClassSearch schoolAndClassSearch) throws Exception;
}
