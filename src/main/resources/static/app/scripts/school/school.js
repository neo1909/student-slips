let fn = {
    dataset: null,
    gridSource: null,

    init: function () {

        /*
        * Init Component
        * */
        fn.gridSource = {
            datafields: [
                {name: 'id', type: 'int'},
                {name: 'schoolName', type: 'string'},
                {name: 'address', type: 'string'},
                {name: 'zipCode', type: 'string'},
                {name: 'city', type: 'string'},
                {name: 'municipality', type: 'string'},
                {name: 'backAccountNumber', type: 'string'},
                {name: 'delYn', type: 'string'},
                {name: 'insertId', type: 'int'},
                {name: 'insertDate', type: 'string'},
                {name: 'updateDate', type: 'string'},
                {name: 'updateId', type: 'int'}
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

        $("#grdSchool").jqxGrid({
            source: dataAdapter,
            columns: [
                {
                    text: 'No.', datafield: '', align: 'center', cellsalign: 'center', width: '5%'
                    , cellsrenderer: function (rowIndex, column, value, defaultHtml) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 9px;">' +
                            +(rowIndex + 1)
                            + '</div>';
                    }
                },
                {text: 'School Name', datafield: 'schoolName', align: 'center', cellsalign: 'left', width: '35%,'},
                {text: 'Address', datafield: 'address', align: 'center', cellsalign: 'left', width: '35%,'},
                {text: 'City', datafield: 'city', align: 'center', cellsalign: 'center', width: '9%,'},
                {text: 'Municipality', datafield: 'municipality', align: 'center', cellsalign: 'center', width: '9%,'},
                {
                    text: 'Actions', align: 'center', width: '7%,'
                    , cellsrenderer: function (rowIndex, column, value) {
                        return '<div style="text-align: center; margin-top: 4px;">'
                            + '<button alt="Edit" class="btn btn-info btn-icon btn-sm" style="margin-right: 10px" onclick="fn.onUpdate(' + rowIndex + ')"><span class="glyphicon glyphicon-edit"></span></button>'
                            + '<button alt="Delete" class="btn btn-danger btn-icon btn-sm" onclick="fn.onDelete(' + rowIndex + ')"><span class="glyphicon glyphicon-trash"></span></button>'
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
        $("#iptStdNmSrch").jqxInput({height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...'});

        // Popup Student
        $("#popupSchool").jqxWindow({
            isModal: true,
            autoOpen: false,
            height: 330,
            width: 700,
            theme: 'bootstrap',
            title: 'Create School',
            position: 'center',
            resizable: false
        });
        //
        $('#iptSchoolName').jqxInput({height: SS.IPT_HEIGHT, width: '100%'});
        $('#iptAddress').jqxInput({height: SS.IPT_HEIGHT, width: '100%'});
        $('#iptZipCode').jqxInput({height: SS.IPT_HEIGHT, width: '100%'});
        $('#iptCity').jqxInput({height: SS.IPT_HEIGHT, width: '100%'});
        $('#iptMunicipality').jqxInput({height: SS.IPT_HEIGHT, width: '100%'});
        $('#iptBankAcc').jqxInput({height: SS.IPT_HEIGHT, width: '100%'});

        $('#frmSchool').jqxValidator({
            hintType: 'label',
            rules: [
                {input: '#iptSchoolName', message: 'Name is required!', action: 'keyup, blur', rule: 'required'},
                {input: '#iptSchoolName', message: 'Name is invalid!', action: 'keyup, blur', rule: 'length=1,250'},
                {input: '#iptAddress', message: 'Address is required!', action: 'keyup, blur', rule: 'required'},
                {input: '#iptAddress', message: 'Adress is invalid!', action: 'keyup, blur', rule: 'length=1,500'},
                {input: '#iptZipCode', message: 'ZipCode is required!', action: 'keyup, blur', rule: 'required'},
                {input: '#iptZipCode', message: 'ZipCode is invalid!', action: 'keyup, blur', rule: 'length=1,150'},
                {input: '#iptCity', message: 'City is required!', action: 'keyup, blur', rule: 'required'},
                {input: '#iptCity', message: 'City is invalid!', action: 'keyup, blur', rule: 'length=1,250'},
                {input: '#iptMunicipality', message: 'Municipality is required!', action: 'keyup, blur', rule: 'required'},
                {input: '#iptMunicipality', message: 'Municipality is invalid!', action: 'keyup, blur', rule: 'length=1,150'},
                {input: '#iptBankAcc', message: 'Bankaccount number is required!', action: 'keyup, blur', rule: 'required'},
                {input: '#iptBankAcc', message: 'Bankaccount number is invalid!', action: 'keyup, blur', rule: 'length=1,150'},
            ]
        });

        /*
        * Init Component Event
        * */
        $('#btnStdSrch').click(function () {
            $('#grdSchool').jqxGrid('refresh');
            fn.onSearch();
        });

        $('#btnStdCreate').click(function () {
            $("#popupSchool").jqxWindow('open', fn.popup.open());
        });

        $('#btnSave').click(function () {
            if (!$('#frmSchool').jqxValidator('validate')) {
                return;
            }
            fn.onSave();
        });

        $('#btnCancel').click(function () {
            $("#popupSchool").jqxWindow('close');
        });
    },

    onSearch: function () {
        $("#grdSchool").jqxGrid('clearselection');
        $('#grdSchool').jqxGrid('refresh');
        let params = {
            schoolName: $('#iptStdNmSrch').val()
        };
        SS.sendToServer(
            'SC_R_01',
            false,
            params,
            function onSuccess(data) {
                fn.gridSource.localdata = data.lst;
                $("#grdSchool").jqxGrid({ source: fn.gridSource });
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    onSave: function () {
        let data = {
            schoolName: $('#iptSchoolName').val()? $('#iptSchoolName').val(): "" ,
            address: $('#iptAddress').val()? $('#iptAddress').val() : "",
            zipCode:$('#iptZipCode').val()? $('#iptZipCode').val() : "",
            city:$('#iptCity').val() ? $('#iptCity').val() : "" ,
            municipality:$('#iptMunicipality').val() ? $('#iptMunicipality').val() : "",
            backAccountNumber:$('#iptBankAcc') .val()? $('#iptBankAcc').val(): "",
        }
        const id =  $('#iptId').val();
        if(id) {
            SS.sendToServer(
                'SC_U_01',
                false,
                {...data,id:id},
                function onSuccess(data) {
                    $("#popupSchool").jqxWindow('close');
                    fn.onSearch();
                }
            );
            return
        }
        SS.sendToServer(
            'SC_C_01',
            false,
            data,
            function onSuccess(data) {
                console.log(data)
                $("#popupSchool").jqxWindow('close');
                fn.onSearch();
            }
        );
    },

    onUpdate: function (rowIndex) {
        let data = $("#grdSchool").jqxGrid('getrowdata', rowIndex);
        let id = data.id;
        if (id != null) {
            $("#popupSchool").jqxWindow('open', fn.popup.open(id));
        }
    },

    onDelete: function (rowIndex) {
        let data = $("#grdSchool").jqxGrid('getrowdata', rowIndex);
        let id = data.id;
        if (id) {
            SS.confirm(SS.title.CONFIRM, "Do you want delete ? ", function (result) {
                if (result ) {
                    SS.sendToServer(
                        'SC_D_01',
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


    popup: {
        reset: function () {
            $('#iptSchoolName').val('');
            $('#iptAddress').val('');
            $('#iptZipCode').val('');
            $('#iptCity').val('');
            $('#iptMunicipality').val('');
            $('#iptBankAcc').val('');
            $('#iptId').val('');
        },

        open: function (schoolId) {
            fn.popup.reset();
            if (schoolId != null) { // Update
                SS.sendToServer(
                    'SC_R_02',
                    false,
                    { id : schoolId },
                    function onSuccess(data) {
                        $('#iptId').val(data.obj.id);
                        $('#iptSchoolName').val(data.obj.schoolName);
                        $('#iptAddress').val(data.obj.address);
                        $('#iptZipCode').val(data.obj.zipCode);
                        $('#iptCity').val(data.obj.city);
                        $('#iptMunicipality').val(data.obj.municipality);
                        $('#iptBankAcc').val(data.obj.backAccountNumber);
                    }
                );
            }
        }
    }
}

$(document).ready(function() {
    fn.init();
    fn.onSearch();
});
