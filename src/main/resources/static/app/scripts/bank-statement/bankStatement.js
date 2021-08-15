let originalData = [];
let tr_update = [];
let isUpdate = false;

let source = {
    datafields: [{
        name: 'id',
        type: 'int'
        },
        {
            name: 'schoolId',
            type: 'int'
        },
        {
            name: 'filename',
            type: 'string'
        },
        {
            name: 'bankStatementDate',
            type: 'string'
        },
        {
            name: 'accountNumber',
            type: 'string'
        },
        {
            name: 'payer',
            type: 'string'
        },
        {
            name: 'purpose',
            type: 'string'
        },
        {
            name: 'noOfChanges',
            type: 'int'
        },
        {
            name: 'balance',
            type: 'string'
        },
        {
            name: 'noOfBankStatement',
            type: 'int'
        },
        {
            name: 'claims',
            type: 'string'
        },
        {
            name: 'referenceNo',
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
            name: 'currencyDate',
            type: 'string'
        },
        {
            name: 'postPaymentYn',
            type: 'string'
        },
        {
            name: 'delYn',
            type: 'string'
        }
    ],
    datatype: "array",
    localdata: null,
}

let sourcePopup = {
    datafields: [{
        name: 'id',
        type: 'int'
    },
        {
            name: 'schoolId',
            type: 'int'
        },
        {
            name: 'filename',
            type: 'string'
        },
        {
            name: 'bankStatementDate',
            type: 'string'
        },
        {
            name: 'accountNumber',
            type: 'string'
        },
        {
            name: 'payer',
            type: 'string'
        },
        {
            name: 'purpose',
            type: 'string'
        },
        {
            name: 'noOfChanges',
            type: 'int'
        },
        {
            name: 'balance',
            type: 'string'
        },
        {
            name: 'noOfBankStatement',
            type: 'int'
        },
        {
            name: 'claims',
            type: 'string'
        },
        {
            name: 'referenceNo',
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
            name: 'currencyDate',
            type: 'string'
        },
        {
            name: 'postPaymentYn',
            type: 'string'
        },
        {
            name: 'delYn',
            type: 'string'
        }
    ],
    datatype: "array",
    localdata: null,
    updaterow: function (rowid, rowdata, commit) {
        let beforeData = originalData[rowid];
        let selectedRowData = $('#grdBankDetail').jqxGrid('getrowdata', rowid);
        if (Object.keys(beforeData).length > 0 && Object.keys(selectedRowData).length > 0) {
            if (beforeData.referenceNo === selectedRowData.referenceNo) {
                isUpdate = false;
                if (tr_update.length > 0) {
                    tr_update = tr_update.filter(item => item.referenceNo !== selectedRowData.referenceNo);
                }
                return;
            }
            if (tr_update.length > 0) {
                tr_update = tr_update.filter(item => item.referenceNo !== selectedRowData.referenceNo);
            }
            tr_update.push(selectedRowData);
            isUpdate = true;
        }

        commit(true);
    }
}
function init() {
    $("#iptFromDate").jqxDateTimeInput({
        height: SS.IPT_HEIGHT,
        width: '100%',
        formatString: "dd/MM/yyyy"
    });
    $("#iptToDate").jqxDateTimeInput({
        height: SS.IPT_HEIGHT,
        width: '100%',
        formatString: "dd/MM/yyyy"
    });
    $("#bankpopup").jqxWindow({
        isModal: true,
        autoOpen: false,
        height: 450,
        width: 900,
        theme: 'bootstrap',
        title: 'Bank Statement',
        position: 'center',
        resizable: false
    });
};

