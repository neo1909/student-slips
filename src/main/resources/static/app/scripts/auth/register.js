let fn = {
	init : function() {

		SS.sendToServer('SC_R_03', false, null, function onSuccess(data) {
	    	var src = [];
			if (data && data.lst) src = data.lst;
			$("#iptRegSchool").jqxDropDownList({ source: src, selectedIndex: 0, displayMember: "schoolName", valueMember: "id", width: '100%', height: SS.IPT_HEIGHT});
		}, function onError(err) {
		})
		
		$("#iptRegUsername").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 45 });
		$("#iptRegPassword").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 45 });
		$("#iptRegConfirmPassword").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 45 });
		$("#iptRegFullName").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 100 });
		$("#iptRegEmail").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 180 });

        $('#formReg').jqxValidator({
            hintType: 'label',
            position: 'bottomright',
            rules: [
                {input: '#iptRegUsername', message: 'Username is required', action: 'keyup, blur', rule: 'required'},
                {input: '#iptRegPassword', message: 'Password is required', action: 'keyup, blur', rule: 'required'},
                {input: '#iptRegPassword', message: 'Min length = 8', action: 'keyup, blur', rule: 'minLength=8'},
                {input: '#iptRegEmail', message: 'E-mail is required', action: 'keyup, blur', rule: 'required'},
                {input: '#iptRegEmail', message: 'E-mail is invalid', action: 'keyup, blur', rule: 'email'},
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
		
		$("#btnCancel").on('click', function() {
			$("#iptRegUsername").val("");
			$("#iptRegPassword").val("");
			$("#iptRegConfirmPassword").val("");
			$("#iptRegSchool").jqxDropDownList({selectedIndex: 0});
			$("#iptRegEmail").val("");
			$("#iptRegFullName").val("");
		})
		
		$("#btnRegister").on('click', function() {
			if (!$('#formReg').jqxValidator('validate')) return;
			if ($("#iptRegConfirmPassword").val() != $("#iptRegPassword").val()) {
				SS.alert(SS.title.ERROR, "Password does not match!");
				$("#iptRegPassword").val("");
				$("#iptRegConfirmPassword").val("");
				return;
			}
			
			SS.sendToServer('A_R_01', false, {
				username: $("#iptRegUsername").val(),
				password: $("#iptRegPassword").val(),
				schoolId: $("#iptRegSchool").val(),
				email: $("#iptRegEmail").val(),
				fullName: $("#iptRegFullName").val()
			}, function(res) {
				if (res.status === 200) {
					SS.confirm("Success", res.msg, function(result) {
						if (result) {
							_this.goToLogin();
							return;
						}
					});
				} else {					
					$("#iptRegPassword").val("");
					$("#iptRegConfirmPassword").val("");
					SS.alert(SS.title.ERROR, (res && res.msg) ? res.msg : "Register failed, please retry");
				}
			}, function(err) {
				$("#iptRegPassword").val("");
				$("#iptRegConfirmPassword").val("");
				SS.alert(SS.title.ERROR, err ? err.msg : "Register failed, please retry");
			})
		});
	}
}

$(document).ready(function() {
	fn.init();
	fn.addEventListener();
});
