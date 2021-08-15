package com.studentslips.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class SupplierServiceController {

    @GetMapping("service")
    public String getServicePage() {
        return "supplierServices/service";
    }

    @GetMapping("supplier")
    public String getSupplierPage() {
        return "supplierServices/supplier";
    }

    @GetMapping("supplierService")
    public String getSupplierServicePage() {
        return "supplierServices/supplierService";
    }
}
