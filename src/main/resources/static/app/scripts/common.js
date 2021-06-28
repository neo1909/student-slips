var SS = {
  API: 'http://localhost:5000/api/',  // dev
  clazz: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
  grade: [ 1, 2, 3, 4, 5, 6, 7, 8 ],

  sendToServer: function (url, param, onSuccess, onError, onComplete) {
    $.ajax({
      contentType: 'application/json',
      url: SS.API + url,
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(param),
      success: onSuccess,
      error: onError,
      complete: onComplete
    });
  }
};