;

$.jqx.theme = "bootstrap";

let SSUtils = {
  getI18nValue : function(enVal, srVal, defaultVal) {
		if (!defaultVal) defaultVal = srVal;
		let lang = localStorage.getItem('lang');
		switch (lang) {
			case 'en': return enVal;
			case 'sr': return srVal;
			default: return defaultVal;
		}
	}
}

let SS = {
    API: 'http://localhost:5000/api/',  // local
   //API: 'http://onetouchapp-env.eba-px6uytgm.ap-southeast-1.elasticbeanstalk.com/api/',    // test
  IPT_HEIGHT: 32,

  // Literal
  title: {
    CONFIRM: "Confirm",
    ERROR: "Error",
    INFO: "Info",
    WARNING: "Warning",
  },

  message: {
    ERROR: "Contact admin!"
  },

  dataSource: {
	 // Source NUMBER ARRAY
	 arr_clazz: function() {
		return [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]; 
	 },
	 arr_clazzEmpty: function() {
		return [ '', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]; 
	 },
	 arr_clazzAll: function() {
		return [ 'All', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]; 
	 },
	 arr_grade: function() {
		return [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	 },
	 arr_gradeEmpty: function() {
		return [ '', 1, 2, 3, 4, 5, 6, 7, 8 ];
	 },
	 arr_gradeAll: function() {
		return [ 'All', 1, 2, 3, 4, 5, 6, 7, 8 ];
	 },
	 
	 // Source OBJECT: displayMember: name, valueMember: id
	 grade: function(firstValue) {
		 let src = [];
		 if (firstValue === 'All') src.push({id: "", name: SSUtils.getI18nValue('All', 'Sve')});
		 else if (firstValue === '') src.push({id: "", name: firstValue});
		 for (let i = 1; i <= 8; i++) {
			 src.push({id: i, name: `${i}`});
		 }
		 return src;
	 },
	 clazz: function(firstValue) {
		 let src = [];
		 if (firstValue === 'All') src.push({id: "", name: SSUtils.getI18nValue('All', 'Sve')});
		 else if (firstValue === '') src.push({id: "", name: firstValue});
		 for (let i = 1; i <= 16; i++) {
			 src.push({id: i, name: `${i}`});
		 }
		 return src;
	 },
	 noPayment: function(firstValue) {
		 let src = [];
		 if (firstValue) src.push({id: "", name: firstValue});
		 for (let i = 1; i <= 12; i++) {
			 src.push({id: i, name: `${i}`});
		 }
		 return src;
	 }
  },
  
  grid: {
	  height: 750,
	  customheight: function(height) {
		  return height;
	  },
	  localization: {
		  currencysymbol: "",
		  decimalseparator: ",",
		  thousandsseparator: ".",
		  emptydatastring: SSUtils.getI18nValue('No data to display', 'Nema podataka za prikaz'),
		  pagergotopagestring: SSUtils.getI18nValue('Go to page:', 'Idite na stranu:'),
		  pagershowrowsstring: SSUtils.getI18nValue('Show rows:', 'Broj redova:'),
		  pagerrangestring: SSUtils.getI18nValue(' of ', ' od '),
	  }
  },
  
  locales: {
	 number: "sr-RS"
  },
  
  format: {
	  formatNumberByLocales: function(value, minimumFractionDigits, maximumFractionDigits) {
			  return Number(value).toLocaleString(SS.locales.number, {
								minimumFractionDigits : minimumFractionDigits ? minimumFractionDigits : 2,
								maximumFractionDigits : maximumFractionDigits ? maximumFractionDigits : 2
							});
	  }
  },

  sendToServer: function (url, async, param, onSuccess, onError) {
      
	let loadingText = SSUtils.getI18nValue('Please wait...', 'Molimo sačekajte...');
	  
    $.ajax({
      async: async,
      contentType: 'application/json',
      url: SS.API + url,
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(param),
      success: onSuccess,
      error: onError,
	  
      beforeSend: function (b, f) {
        $('#ssApp').waitMe({
          effect : 'win8',
          text : loadingText,
          bg : 'rgba(255,255,255,0.4)',
          color : '#3c8dbc'
        });
      },

      complete: function (b, f) {
        setTimeout(function () {
          $('#ssApp').waitMe('hide');
        }, 100);
      }

    });

  },

  alert: function (title, message) {
    bootbox.alert({
      size: "small",
      title: title,
      message: message,
      callback: function () {}
    });
  },

  confirm: function (title, message, callback) {
    bootbox.confirm({
      size: "small",
      title: title,
      message: message,
      callback: callback
    });
  },
};