var lang = {
	common : {
		msg_delConfirm: 'Do you want to delete ?',
		msg_selectService: 'Please select service',
		msg_noDataUpdate: 'No data update',
		vld_req_service: 'Service is required',
		vld_req_grade: 'Grade is required',
		vld_req_supplier: 'Supplier is required',
		plh_enterSearch: 'Enter to search...',
		plh_enterName: 'Enter name ...',
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
		headteacher: {
			title_popup: 'Head Teachers',
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
		},
		supplierservice: {
			vld_zero_price: 'Price must be equals or greater than 0',
		}
	},
	posting: {
		installment: 'installment',
		studentdebts: {
			msg_saved: 'Save task successfully',
			plh_enterPaymentPurpose: 'Enter note on the purpose of the payment...',
			msg_saveBeforePrinding: 'Please save or undo the change before printing',
		}
	},
	overview : {
		title_overviewStudentPopup: 'Student Balance Overview',
	},
	archive: {
		bankstatement: {
			msg_confirmSaveAndPost: 'Do you want to Save and Post payment?',
		}
	}
}

export default lang;