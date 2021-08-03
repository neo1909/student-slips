let originalData = [];
let tr_update = [];
let isUpdate = false;
let arrService = [];
let currentIndex = "";

let source = {
    datafields: [{
            name: 'studentId',
            type: 'int'
        },
        {
            name: 'schoolId',
            type: 'int'
        },
        {
            name: 'suppliersId',
            type: 'int'
        },
        {
            name: 'serviceId',
            type: 'int'
        },
        {
            name: 'referenceNo',
            type: 'string'
        },
        {
            name: 'quantity',
            type: 'int'
        },
        {
            name: 'purpose',
            type: 'string'
        },
        {
            name: 'debitDate',
            type: 'date'
        },
        {
            name: 'amountDebt',
            type: 'string'
        },
        {
            name: 'sClass',
            type: 'int'
        },
        {
            name: 'grade',
            type: 'int'
        },
        {
            name: 'delYn',
            type: 'string'
        },
        {
            name: 'insertId',
            type: 'int'
        },
        {
            name: 'insertDate',
            type: 'string'
        },
        {
            name: 'updateId',
            type: 'int'
        },
        {
            name: 'updateDate',
            type: 'string'
        },
        {
            name: 'nameStudent',
            type: 'string'
        },
        {
            name: 'nameService',
            type: 'string'
        },
        {
            name: 'price',
            type: 'string'
        }
    ],
    datatype: "array",
    localdata: null,
    updaterow: function (rowid, rowdata, commit) {
        let beforeData = originalData[rowid];
        let selectedRowData = $('#grdStudentDebts').jqxGrid('getrowdata', rowid);
        if (Object.keys(beforeData).length > 0 && Object.keys(selectedRowData).length > 0) {
            if (beforeData.quantity === selectedRowData.quantity) {
                isUpdate = false;
                if (tr_update.length > 0) {
                    tr_update = tr_update.filter(item => item.quantity !== selectedRowData.quantity);
                }
                return;
            }
            if (tr_update.length > 0) {
                tr_update = tr_update.filter(item => item.quantity !== selectedRowData.quantity);
            }
            tr_update.push(selectedRowData);
            isUpdate = true;
        }

        commit(true);
    }
};

function createGrid() {
    let dataAdapter = new $.jqx.dataAdapter(source);
    $("#grdStudentDebts").jqxGrid({
        source: dataAdapter,
        selectionmode: 'singlecell',
        editable: true,
        columns: [{
                text: 'Name student',
                datafield: 'nameStudent',
                align: 'center',
                cellsalign: 'left',
                width: '16,6667%',
                editable: false,
            },
            {
                text: 'Reference No',
                datafield: 'referenceNo',
                align: 'center',
                cellsalign: 'left',
                width: '16,6667%',
                editable: false,
            },
            {
                text: 'Service',
                datafield: 'nameService',
                align: 'center',
                cellsalign: 'right',
                width: '16,6667%',
                editable: false,
            },
            {
                text: 'Quantity',
                columntype: 'textbox',
                datafield: 'quantity',
                align: 'center',
                cellsalign: 'right',
                width: '16,6667%',
                editable: true,
            },
            {
                text: 'Price',
                datafield: 'price',
                align: 'center',
                cellsalign: 'center',
                width: '16,6667%',
                editable: false,
            },
            {
                text: 'Amount of debit',
                datafield: 'amountDebt',
                columntype: 'textbox',
                align: 'center',
                cellsalign: 'right',
                editable: false,
            },
        ],
        theme: 'bootstrap',
        width: '100%',
        height: 350,
        rowsheight: 33
    });
}

