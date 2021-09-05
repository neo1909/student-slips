function initLanguageSetting() {
	$("#locales").val(localStorage.getItem("lang"));
	
	$("#locales").on('change', function () {
		if ($("#locales").val() == '') return;
		i18n.changeLanguage($("#locales").val(), function() {
	    	  localStorage.setItem("lang", $("#locales").val());
	    	  location.reload();
		}, function() {})
	});
};

$(document).ready(function() {
	initLanguageSetting();
});