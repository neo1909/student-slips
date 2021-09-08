var lang = {
	common : {
		msg_delConfirm: 'Da li želite da obrišete?',
		msg_selectService: 'Please select service',
		msg_noDataUpdate: 'No data update',
		vld_req_service: 'Usluga je neophodan podatak',
		vld_req_grade: 'Razred je neophodan podatak',
		vld_req_supplier: 'Dobavljač je neophodan podatak',
		plh_enterSearch: 'Upišite pojam za pretragu...',
		plh_enterName: 'Upišite ime i prezime ...',
	},
	auth : {
		plh_username: 'Korisničko ime *',
		plh_password: 'Lozinka *',
		vld_req_username: 'Korisničko ime je obavezan podatak',
		vld_req_password: 'Lozinka je obavezan podatak',
		vld_min_password: 'Minimalna dužina = 8',
		vld_req_email: 'Imejl je obavezan podatak',
		vld_inv_email: 'Imejl nije ispravan',
		vld_passwordMatch: 'Password does not match!',
		vld_failToLogin: 'Failed to login',
		vld_failToRegister: 'Failed to register',
		msg_resetPasswordConfirm: 'Are you sure to reset your password?',
	},
	dataentry: {
		vld_req_name: 'Naziv je neophodan podatak',
		vld_inv_name: 'Naziv nije ispravan',
		headteacher: {
			title_popup: 'Odeljenske starešine',
		},
		school: {
			vld_req_addr: 'Adresa je neophodan podatak',
			vld_inv_addr: 'Adresa nije ispravan',
			vld_req_zip: 'Poštanski broj je neophodan podatak',
			vld_inv_zip: 'Poštanski broj nije ispravan',
			vld_req_city: 'Grad je neophodan podatak',
			vld_inv_city: 'Grad nije ispravan',
			vld_req_mun: 'Opština je neophodan podataka',
			vld_inv_mun: 'Opština nije ispravan',
			vld_req_bankNo: 'Broj bankovnovnog računa je neophodan podatak',
			vld_inv_bankNo: 'Broj bankovnovnog računa nije ispravan',
			title_createSchool : 'Unesite škole',
		},
		supplierservice: {
			vld_zero_price: 'Price must be equals or greater than 0',
		}
	},
	posting: {
		installment: 'rata',
		studentdebts: {
			msg_saved: 'Nalog je uspešno sačuvan',
			plh_enterPaymentPurpose: 'Unesite svrhu uplate ...',
			msg_saveBeforePrinding: 'Please save or undo the change before printing',
		}
	},
	overview : {
		title_overviewStudentPopup: 'Pregled kartice stanja učenika',
	},
	archive: {
		bankstatement: {
			msg_confirmSaveAndPost: 'Da li želite da sačuvate i rasknjižite uplate?',
		}
	}
}

export default lang;