let fn = {
	init : function() {
		$("#iptLoginUsername").jqxInput({placeHolder: i18n.lang.auth.plh_username, height: SS.IPT_HEIGHT, width: '100%', maxLength: 45});
		$("#iptLoginPassword").jqxInput({placeHolder: i18n.lang.auth.plh_password, height: SS.IPT_HEIGHT, width: '100%', maxLength: 45});

        $('#formLogin').jqxValidator({
            hintType: 'label',
            position: 'bottomright',
            rules: [
                {input: '#iptLoginUsername', message: i18n.lang.auth.vld_req_username, action: 'keyup, blur', rule: 'required'},
                {input: '#iptLoginPassword', message: i18n.lang.auth.vld_req_password, action: 'keyup, blur', rule: 'required'},
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
            	password: CryptoJS.AES.encrypt(password, "!@#studentslips-2021").toString(),
            	lang: $("#locales").val()
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
	},
	
	initLanguageSetting: function() {
		$("#locales").val(localStorage.getItem("lang"));
			
		$("#locales").on('change', function () {
			if ($("#locales").val() == '') return;
			i18n.changeLanguage($("#locales").val(), function() {
		    	  localStorage.setItem("lang", $("#locales").val());
		    	  location.reload();
			}, function() {})
		});
	}
}

$(document).ready(function() {
	fn.init();
	fn.addEventListener();
	
	fn.initLanguageSetting();
});
