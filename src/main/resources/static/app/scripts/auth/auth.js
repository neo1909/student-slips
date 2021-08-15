let component = {
	loadLoginPanel: function() {
		var onSuccess = function(res) {
			$("#dynamic-panel").html(res);
		};
		var onError = function(err) {
			$('#auth-page').html(err.responseText); 
		}
		$.ajax({
			url : "/comp/login-component",
			type : 'GET',
			success : onSuccess,
			error : onError
		});
	}
}

$(document).ready(function() {
	component.loadLoginPanel();
});
