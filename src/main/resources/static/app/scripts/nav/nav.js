function initLanguageSetting() {
//	$("#locales").val($("#iptSession").val());
//    $("#locales").on('change', function () {
//    	if ($("#locales").val() == '') return;
//    	$.ajax({
//	      async: false,
//	      contentType: 'application/json',
//	      url: "http://localhost:5000/api/LANG_01?lang=" + $("#locales").val(),
//	      type: 'GET',
//	      success: function() {
//	    	  localStorage.setItem("lang", $("#locales").val());
//	    	  location.reload();
//	      }
//    	});
//    });
	
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