var SS = {
  API: 'http://localhost:5000/api/',  // dev
  clazz: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
  grade: [ 1, 2, 3, 4, 5, 6, 7, 8 ],

  sendToServer: function (url, param, onSuccess, onError) {
    $.ajax({
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
          $('#ssApp').waitMe('hide');
      }

    });
  }
};