function init() {
    $("#iptDateSrch").jqxDateTimeInput({
        height: SS.IPT_HEIGHT,
        width: '100%',
        disabled: true
    });
    $("#iptPriceSrch").jqxInput({
        height: SS.IPT_HEIGHT,
        width: '100%',
        disabled: true
    });
    $("#cmbStdGradeSrch").jqxDropDownList({
        enableBrowserBoundsDetection: true,
        source: SS.gradeEmpty,
        selectedIndex: 0,
        height: SS.IPT_HEIGHT,
        width: '100%',
        dropDownHorizontalAlignment: 'right'
    });
    $("#cmbStdClazzSrch").jqxDropDownList({
        enableBrowserBoundsDetection: true,
        source: SS.clazz,
        selectedIndex: 0,
        height: SS.IPT_HEIGHT,
        width: '100%',
        dropDownHorizontalAlignment: 'right'
    });
    $("#cmbStdServiceSrch").jqxDropDownList({
        enableBrowserBoundsDetection: true,
        height: SS.IPT_HEIGHT,
        width: '100%',
        dropDownHorizontalAlignment: 'right',
        disabled: true
    });

    $("#iptComment").jqxTextArea({
        width: 450,
        height: 100,
        placeHolder: 'Enter a sentence...'
    });

}

function onSearch() {
    const dataLocalStoreage = JSON.parse( localStorage.getItem('task'));
    let params = {
        grade: $("#cmbStdGradeSrch").val() ? $("#cmbStdGradeSrch").val() : "",
        sClass: $("#cmbStdClazzSrch").val() ? $("#cmbStdClazzSrch").val() : "",
        serviceId: $("#cmbStdServiceSrch").val() ? $("#cmbStdServiceSrch").val() : "",
        price: $("#iptPriceSrch").val(),
        suppliersId: $('#cmbSuplier').val()
    };
    if(!params.serviceId) {
        SS.alert('Notification', 'Please select service')
        return;
    }
    SS.sendToServer(
        dataLocalStoreage && dataLocalStoreage.isUpdate ? 'SD_R_01' : 'SD_R_02',
        false,
        params,
        function onSuccess(data) {
            if(data) {
                source.localdata = data.lst;
                originalData = data.lst;
                $('#grdStudentDebts').jqxGrid('updatebounddata');
            }
        },

        function onError(err) {
            SS.alert(SS.title.ERROR, SS.message.ERROR);
        }
    );
}

function onGetSupplier() {
    return new Promise(resolve => {
        SS.sendToServer(
            'SL_R_01',
            false, {},
            function onSuccess(data) {
                resolve(data)
            },
            function onError(err) {
                SS.alert(SS.title.ERROR, SS.message.ERROR);
            }
        )
    })
}

function onGetService(gradeId, suppliersId) {
    SS.sendToServer(
        'SL_R_03',
        false, {
            grade: gradeId,
            suppliersId: suppliersId
        },

        function onSuccess(data) {
            if (data && data.lst && data.lst.length > 0) {
                $("#cmbStdServiceSrch").jqxDropDownList({
                    source: [...data.lst],
                    displayMember: "serviceName",
                    valueMember: "serviceId",
                    disabled: false,
                    selectedIndex: 0
                })
                return
            }
            $("#cmbStdServiceSrch").jqxDropDownList({
                disabled: true,
                source: [],
            })
            $("#iptPriceSrch").val("");

        },
        function onError(err) {
            SS.alert(SS.title.ERROR, SS.message.ERROR);
        }
    )
}


