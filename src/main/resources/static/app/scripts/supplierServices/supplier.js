;

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

        $("#grdSupplier").jqxGrid({
            source: dataAdapter,
            columns: [
                { text: 'No.', datafield: '', align: 'center', cellsalign:'center', width: '5%'
                    , cellsrenderer: function (rowIndex, column, value, defaultHtml) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 9px;">'+
                            + (rowIndex + 1)
                            + '</div>';
                    }
                },
                { text: 'Supplier Name', datafield: 'name', align: 'center', cellsalign:'left', width: '88%'},
                { text: '', cellsalign:'center', width: '7%,'
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
        $("#iptSplNmSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...' });

        // Popup Student
        $("#popupSupplier").jqxWindow({
            isModal: true,
            autoOpen: false,
            height: 250,
            width: 700,
            theme: 'bootstrap',
            title: 'Supplier detail',
            position: 'center',
            resizable: false
        });

        $('#iptSplNm').jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter name...' });

        $('#frmSupplier').jqxValidator({
            hintType: 'label',
            rules: [
                { input: '#iptSplNm', message: 'Name is required!', action: 'keyup, blur', rule: 'required' },
                { input: '#iptSplNm', message: 'Data is invalid!', action: 'keyup, blur', rule: 'length=1,250' },
            ]
        });


        /*
        * Init Component Event
        * */
        $('#btnSplSrch').click(function () {
            $('#grdSupplier').jqxGrid('refresh');
            fn.onSearch();
        });

        $('#btnSplCreate').click(function () {
            $("#popupSupplier").jqxWindow('open', fn.popup.open());
        });

        $('#btnCancel').click(function () {
            $("#popupSupplier").jqxWindow('close');
        });

        $('#btnSave').click(function () {
            if (!$('#frmSupplier').jqxValidator('validate')) {
                return;
            }

            fn.onSave();
        });
    },

    onSearch: function () {
        let splNm = $('#iptSplNmSrch').val();
        if (splNm) {
            splNm = splNm.trim();
        }

        let params = {
            name: splNm
        };

        SS.sendToServer(
            'SL_R_01',
            false,
            params,
            function onSuccess(data) {
                fn.gridSource.localdata = data.lst;
                $("#grdSupplier").jqxGrid({ source: fn.gridSource });
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    onSave: function () {
        let data = {
            id: $('#iptSplId').val(),
            name: $('#iptSplNm').val().trim(),
            schoolId: 1
        };

        if (data.id) {  // Update
            SS.sendToServer(
                'SL_U_01',
                false,
                data,
                function onSuccess(data) {
                    $("#popupSupplier").jqxWindow('close');
                    fn.onSearch();
                }
            );
        } else {    // Insert
            SS.sendToServer(
                'SL_C_01',
                false,
                data,
                function onSuccess(data) {
                    $("#popupSupplier").jqxWindow('close');
                    fn.onSearch();
                }
            );
        }

    },

    onDelete: function (rowIndex) {
        let data = $("#grdSupplier").jqxGrid('getrowdata', rowIndex);
        let supplierId = data.id;
        if (supplierId) {
            SS.confirm(SS.title.CONFIRM, "Do you want delete ? ", function (result) {
                if (result ) {
                    SS.sendToServer(
                        'SL_D_01',
                        false,
                        { id : supplierId },
                        function onSuccess(data) {
                            fn.onSearch();
                        }
                    );
                }
            });
        }
    },

    onUpdate: function (rowIndex) {
        let data = $("#grdSupplier").jqxGrid('getrowdata', rowIndex);
        let supplierId = data.id;
        if (supplierId != null) {
            $("#popupSupplier").jqxWindow('open', fn.popup.open(supplierId));
        }
    },

    popup: {
        reset: function () {
            $('#iptSplNm').val('');
            $('#iptSplId').val(null);
        },

        open: function (supplierId) {
            fn.popup.reset();

            if (supplierId != null) { // Update
                SS.sendToServer(
                    'SL_R_02',
                    false,
                    { id : supplierId },
                    function onSuccess(data) {
                        $('#iptSplId').val(data.obj.id);
                        $('#iptSplNm').val(data.obj.name);
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

