var i18n = {
	API: 'http://localhost:5000/api/',
//	API: 'http://onetouchapp-env.eba-px6uytgm.ap-southeast-1.elasticbeanstalk.com/api/',
	lang: {},
		
	changeLanguage: function(lang, onSuccess, onError) {
		$.ajax({
	      async: false,
	      contentType: 'application/json',
	      url: `${this.API}LANG_01?lang=${lang}`,
	      type: 'GET',
	      success: onSuccess,
	      error: onError,
		});
	},
		
	syncLanguageFromServer: function() {
		$.ajax({
			async: false,
			contentType: 'application/json',
		    dataType: 'json',
			url: `${this.API}LANG_02`,
			type: 'GET',
			success: function(data) {
				localStorage.setItem("lang", data.lang);
				i18n.setLanguage();
			}
		});
	},
	
	setLanguage: async function() {
		let language = localStorage.getItem("lang") || "sr";
		let lang = await import(`/app/lang/lang.${language}.js`);
		this.lang = lang.default;
	}
}

i18n.syncLanguageFromServer();