function setMinDate(time) {
    const date = new Date( time )
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = +date.getDate() +1;
    $("#iptToDate").jqxDateTimeInput('setMinDate', new Date( year, month, day));
    $("#iptToDate").jqxDateTimeInput('setDate', new Date( year, month, day));
}
function createGrid() {
    let dataAdapter = new $.jqx.dataAdapter(source);
    $("#grdBank").jqxGrid({
        source: dataAdapter,
        columns: [{
                text: 'Date',
                datafield: 'currencyDate',
                cellsformat: 'dd/MM/yyyy',
                align: 'center',
                cellsalign: 'left',
                width: '20%',
                editable: false,
            },
            {
                text: 'No of Bank Statements',
                datafield: 'noOfBankStatement',
                align: 'center',
                cellsalign: 'left',
                width: '30%',
                editable: false,
            },
            {
                text: 'Balance',
                datafield: 'balance',
                align: 'center',
                cellsalign: 'right',
                width: '20%',
                editable: false,
            },
            {
                text: 'No of Changes',
                columntype: 'textbox',
                datafield: 'noOfChanges',
                align: 'center',
                cellsalign: 'right',
                width: '20%',
                editable: false,
            },
            {
                text: 'Actions',
                align: 'center',
                width: '10%,',
                cellsrenderer: function (rowIndex, column, value) {
                    return '<div style="text-align: center; margin-top: 4px;">' +
                        '<button alt="Edit" class="btn btn-info btn-icon btn-sm" style="margin-right: 10px" onclick="onUpdate(' + rowIndex + ')"><span class="glyphicon glyphicon-edit"></span></button>'
                        '</div>';
                }
            }
        ],
        theme: 'bootstrap',
        width: '100%',
        height: 350,
        rowsheight: 33
    });
}

function ceateGridBank() {
    let dataAdapter = new $.jqx.dataAdapter(sourcePopup);
    $("#grdBankDetail").jqxGrid({
        source: dataAdapter,
        selectionmode: 'singlecell',
        editable: true,
            columns: [{
                text: 'Account Number',
                datafield: 'accountNumber',
                align: 'center',
                cellsalign: 'left',
                width: '20%',
                editable: false,
            },
            {
                text: 'Payer',
                datafield: 'payer',
                align: 'center',
                cellsalign: 'left',
                width: '30%',
                editable: false,
            },
            {
                text: 'Purpose of payment',
                datafield: 'purpose',
                align: 'center',
                cellsalign: 'right',
                width: '20%',
                editable: false,
            },
            {
                text: 'Reference Number',
                columntype: 'textbox',
                datafield: 'referenceNo',
                align: 'center',
                cellsalign: 'right',
                width: '20%',
                cellsrenderer : function (row, columnfield, value, defaulthtml, columnproperties){
                   if(!value) {
                        return '<div style="background-color: red">' + value + '</div>';
                   }
                },
                editable: true,
            },
            {
                text: 'Amount',
                columntype: 'textbox',
                datafield: 'amount',
                align: 'center',
                cellsalign: 'right',
                width: '20%',
                editable: false,
            },
        ],
        theme: 'bootstrap',
        width: '100%',
        height: 300,
        rowsheight: 20
    });
}

function onSearch() {
    let params = {
        toDate:  $("#iptToDate").val(),
        fromDate: $("#iptFromDate").val()
    }
    SS.sendToServer(
        'BSA_R_01',
        false,
        params,
        function onSuccess(data) {
            source.localdata = data.lst;
            $("#grdBank").jqxGrid({ source: source });
        },

        function onError(err) {
            SS.alert( SS.title.ERROR, SS.message.ERROR);
        }
    );
}
function onUpdate (rowIndex) {
    let data = $("#grdBank").jqxGrid('getrowdata', rowIndex);
    let id = data.id;
    if (id != null) {
        $("#bankpopup").jqxWindow('open', popup(id));
    }
}

 function popup(id) {
    if (id != null) {
        SS.sendToServer(
            'BSA_R_02',
            false,
            { id : id },
            function onSuccess(data) {
                sourcePopup.localdata = data.lst;
                originalData = data.lst;
                $('#grdBankDetail').jqxGrid('updatebounddata');
            }
        );
    }

}

function onSave() {
    if (!isUpdate) {
        SS.alert('Notification', 'No data update')
        return;
    }
    let data = tr_update[0];
    SS.sendToServer(
        'BSA_U_01',
        false,
        data,
        function onSuccess(data) {
            $("#bankpopup").jqxWindow('close')
            onSearch();
        }
    );
            // $("#btnPayment").prop('disabled', false);
}




$(document).ready(function () {
    init();
    createGrid();
    ceateGridBank()
    setMinDate($("#iptFromDate").val('date'));
    $('#iptFromDate').on('valueChanged', function (event)
    {
        const jsDate = event.args.date;
        setMinDate(jsDate)
    });
    $('#btnStdSrch').click(function () {
        $('#grdBank').jqxGrid('refresh');
        onSearch();
    });

    $('#btnSave').click(function () {
        onSave()
    });

})

