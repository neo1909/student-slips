let fn = {
    dataset: null,
    gridSource: null,

    init: function () {


        /*
        * Init Component Event
        * */
        $('#btnPostUploadBankStmt').click(function () {
            fn.onUpload();
        });

        $('#btnPostSavePost').click(function () {
            fn.onSavePost();
        });

    },

    onUpload: function () {
        // Get form
        var form = $('#formUpload')[0];

        var files = new FormData(form);

        // files.append("CustomField", "This is some extra data, testing");

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/api/PP_R_01",
            data: files,
            processData: false, //prevent jQuery from automatically transforming the data into a query string
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {

                console.log(data);
                if (data.status == "500") {
                    SS.alert( SS.title.ERROR,data.errMsg);
                } else {
                    SS.alert( SS.title.INFO, data.msg);
                    fn.disableUpload(true);
                }
            },
            error: function (e) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        });

    },

    onSavePost: function () {
        SS.sendToServer(
            'PP_R_03',
            false,
            '',
            function onSuccess(data) {
                if (data.status == '200'){
                    SS.alert( SS.title.INFO, data.msg);
                    fn.disableUpload(false);
                }
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    isNotPostStatement: function(){
        SS.sendToServer(
            'PP_R_02',
            false,
            '',
            function onSuccess(data) {
              if (data.isNotPostStatement){
                  fn.disableUpload(true);
              }
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    disableUpload: function(isDisable){
        $("#btnPostUploadBankStmt").prop("disabled", isDisable);
        $("#customFile").prop("disabled", isDisable);
    },
}

$(document).ready(function () {
    fn.init();
    fn.isNotPostStatement();
});
