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
	
	addEventListener : function() {
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
			if (!$('#formLogin').jqxValidator('validate')) return;
			
        	var username = $("#iptLoginUsername").val();
        	var password = $("#iptLoginPassword").val();
        	
			$.ajax({
				url : "/authenticate",
				type : 'POST',
				data: {
	            	username: username,
	            	password: password
	            },
				success : function(data) {
					if (data && data === 'OK') {
						window.location.href = "/index";
					}
	            },
				error : function(err) {
					if (err && err.responseJSON) {
						$("#iptLoginPassword").val("");
						SS.alert(SS.title.ERROR, err.responseJSON.message);
					}
	            }
			});
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
