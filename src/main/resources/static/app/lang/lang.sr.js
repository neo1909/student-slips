var common = {
	vld_invalid: function(val) {
		return `${val} nije ispravan`;
	},
	vld_required: function(val) {
		return `${val} je obavezan podatak`;
	},
}

var lang = {
	login : {
		plh_username: 'Korisničko ime *',
		plh_password: 'Lozinka *',
		vld_req_username: common.vld_required('Korisničko ime'),
		vld_req_password: common.vld_required('Lozinka')
	},
	register : {
		vld_req_username: common.vld_required('Korisničko ime'),
		vld_req_password: common.vld_required('Lozinka'),
		vld_min_password: 'Minimalna dužina = 8',
		vld_min_password: 'Min length = 8',
		vld_req_email: common.vld_required('Imejl'),
		vld_inv_email: 'Imejl nije ispravan',
	}
}

export default lang;