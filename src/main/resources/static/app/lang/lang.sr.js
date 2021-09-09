var lang = {
	common : {
		msg_delConfirm: 'Da li želite da obrišete?',
		msg_selectService: 'Molim vas odaberite uslugu',
		msg_noDataUpdate: 'Nema novih promena',
		notification: 'Obaveštenje',
		vld_req_service: 'Usluga je neophodan podatak',
		vld_req_grade: 'Razred je neophodan podatak',
		vld_req_supplier: 'Dobavljač je neophodan podatak',
		plh_enterSearch: 'Upišite pojam za pretragu...',
		plh_enterName: 'Upišite ime i prezime ...',
		no: 'Br.',
		school: 'Škola',
		grade: 'Razred',
		clazz: 'Odeljenje',
		actions: 'Izmena/Brisanje',
		name: 'Naziv',
		all: 'Sve',
		inTotal: 'Zbirno',
		inDetail: 'Detaljno',
		
		vld_date: 'Datum',
		vld_noOfBankstatement: 'Broj izvoda',
		vld_balance: 'Saldo',
		vld_noOfChanges: 'Broj promena',
		vld_actions: 'Izmena/Brisanje',
		vld_accountNumber: 'Broj bankovnog računa',
		vld_payer: 'Uplatilac',
		vld_purposeOfPayment: 'Svrha uplate',
		vld_referenceNumber: 'Poziv na broj',
		vld_amount: 'Iznos',
		vld_grade: 'Razred',
		vld_class: 'Odeljenje',
		vld_service: 'Usluge',
		vld_note: 'Notifikacija',
		vld_descriptionOfService: 'Opis usluge',
		vld_debit: 'Zaduženje',
		vld_claim: 'Uplate',
		vld_print: 'Štampa',
		vld_no: 'Br.',
		vld_nameAndSurname: 'Ime i prezime',
		vld_school: 'Škola',
		vld_balanceSheet: 'Kartica stanja',
		vld_gradeClass: 'Razred/Odeljenje',
		vld_headTeacher: 'Odeljenske starešine'
	},
	auth : {
		plh_username: 'Korisničko ime *',
		plh_password: 'Lozinka *',
		vld_req_username: 'Korisničko ime je obavezan podatak',
		vld_req_password: 'Lozinka je obavezan podatak',
		vld_min_password: 'Minimalna dužina = 8',
		vld_req_email: 'Imejl je obavezan podatak',
		vld_inv_email: 'Imejl nije ispravan',
		vld_passwordMatch: 'Šifre se ne poklapaju!',
		vld_failToLogin: 'Neuspelo logovanje',
		vld_failToRegister: 'Neuspela registracija',
		msg_resetPasswordConfirm: 'Jeste li sigurni da hoćete da promenite šifru?',
	},
	dataentry: {
		vld_req_name: 'Naziv je neophodan podatak',
		vld_inv_name: 'Naziv nije ispravan',
		student: {
			studentId: 'ID učenika',
			nameAndSurname: 'Ime i prezime',
			title_popup: 'Detalji učenika',
		},
		headteacher: {
			title_popup: 'Odeljenske starešine',
			studentId: 'ID učenika',
			nameAndSurname: 'Ime i prezime',
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
			title_createSchool : 'Kreiranje škole',
			title_updateSchool : 'Unesite školu',
			schoolName: 'Naziv škole',
			address: 'Adresa',
			city: 'Grad',
			municipality: 'Opština',
			bankAccountNo: 'Broj bankovnog računa',
		},
		supplier: {
			supplierName: 'Naziv dobavljača',
			title_popup: 'Podaci o dobavljaču',
			title_createSupplier: 'Unesite dobavlja\u010Da',
		},
		service: {
			serviceName: 'Naziv usluge',
			supplierName: 'Naziv dobavljača',
			title_popup: 'Podaci o usluzi',
		},
		supplierservice: {
			vld_zero_price: 'Cena mora biti pozitivan broj',
			serviceName: 'Naziv usluge',
			supplierName: 'Naziv dobavljača',
			price: 'Cena',
			noPayment: 'Broj rata',
		}
	},
	posting: {
		installment: 'Iznos',
		studentdebts: {
			msg_saved: 'Nalog je uspešno sačuvan',
			plh_enterPaymentPurpose: 'Unesite svrhu uplate ...',
			msg_saveBeforePrinding: 'Molim vas snimite izmene ili ih obrišite pre štampe',
			studentName: 'Ime i prezime učenika',
			referenceNo: 'Poziv na broj',
			serviceName: 'Naziv usluge',
			quantity: 'Količina',
			price: 'Cena',
			amountDebit: 'Iznos zaduženja',
			screen_titleUpdate: 'Zaduživanje studenata: Izmena naloga',
		},
		payment: {
			choosefiles: 'Izaberite fajl',
			nofilechoosen: 'Fajl nije izabran',
		}
	},
	overview : {
		title_overviewStudentPopup: 'Pregled kartice stanja učenika',
		clazz: {
			title_print: 'Pregled po odeljenju'
		}
	},
	archive: {
		bankstatement: {
			msg_confirmSaveAndPost: 'Da li želite da sačuvate i rasknjižite uplate?',
			title_popup: 'Stavke izvoda',
		}
	}
}

export default lang;