var i18n = {
	// API: 'http://localhost:5000/api/',
	// API: 'http://onetouchapp-env.eba-px6uytgm.ap-southeast-1.elasticbeanstalk.com/api/',
	//API: 'http://onetouchapp-env.eba-mebd8vmg.eu-central-1.elasticbeanstalk.com/api/', //production
	API: 'https://onetouch.link/api/', //domain

	lang: {},
		
	changeLanguage: function(lang, onSuccess, onError) {
		$.ajax({
	      async: false,
	      url: `${this.API}LANG_01?lang=${lang}`,
	      type: 'GET',
	      success: onSuccess,
	      error: onError,
		});
	},
		
	syncLanguageFromServer: function() {
		$.ajax({
			async: false,
			url: `${this.API}LANG_02`,
			type: 'GET',
			success: function(data) {
				localStorage.setItem("lang", data && data.lang ? data.lang : "sr");
				i18n.setLanguage();
			},
			error : function() {
				localStorage.setItem("lang", "sr");
				i18n.setLanguage();
			}
		});
	},
	
	setLanguage: function() {
		let language = localStorage.getItem("lang");
		this.lang = i18nLang[language];
	}
}

i18n.syncLanguageFromServer();