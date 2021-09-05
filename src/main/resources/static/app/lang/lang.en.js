var lang = {
	common : {
		vld_invalid: function(val) {
			return `${val} is invalid`;
		},
		vld_required: function(val) {
			return `${val} is required`;
		},
	},
	login : {
		plh_username: 'Username *',
		plh_password: 'Password *',
		vld_req_username: 'Username is required',
		vld_req_password: 'Password is required'
	},
	register : {
		vld_req_username: 'Username is required',
		vld_req_password: 'Password is required',
		vld_min_password: 'Min length = 8',
		vld_req_email: 'Email is required',
		vld_inv_email: 'Email is invalid',
	}
}

export default lang;