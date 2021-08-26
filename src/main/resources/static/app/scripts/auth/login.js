let fn = {
	init : function() {
		$("#iptLoginUsername").jqxInput({placeHolder: "Username *", height: SS.IPT_HEIGHT, width: '100%', maxLength: 45});
		$("#iptLoginPassword").jqxInput({placeHolder: "Password *", height: SS.IPT_HEIGHT, width: '100%', maxLength: 45});

        $('#formLogin').jqxValidator({
            hintType: 'label',
            position: 'bottomright',
            rules: [
                {input: '#iptLoginUsername', message: 'Username is required', action: 'keyup, blur', rule: 'required'},
                {input: '#iptLoginPassword', message: 'Password is required', action: 'keyup, blur', rule: 'required'},
            ]
        });
	},
	
	doLogin: function() {
		if (!$('#formLogin').jqxValidator('validate')) return;
		
    	var username = $("#iptLoginUsername").val();
    	var password = $("#iptLoginPassword").val();
    			
		$.ajax({
			url : "/authenticate",
			type : 'POST',
			data: {
            	username: username,
            	password: CryptoJS.AES.encrypt(password, "!@#studentslips-2021").toString()
            },
			success : function(data) {
				let result = JSON.parse(data);
				if (result && result.status == 'OK') {
					window.location.href = "/index";
				}
            },
			error : function(err) {
				let message = "Failed to login";
				if (err && err.responseText) {
					let result = JSON.parse(err.responseText);
					if (result.status == 'NG' && result.message) {
						message = result.message;
					}
				}
				$("#iptLoginPassword").val("");
				SS.alert(SS.title.ERROR, message);
            }
		});
	},
	
	addEventListener : function() {
		$(document).on('keypress', function(e) {
	    	if (e.keyCode == 13) {
	    		e.preventDefault();
	    		fn.doLogin();
	    	}
	    })
		
		$("#btnCreateAccount").on('click', function() {
			var onSuccess = function(res) {
				$("#dynamic-panel").html(res);
			};
			var onError = function(err) {
				$('#auth-page').html(err.responseText); 
			}
			$.ajax({
				url : "/comp/register-component",
				type : 'GET',
				success : onSuccess,
				error : onError
			});
		});
		
		$("#btnLogin").on('click', function() {
    		fn.doLogin();
		});
		$("#btnForgetPassword").on('click', function() {
			var onSuccess = function(res) {
				$("#dynamic-panel").html(res);
			};
			var onError = function(err) {
				$('#auth-page').html(err.responseText); 
			}
			$.ajax({
				url : "/comp/resetPassword-component",
				type : 'GET',
				success : onSuccess,
				error : onError
			});
		});
	}
}

$(document).ready(function() {
	fn.init();
	fn.addEventListener();
});
