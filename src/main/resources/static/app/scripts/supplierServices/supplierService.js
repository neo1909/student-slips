
let fn = {
    dataset: null,
    gridSource: null,

    _srcService: [],
    _srcSupplier: [],

    init: function() {

        /*
        * Init Component
        * */
        fn.gridSource = {
            datafields: [

                { name: 'id', type: 'int'},
                { name: 'name', type: 'string'},

                { name: 'suppliersId', type: 'int'},
                { name: 'supplierName', type: 'string'},

                { name: 'schoolId', type: 'int'},

                { name: 'serviceId', type: 'int'},
                { name: 'serviceName', type: 'string'},

                { name: 'price', type: 'number'},
                { name: 'noPayment', type: 'int'},
                { name: 'grade', type: 'int'},

                { name: 'amount1', type: 'number'},
                { name: 'amount2', type: 'number'},
                { name: 'amount3', type: 'number'},
                { name: 'amount4', type: 'number'},
                { name: 'amount5', type: 'number'},
                { name: 'amount6', type: 'number'},
                { name: 'amount7', type: 'number'},
                { name: 'amount8', type: 'number'},
                { name: 'amount9', type: 'number'},
                { name: 'amount12', type: 'number'},
                { name: 'amount11', type: 'number'},
                { name: 'amount12', type: 'number'},

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

        $("#grdDetail").jqxGrid({
            source: dataAdapter,
            columns: [
                { text: 'No.', datafield: '', align: 'center', cellsalign:'center', width: '5%'
                    , cellsrenderer: function (rowIndex, column, value, defaultHtml) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 9px;">'+
                            + (rowIndex + 1)
                            + '</div>';
                    }
                },
                { text: 'Name', datafield: 'name', align: 'center', cellsalign:'left', width: '15%'},
                { text: 'Supplier Name', datafield: 'supplierName', align: 'center', cellsalign:'left', width: '15%'},
                { text: 'Service Name', datafield: 'serviceName', align: 'center', cellsalign:'left', width: '15%'},
                { text: 'Price', datafield: 'price', align: 'center', cellsalign:'right', width: '20%'},
                { text: 'No. Payment', datafield: 'noPayment', align: 'center', cellsalign:'right', width: '10%'},
                { text: 'Grade', datafield: 'grade', align: 'center', cellsalign:'center', width: '10%'},

                { text: '', cellsalign:'center', width: '10%,'
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
            height: 400,
            rowsheight: 33
        });

        // Search
        $("#iptNmSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...' });

        // Popup
        $("#popupDetail").jqxWindow({
            isModal: true,
            autoOpen: false,
            height: 600,
            width: 1000,
            theme: 'bootstrap',
            title: 'Supplier Service detail',
            position: 'center',
            resizable: false
        });

        $('#iptNm').jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter name...' });
        $("#cmbSupplier").jqxDropDownList({ enableBrowserBoundsDetection: true, source: fn._srcSupplier, displayMember: 'name', valueMember: 'id', selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%' });
        $("#cmbService").jqxDropDownList({ enableBrowserBoundsDetection: true, source: fn._srcService, displayMember: 'name', valueMember: 'id', selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%' });
        $("#cmbGrade").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.grade, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%' });
        $("#cmbNoPayment").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.noPayment, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%' });

        $("#iptPrice").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt01").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt02").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt03").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt04").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt05").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt06").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt07").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt08").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt09").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt10").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt11").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });
        $("#iptAmt12").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: true });

        // $('#form').jqxValidator({
        //     hintType: 'label',
        //     rules: [
        //         { input: '#iptNm', message: 'Name is required!', action: 'keyup, blur', rule: 'required' },
        //         { input: '#iptSplNm', message: 'Data is invalid!', action: 'keyup, blur', rule: 'length=1,250' },
        //     ]
        // });


        /*
        * Init Component Event
        * */
        $('#btnSrch').click(function () {
            $('#grdDetail').jqxGrid('refresh');
            fn.onSearch();
        });

        $('#btnCreate').click(function () {
            $("#popupDetail").jqxWindow('open', fn.popup.open());
        });

        $('#btnCancel').click(function () {
            $("#popupDetail").jqxWindow('close');
        });

        $('#btnSave').click(function () {
            // if (!$('#form').jqxValidator('validate')) {
            //     return;
            // }

            fn.onSave();
        });
    },

    onSearch: function () {
        let name = $('#iptNmSrch').val();
        if (name) {
            name = name.trim();
        }

        let params = {
            name: name
        };

        SS.sendToServer(
            'SL_R_03',
            false,
            params,
            function onSuccess(data) {
                fn.gridSource.localdata = data.lst;
                $("#grdDetail").jqxGrid({ source: fn.gridSource });
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    onSave: function () {
        let data = {
            id: $('#iptId').val(),
            name: $('#iptNm').val().trim(),
            schoolId: 1,
            supplierId: $('#cmbSupplier').val(),
            serviceId: $('#cmbService').val(),
            grade: $('#cmbGrade').val(),
            price: $('#iptPrice').val(),
            noPayment: $('#cmbNoPayment').val(),
            amount1: $('#iptAmt01').val(),
            amount2: $('#iptAmt02').val(),
            amount3: $('#iptAmt03').val(),
            amount4: $('#iptAmt04').val(),
            amount5: $('#iptAmt05').val(),
            amount6: $('#iptAmt06').val(),
            amount7: $('#iptAmt07').val(),
            amount8: $('#iptAmt08').val(),
            amount9: $('#iptAmt09').val(),
            amount10: $('#iptAmt10').val(),
            amount11: $('#iptAmt11').val(),
            amount12: $('#iptAmt12').val()
        };

        if (data.id) {  // Update
            SS.sendToServer(
                'SL_U_03',
                false,
                data,
                function onSuccess(data) {
                    $("#popupDetail").jqxWindow('close');
                    fn.onSearch();
                }
            );
        } else {    // Insert
            SS.sendToServer(
                'SL_C_03',
                false,
                data,
                function onSuccess(data) {
                    $("#popupDetail").jqxWindow('close');
                    fn.onSearch();
                }
            );
        }

    },

    onDelete: function (rowIndex) {
        let data = $("#grdDetail").jqxGrid('getrowdata', rowIndex);
        let id = data.id;
        if (id) {
            SS.confirm(SS.title.CONFIRM, "Do you want delete ? ", function (result) {
                if (result ) {
                    SS.sendToServer(
                        'SL_D_03',
                        false,
                        { id : id },
                        function onSuccess(data) {
                            fn.onSearch();
                        }
                    );
                }
            });
        }
    },

    onUpdate: function (rowIndex) {
        let data = $("#grdDetail").jqxGrid('getrowdata', rowIndex);
        let id = data.id;
        if (id != null) {
            $("#popupDetail").jqxWindow('open', fn.popup.open(id));
        }
    },

    popup: {
        reset: function () {
            $('#iptNm').val('');
            $('#iptSplId').val(null);
        },

        getService: function () {
            SS.sendToServer(
                'SV_R_01',
                false,
                {
                    name: ""
                },
                function onSuccess(data) {
                    fn._srcService = data.lst;
                },

                function onError(err) {
                    fn._srcService = [];
                    SS.alert( SS.title.ERROR, SS.message.ERROR);
                }
            );
        },

        getSupplier: function () {
            SS.sendToServer(
                'SL_R_01',
                false,
                {
                    name: ""
                },
                function onSuccess(data) {
                    fn._srcSupplier = data.lst;
                },

                function onError(err) {
                    fn._srcService = [];
                    SS.alert( SS.title.ERROR, SS.message.ERROR);
                }
            );
        },

        open: function (id) {
            fn.popup.reset();
            fn.popup.getService();
            fn.popup.getSupplier();
            $("#cmbSupplier").jqxDropDownList({ source: fn._srcSupplier, displayMember: 'name', valueMember: 'id'});
            $("#cmbService").jqxDropDownList({ source: fn._srcService, displayMember: 'name', valueMember: 'id'});

            if (id != null) { // Update
                SS.sendToServer(
                    'SL_R_03',
                    false,
                    { id : id , name: ""},
                    function onSuccess(data) {
                        if (data.lst != null && data.lst.length > 0) {
                            let obj = data.lst[0];
                            $('#iptId').val(obj.id);
                            $('#iptPrice').val(obj.price);
                            $('#iptNm').val(obj.name);
                            $('#cmbSupplier').val(obj.supplierId);
                            $('#cmbService').val(obj.serviceId);
                            $('#cmbGrade').val(obj.grade);
                            $('#cmbNoPayment').val(obj.noPayment);
                            $('#iptAmt01').val(obj.amount1);
                            $('#iptAmt02').val(obj.amount2);
                            $('#iptAmt03').val(obj.amount3);
                            $('#iptAmt04').val(obj.amount4);
                            $('#iptAmt05').val(obj.amount5);
                            $('#iptAmt06').val(obj.amount6);
                            $('#iptAmt07').val(obj.amount7);
                            $('#iptAmt08').val(obj.amount8);
                            $('#iptAmt09').val(obj.amount9);
                            $('#iptAmt10').val(obj.amount10);
                            $('#iptAmt11').val(obj.amount11);
                            $('#iptAmt12').val(obj.amount12);
                        }
                    }
                );
            }
        }
    }

};

$(document).ready(function() {
    fn.init();
    fn.onSearch();
});

