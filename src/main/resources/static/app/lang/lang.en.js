var lang = {
	common : {
		msg_delConfirm: 'Do you want to delete ?',
		msg_selectService: 'Please select service',
		msg_noDataUpdate: 'No data update',
		notification: 'Notification',
		vld_req_service: 'Service is required',
		vld_req_grade: 'Grade is required',
		vld_req_supplier: 'Supplier is required',
		plh_enterSearch: 'Enter to search...',
		plh_enterName: 'Enter name ...',
		no: 'No.',
		school: 'School',
		grade: 'Grade',
		clazz: 'Class',
		actions: 'Actions',
		name: 'Name',
		all: 'All',
		inTotal: 'In Total',
		inDetail: 'In Detail',
		
		vld_date: 'Date',
		vld_noOfBankstatement: 'No of Bank Statement',
		vld_balance: 'Balance',
		vld_noOfChanges: 'No of Changes',
		vld_actions: 'Actions',
		vld_accountNumber: 'Account Number',
		vld_payer: 'Payer',
		vld_purposeOfPayment: 'Purpose of Payment',
		vld_referenceNumber: 'Reference Number',
		vld_amount: 'Amount',
		vld_grade: 'Grade',
		vld_class: 'Class',
		vld_service: 'Service',
		vld_note: 'Note',
		vld_descriptionOfService: 'Description of Service',
		vld_debit: 'Debit',
		vld_claim: 'Claim',
		vld_print: 'Print',
		vld_no: 'No.',
		vld_nameAndSurname: 'Name and Surname',
		vld_school: 'School',
		vld_balanceSheet: 'Balance Sheet',
		vld_gradeClass: 'Grade/Class',
		vld_headTeacher: 'Head Teacher'
	},
	auth : {
		plh_username: 'Username *',
		plh_password: 'Password *',
		vld_req_username: 'Username is required',
		vld_req_password: 'Password is required',
		vld_min_password: 'Min length = 8',
		vld_req_email: 'Email is required',
		vld_inv_email: 'Email is invalid',
		vld_passwordMatch: 'Password does not match!',
		vld_failToLogin: 'Failed to login',
		vld_failToRegister: 'Failed to register',
		msg_resetPasswordConfirm: 'Are you sure to reset your password?',
	},
	dataentry: {
		vld_req_name: 'Name is required',
		vld_inv_name: 'Name is invalid',
		student: {
			studentId: 'Student ID',
			nameAndSurname: 'Name and surname',
			title_popup: 'Student Detail',
		},
		headteacher: {
			title_popup: 'Head Teachers',
			studentId: 'Student ID',
			nameAndSurname: 'Name and surname',
		},
		school: {
			vld_req_addr: 'Address is required',
			vld_inv_addr: 'Address is invalid',
			vld_req_zip: 'ZipCode is required',
			vld_inv_zip: 'ZipCode is invalid',
			vld_req_city: 'City is required',
			vld_inv_city: 'City is invalid',
			vld_req_mun: 'Municipality is required',
			vld_inv_mun: 'Municipality is invalid',
			vld_req_bankNo: 'Bank account number is required',
			vld_inv_bankNo: 'Bank account number is invalid',
			title_createSchool : 'Create School',
			title_updateSchool : 'Update School',
			schoolName: 'School Name',
			address: 'Address',
			city: 'City',
			municipality: 'Municipality',
			bankAccountNo: 'Bank Account Number',
		},
		supplier: {
			supplierName: 'Supplier Name',
			title_popup: 'Supplier Detail',
			title_createSupplier: 'Create Supplier',
		},
		service: {
			serviceName: 'Service Name',
			supplierName: 'Supplier Name',
			title_popup: 'Service Detail',
		},
		supplierservice: {
			vld_zero_price: 'Price must be equals or greater than 0',
			serviceName: 'Service Name',
			supplierName: 'Supplier Name',
			price: 'Price',
			noPayment: 'No. Payment',
		}
	},
	posting: {
		installment: 'installment',
		studentdebts: {
			msg_saved: 'Save task successfully',
			plh_enterPaymentPurpose: 'Enter note on the purpose of the payment...',
			msg_saveBeforePrinding: 'Please save or undo the change before printing',
			studentName: 'Student Name',
			referenceNo: 'Reference No',
			serviceName: 'Service Name',
			quantity: 'Quantity',
			price: 'Price',
			amountDebit: 'Amount of Debit',
			screen_titleUpdate: 'Student Debts: Update',
		}
	},
	overview : {
		title_overviewStudentPopup: 'Student Balance Overview',
		clazz: {
			title_print: 'Overview Class'
		}
	},
	archive: {
		bankstatement: {
			msg_confirmSaveAndPost: 'Do you want to Save and Post payment?',
			title_popup: 'Bank Statement',
		}
	}
}

export default lang;