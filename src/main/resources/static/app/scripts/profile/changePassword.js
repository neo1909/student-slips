function init() {
	$("#iptCurrPassword").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 45 });
	$("#iptNewPassword").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 45 });
	$("#iptCfNewPassword").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 45 });
	
    $('#formChangePassword').jqxValidator({
        hintType: 'label',
        position: 'bottomright',
        rules: [
            {input: '#iptCurrPassword', message: i18n.lang.profile.vld_req_currPwd, action: 'keyup, blur', rule: 'required'},
            {input: '#iptNewPassword', message: i18n.lang.profile.vld_req_newPwd, action: 'keyup, blur', rule: 'required'},
            {input: '#iptNewPassword', message: i18n.lang.profile.vld_min_newPwd, action: 'keyup, blur', rule: 'minLength=8'},
            {input: '#iptCfNewPassword', message: i18n.lang.profile.vld_req_cfNewPwd, action: 'keyup, blur', rule: 'required'}
        ]
    });
}

$(document).ready(function() {
	init();
	
	$("#btnChangePassword").click(function() {
		if (!$('#formChangePassword').jqxValidator('validate')) return;
		
		let currPwd = $("#iptCurrPassword").val();
		let newPwd = $("#iptNewPassword").val();
		let cfNewPwd = $("#iptCfNewPassword").val();
		
		if (currPwd == newPwd) {
			SS.alert(SS.title.ERROR, i18n.lang.profile.msg_newOldPwdDifferent);
			return;
		}
		if (cfNewPwd != newPwd) {
			SS.alert(SS.title.ERROR, i18n.lang.profile.msg_newPwdNotMatch);
			return;
		}
		
		SS.sendToServer('P_CHG_01', false, {
			currentPassword: CryptoJS.AES.encrypt(currPwd, "!@#studentslips-2021").toString(),
			newPassword: CryptoJS.AES.encrypt(newPwd, "!@#studentslips-2021").toString()
		}, function onSuccess(data) {
			if (data && data.message) {
				if (data.status == 'OK') {
					SS.confirm("Success", data.message, function(result) {
						window.location = "/logout";
						return;
					});
				} else {
					$("#iptCurrPassword").val("");
					$("#iptNewPassword").val("");
					$("#iptCfNewPassword").val("");
					SS.alert(SS.title.ERROR, data.message);
				}
			}
		}, function onError(err) {
			$("#iptCurrPassword").val("");
			$("#iptNewPassword").val("");
			$("#iptCfNewPassword").val("");
			SS.alert(SS.title.ERROR, SS.message.ERROR);
		});
	});
});