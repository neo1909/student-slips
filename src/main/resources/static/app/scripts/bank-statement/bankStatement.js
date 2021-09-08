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
            type: 'date'
        },
        {
            name: 'payerAccount',
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
            type: 'number'
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
        },
        {
            name: 'isHightLight',
            type: 'int'
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
            type: 'date'
        },
        {
            name: 'payerAccount',
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
            type: 'number'
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
        },
        {
            name: 'isHightLight',
            type: 'int'
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
    const day = +date.getDate();
    $("#iptToDate").jqxDateTimeInput('setMinDate', new Date( year, month, day));
}
function createGrid() {
    let dataAdapter = new $.jqx.dataAdapter(source);
    $("#grdBank").jqxGrid({
        source: dataAdapter,
        pageable: true,
        columns: [{
                text: i18n.lang.common.vld_date,
                datafield: 'bankStatementDate',
                cellsformat: 'dd.MM.yyyy',
                align: 'center',
                cellsalign: 'center',
                width: '20%',
                editable: false,
            },
            {
                text: i18n.lang.common.vld_noOfBankstatement,
                datafield: 'noOfBankStatement',
                align: 'center',
                cellsalign: 'right',
                width: '30%',
                editable: false,
                cellsformat: 'd',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties) {
                	let rowData = $("#grdBank").jqxGrid("getrowdata", row);
                	let isHighlight = rowData.isHightLight;
                	if (isHighlight == 0) {
                		return '<div style="background-color: #FF4848; color: #FFF; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + value + '</div>';
					}
                }
            },
            {
                text: i18n.lang.common.vld_balance,
                datafield: 'balance',
                align: 'center',
                cellsalign: 'right',
                width: '20%',
                editable: false,
                cellsformat: 'd2'
            },
            {
                text: i18n.lang.common.vld_noOfChanges,
                columntype: 'textbox',
                datafield: 'noOfChanges',
                align: 'center',
                cellsalign: 'right',
                width: '20%',
                editable: false,
                cellsformat: 'd'
            },
            {
                text: i18n.lang.common.vld_actions,
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
        height: SS.grid.height,
        rowsheight: 33
    });
    $("#grdBank").jqxGrid('localizestrings', SS.grid.localization);
}

function ceateGridBank() {
    let dataAdapter = new $.jqx.dataAdapter(sourcePopup);
    $("#grdBankDetail").jqxGrid({
        source: dataAdapter,
        selectionmode: 'singlecell',
        pageable: true,
        editable: true,
            columns: [{
                text: i18n.lang.common.vld_accountNumber,
                datafield: 'payerAccount',
                align: 'center',
                cellsalign: 'left',
                width: '20%',
                editable: false,
            },
            {
                text: i18n.lang.common.vld_payer,
                datafield: 'payer',
                align: 'center',
                cellsalign: 'left',
                width: '30%',
                editable: false,
            },
            {
                text: i18n.lang.common.vld_purposeOfPayment,
                datafield: 'purpose',
                align: 'center',
                cellsalign: 'right',
                width: '20%',
                editable: false,
            },
            {
                text: i18n.lang.common.vld_referenceNumber,
                columntype: 'textbox',
                datafield: 'referenceNo',
                align: 'center',
                cellsalign: 'right',
                width: '20%',
                editable: true,
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties) {
                	let rowData = $("#grdBankDetail").jqxGrid("getrowdata", row);
                	let isHighlight = rowData.isHightLight;
                	if (isHighlight == 0) {
                		return '<div style="background-color: #FF4848; color: #FFF; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + value + '</div>';
					}
                }
            },
            {
                text: i18n.lang.common.vld_amount,
                columntype: 'textbox',
                datafield: 'claims',
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
    if (data) {
        $("#bankpopup").jqxWindow('open', popup(data));
    }
}

 function popup(dataGrid) {

     const dateTmp = new Date(dataGrid.bankStatementDate);
     const mnth = ("0" + (dateTmp.getMonth() + 1)).slice(-2);
     const day = ("0" + dateTmp.getDate()).slice(-2);
     const dateFinal = [dateTmp.getFullYear(), mnth, day].join("-");

     SS.sendToServer(
            'BSA_R_02',
            false,
            { filename : dataGrid.filename ,
                bankStatementDate : dateFinal},
            function onSuccess(data) {
                sourcePopup.localdata = data.lst;
                originalData = data.lst;
                $('#grdBankDetail').jqxGrid('updatebounddata');
            }
        );

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
        	tr_update = [];
            $("#bankpopup").jqxWindow('close')
            onSearch();
        }
    );
}




$(document).ready(function () {
    init();
    createGrid();
    ceateGridBank();
    const date = new Date()
    const year = date.getFullYear();
    let month = date.getMonth();
    const day = +date.getDate();
    $("#iptFromDate").jqxDateTimeInput('setDate', new Date( year, month-1, day));
//     setMinDate($("#iptFromDate").val('date'));
//     $('#iptFromDate').on('valueChanged', function (event)
//     {
//         const jsDate = event.args.date;
//         setMinDate(jsDate)
//     });
    
	onSearch();
	
    $('#btnStdSrch').click(function () {
        $('#grdBank').jqxGrid('refresh');
        onSearch();
    });
    
	$(document).on('keypress', function(e) {
    	if (e.keyCode == 13) {
    		e.preventDefault();
    		onSearch();
    	}
    });

    $('#btnSave').click(function () {
    	SS.confirm(SS.title.CONFIRM, i18n.lang.archive.bankstatement.msg_confirmSaveAndPost, function (result) {
            if (result) {
                onSave()
            }
        });
    });

})

