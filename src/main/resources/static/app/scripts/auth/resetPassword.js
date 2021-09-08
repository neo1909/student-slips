let fn = {
	init : function() {
		
		$("#iptRsUsername").jqxInput();
		$("#iptRsEmail").jqxInput();

        $('#formReset').jqxValidator({
            hintType: 'label',
            position: 'bottomright',
            rules: [
                {input: '#iptRsUsername', message: i18n.lang.auth.vld_req_username, action: 'keyup, blur', rule: 'required'},
                {input: '#iptRsEmail', message: i18n.lang.auth.vld_inv_email, action: 'keyup, blur', rule: 'email'},
                {input: '#iptRsEmail', message: i18n.lang.auth.vld_req_email, action: 'keyup, blur', rule: 'required'},
            ]
        });
	},
	
	goToLogin: function() {
		var onSuccess = function(res) {
			$("#dynamic-panel").html(res);
		};
		var onError = function(err) {
			$('#auth-page').html(err.responseText); 
		}
		$.ajax({
			url : "/comp/login-component",
			type : 'GET',
			success : onSuccess,
			error : onError
		});
	},
	
	addEventListener : function() {
		var _this = this;
		$("#btnReturnToLogin").on('click', this.goToLogin);
		
		$("#btnResetPassword").on('click', function() {
			if (!$('#formReset').jqxValidator('validate')) return;
			
			SS.confirm("Confirmation", i18n.lang.auth.msg_resetPasswordConfirm, function(result) {
				if (result) {
					SS.sendToServer('A_R_02', false, {
						username: $("#iptRsUsername").val(),
						email: $("#iptRsEmail").val(),
					}, function(res) {
						if (res && res.status == 200) {
							SS.confirm("Success", res.msg, function(result) {
								if (result) {
				        			_this.goToLogin();
								}
							});
						} else {
							$("#iptRsUsername").val("");
							$("#iptRsEmail").val("");
							SS.alert(SS.title.ERROR, (res && res.msg) ? res.msg : SS.message.ERROR);
						}
					}, function(err) {
						$("#iptRsUsername").val("");
						$("#iptRsEmail").val("");
						SS.alert(SS.title.ERROR, SS.message.ERROR);
					})
				}
			});
		});
	}
}

$(document).ready(function() {
	fn.init();
	fn.addEventListener();
});
