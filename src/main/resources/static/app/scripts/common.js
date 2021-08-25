;

$.jqx.theme = "bootstrap";

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

  clazz: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ],
  clazzEmpty: [ '', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ],
    clazzAll: [ 'All', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ],
  grade: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
  gradeAll: [ "All", 1, 2, 3, 4, 5, 6, 7, 8 ],
  gradeEmpty: [ '', 1, 2, 3, 4, 5, 6, 7, 8 ],

  noPayment: [ '', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
  
  dataSource: {
	 grade: function(emptyValue) {
		 let src = [];
		 if (emptyValue === 'All' || emptyValue === '') src.push({id: "", name: emptyValue});
		 for (let i = 1; i <= 8; i++) {
			 src.push({id: i, name: `${i}`});
		 }
		 return src;
	 },
	 clazz: function(emptyValue) {
		 let src = [];
		 if (emptyValue === 'All' || emptyValue === '') src.push({id: "", name: emptyValue});
		 for (let i = 1; i <= 16; i++) {
			 src.push({id: i, name: `${i}`});
		 }
		 return src;
	 },
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
          text : 'Please wait...',
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
  }
};