$(document).ready(function () {
    onGetSupplier().then(value => {
        if (value && value.lst) {
            $("#cmbSuplier").jqxDropDownList({
                enableBrowserBoundsDetection: true,
                source: [{}, ...value.lst],
                displayMember: "name",
                valueMember: "id",
                selectedIndex: 0,
                height: SS.IPT_HEIGHT,
                width: '100%',
                dropDownHorizontalAlignment: 'right'
            });
            init();
            createGrid();
            const dataLocalStoreage = JSON.parse( localStorage.getItem('task'));
            if(dataLocalStoreage && Object.keys(dataLocalStoreage).length >0) {
                $("#cmbStdGradeSrch").jqxDropDownList('val', dataLocalStoreage.grade);
                $("#cmbStdClazzSrch").jqxDropDownList('val', dataLocalStoreage.sClass);
                $("#cmbSuplier").jqxDropDownList('val', dataLocalStoreage.suppliersId);
                onGetService(dataLocalStoreage.grade,dataLocalStoreage.suppliersId)
                $("#cmbStdServiceSrch").jqxDropDownList('val', dataLocalStoreage.serviceId);
                $("#iptDateSrch").jqxDateTimeInput('setDate', new Date(dataLocalStoreage.debitDate));
                $("#iptPriceSrch").val(dataLocalStoreage.price)
                $('#iptComment').val(dataLocalStoreage.purpose);
                onSearch();

            }
            $('#btnStdSrch').click(function () {
                $('#grdStudentDebts').jqxGrid('refresh');
                onSearch();
            });
            $("#grdStudentDebts").on('cellvaluechanged', function (event) {
                let args = event.args;
                let datafield = args.datafield;
                let rowIndex = args.rowindex;
                let value = +args.newvalue;
                let selectedRowData = $('#grdStudentDebts').jqxGrid('getrowdata', rowIndex);
                let price = +selectedRowData.price
                if (datafield === 'quantity') {
                    $("#grdStudentDebts").jqxGrid('setcellvalue', rowIndex, "amountDebt", value * price);
                }
            });
            $('#cmbSuplier').on('change', function (event) {
                if (event.args && event.args.item) {
                    const suppliersId = event.args.item.originalItem.id;
                    const gradeId = $('#cmbStdGradeSrch').val()
                    onGetService(gradeId, suppliersId);
                }
            })
            $('#cmbStdGradeSrch').on('change', function (event) {
                if (event.args && event.args.item) {
                    const suppliersId = $('#cmbSuplier').val();
                    const gradeId = event.args.item.originalItem
                    onGetService(gradeId, suppliersId);
                }
            })

            $('#cmbStdServiceSrch').on('change', function (event) {
                $("#iptPriceSrch").val(event.args.item.originalItem.price ? event.args.item.originalItem.price : "");
                currentIndex = +$('#cmbStdServiceSrch').jqxDropDownList('selectedIndex');
            })

            $('#btnSave').on('click', function () {
                if (!isUpdate) {
                    SS.alert('Notification', 'No data update')
                    return;
                }
                if(dataLocalStoreage && dataLocalStoreage.isUpdate) {
                    let params = {
                        suppliersId: $('#cmbSuplier').val(),
                        serviceId: $('#cmbStdServiceSrch').val(),
                        grade: $('#cmbStdGradeSrch').val(),
                        sClass: $('#cmbStdClazzSrch').val(),
                        price: $("#iptPriceSrch").val(),
                        debitDate: $("#iptDateSrch").val(),
                        purpose: $('#iptComment').val(),
                        studentsDebtsList: tr_update
                    }
                    SS.sendToServer(
                        'SD_U_01',
                        false,
                        params,
                        function onSuccess(data) {
                            localStorage.removeItem('task');
                            window.location.href = "/taskArchive";
                            return;

                        }
                    );

                }

                let data = {
                    suppliersId: $('#cmbSuplier').val(),
                    serviceId: $('#cmbStdServiceSrch').val(),
                    grade: $('#cmbStdGradeSrch').val(),
                    sClass: $('#cmbStdClazzSrch').val(),
                    price: $("#iptPriceSrch").val(),
                    debitDate: $("#iptDateSrch").val(),
                    purpose: $('#iptComment').val(),
                    studentsDebtsList: tr_update
                }
                SS.sendToServer(
                    'SD_C_01',
                    false,
                    data,
                    function onSuccess(data) {
                        isUpdate = false;
                        window.location.href = "/taskArchive"
                    }
                );

            })
        }
    })
})