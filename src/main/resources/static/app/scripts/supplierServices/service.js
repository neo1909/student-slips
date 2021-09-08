let fn = {
    dataset: null,
    gridSource: null,

    init: function() {

        /*
        * Init Component
        * */
        fn.gridSource = {
            datafields: [
                { name: 'id', type: 'int'},
                { name: 'name', type: 'string'},
                { name: 'schoolId', type: 'int'},
                { name: 'schoolName', type: 'string'},
                { name: 'supplierId', type: 'int'},
                { name: 'supplierName', type: 'string'},
                { name: 'delYn', type: 'string'},
                { name: 'insertId', type: 'int'},
                { name: 'insertDate', type: 'string'},
                { name: 'updateId', type: 'int'},
                { name: 'updateDate', type: 'string'}
            ],
            datatype: "array",
            localdata: fn.dataset
        };

        let dataAdapter = new $.jqx.dataAdapter(fn.gridSource, {
            loadComplete: function (data) {
            },

            loadError: function (xhr, status, error) {
            }
        });

        $("#grdService").jqxGrid({
            source: dataAdapter,
            pageable: true,
            columns: [
                { text: 'No.', datafield: '', align: 'center', cellsalign:'center', width: '5%'
                    , cellsrenderer: function (rowIndex, column, value, defaultHtml) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 9px;">'+
                            + (rowIndex + 1)
                            + '</div>';
                    }
                },
                { text: 'Service Name', datafield: 'name', align: 'center', cellsalign:'left', width: '40%'},
                { text: 'Supplier Name', datafield: 'supplierName', align: 'center', cellsalign:'left', width: '40%'},
                { text: '', cellsalign:'center', width: '15%,'
                    , cellsrenderer: function (rowIndex, column, value) {
                        return '<div style="text-align: center; margin-top: 4px;">'
                            + '<button alt="Edit" class="btn btn-info btn-icon btn-sm" style="margin-right: 10px" onclick="fn.onUpdate(' + rowIndex +')"><span class="glyphicon glyphicon-edit"></span></button>'
                            + '<button alt="Delete" class="btn btn-danger btn-icon btn-sm" onclick="fn.onDelete(' + rowIndex +')"><span class="glyphicon glyphicon-trash"></span></button>'
                            + '</div>';
                    }
                }
            ],
            theme: 'bootstrap',
            width: '100%',
            height: SS.grid.height,
            rowsheight: 33
        });
        $("#grdService").jqxGrid('localizestrings', SS.grid.localization);

        // Search
        $("#iptSvcNmSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: i18n.lang.common.plh_enterSearch });

        // Popup Student
        $("#popupService").jqxWindow({
            isModal: true,
            autoOpen: false,
            height: 350,
            width: 700,
            theme: 'bootstrap',
            title: 'Service detail',
            position: 'center',
            resizable: false
        });

        $('#iptSvcNm').jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: i18n.lang.common.plh_enterName });

        $('#frmService').jqxValidator({
            hintType: 'label',
            rules: [
                { input: '#iptSvcNm', message: i18n.lang.dataentry.vld_req_name, action: 'keyup, blur', rule: 'required' },
                { input: '#iptSvcNm', message: i18n.lang.dataentry.vld_inv_name, action: 'keyup, blur', rule: 'length=1,250' },
            ]
        });


        /*
        * Init Component Event
        * */
        $('#btnSvcSrch').click(function () {
            $('#grdService').jqxGrid('refresh');
            fn.onSearch();
        });

        $('#btnSvcCreate').click(function () {
            $("#popupService").jqxWindow('open', fn.popup.open());
        });

        $('#btnCancel').click(function () {
            $("#popupService").jqxWindow('close');
        });

        $('#btnSave').click(function () {
            if (!$('#frmService').jqxValidator('validate')) {
                return;
            }

            fn.onSave();
        });
    },

    onSearch: function () {
        let svcNm = $('#iptSvcNmSrch').val();
        if (svcNm) {
            svcNm = svcNm.trim();
        }

        let params = {
            name: svcNm
        };

        SS.sendToServer(
            'SV_R_01',
            false,
            params,
            function onSuccess(data) {
            	if (data && data.status && data.status === 'NG') {
                    SS.alert( SS.title.ERROR, data.message);
                    return;
            	}
                fn.gridSource.localdata = data.lst;
                $("#grdService").jqxGrid({ source: fn.gridSource });
            },
            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    onSave: function () {
        let data = {
            id: $('#iptSvcId').val(),
            name: $('#iptSvcNm').val().trim(),
            supplierId: $("#cmbSupplier").val()
        };

        if (data.id) {  // Update
            SS.sendToServer(
                'SV_U_01',
                false,
                data,
                function onSuccess(data) {
                	if (data && data.status && data.status === 'NG') {
                        SS.alert(SS.title.ERROR, data.message);
                        return;
                	}
                    $("#popupService").jqxWindow('close');
                    fn.onSearch();
                }
            );
        } else {    // Insert
            SS.sendToServer(
                'SV_C_01',
                false,
                data,
                function onSuccess(data) {
                	if (data && data.status && data.status === 'NG') {
                        SS.alert(SS.title.ERROR, data.message);
                        return;
                	}
                    $("#popupService").jqxWindow('close');
                    fn.onSearch();
                }
            );
        }

    },

    onDelete: function (rowIndex) {
        let data = $("#grdService").jqxGrid('getrowdata', rowIndex);
        let serviceId = data.id;
        if (serviceId) {
            SS.confirm(SS.title.CONFIRM, i18n.lang.common.msg_delConfirm, function (result) {
                if (result ) {
                    SS.sendToServer(
                        'SV_D_01',
                        false,
                        { id : serviceId },
                        function onSuccess(data) {
                        	if (data && data.status && data.status === 'NG') {
                                SS.alert(SS.title.ERROR, data.message);
                                return;
                        	}
                            fn.onSearch();
                        }
                    );
                }
            });
        }
    },

    onUpdate: function (rowIndex) {
        let data = $("#grdService").jqxGrid('getrowdata', rowIndex);
        let serviceId = data.id;
        if (serviceId != null) {
            $("#popupService").jqxWindow('open', fn.popup.open(serviceId));
        }
    },

    popup: {
        reset: function () {
            $('#iptSvcNm').val('');
            $('#iptSvcId').val(null);
        },

        open: function (serviceId) {
            fn.popup.reset();
            
    		SS.sendToServer('SL_R_01', false, {}, function onSuccess(data) {
    	    	var src = [];
    			if (data && data.lst) src = data.lst;;
    			$("#cmbSupplier").jqxDropDownList({ source: src, selectedIndex: 0, displayMember: "name", valueMember: "id", width: '100%', height: SS.IPT_HEIGHT});
    		}, function onError(err) {
    		})

            if (serviceId != null) { // Update
                SS.sendToServer(
                    'SV_R_02',
                    false,
                    { id : serviceId },
                    function onSuccess(data) {
                        $('#iptSvcId').val(data.obj.id);
                        $('#iptSvcNm').val(data.obj.name);
                    }
                );
            }
        }
    }

};

$(document).ready(function() {
    fn.init();
    fn.onSearch();
    $(document).on('keypress', function(e) {
    	if (e.keyCode == 13) {
    		e.preventDefault();
    		fn.onSearch();
    	}
    });
});

