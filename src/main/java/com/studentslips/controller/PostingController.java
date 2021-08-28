package com.studentslips.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.studentslips.entities.TaskArchiveSearch;
import com.studentslips.services.StudentDebtsService;

@Controller
@RequestMapping("/posting/")
public class PostingController {
	
	@Autowired
	private StudentDebtsService studentDebtsService;
	
	/**
	 * @throws Exception 
	 * @Section Posting > Student's debts
	 * 
	 * */
    @GetMapping("student-debts")
    public String getStudentDebtsPage(Model model) throws Exception {
        return "studentDebts/studentDebts";
    }
    
    @GetMapping("student-debts/update/{id}")
    public String getStudentDebtsUpdatePage(Model model, @PathVariable String id) throws Exception {
    	if (StringUtils.isNotBlank(id)) {
    		TaskArchiveSearch taskArchiveSearch = new TaskArchiveSearch();
    		taskArchiveSearch.setTaskId(Integer.parseInt(id));
			int cnt = studentDebtsService.countTaskArchive(taskArchiveSearch);
			if (cnt > 0) {
		    	model.addAttribute("taskId", id);
			}
    	}
        return "studentDebts/studentDebtsUpdate";
    }
    
    /**
	 * @Section Posting > Posting payments
	 * 
	 * */
    @GetMapping("posting-payment")
    public String getPostingPaymentPage() {
        return "posting/postingPayment";
    }
}
