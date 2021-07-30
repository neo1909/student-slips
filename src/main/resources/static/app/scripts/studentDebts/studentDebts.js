let originalData = [];
let tr_update = [];
let isUpdate = false;
let arrService = [];
let currentIndex = "";

let source = {
    datafields: [
        {
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
        if(Object.keys(beforeData).length > 0 && Object.keys(selectedRowData).length > 0) {
            if(beforeData.quantity ===  selectedRowData.quantity) {
                isUpdate = false;
                if(tr_update.length > 0) {
                    tr_update = tr_update.filter(item => item.quantity !== selectedRowData.quantity);
                }
                return;
            }
            if(tr_update.length > 0) {
                tr_update = tr_update.filter(item => item.quantity !== selectedRowData.quantity);
            }
            tr_update.push(selectedRowData);
            isUpdate = true;
        }

        commit(true);
    }
};

function createGrid () {
    let dataAdapter = new $.jqx.dataAdapter(source);
    $("#grdStudentDebts").jqxGrid({
        source: dataAdapter,
        selectionmode: 'singlecell',
        editable: true,
        columns: [
            {
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
        source: SS.clazzEmpty,
        selectedIndex: 0,
        height: SS.IPT_HEIGHT,
        width: '100%',
        dropDownHorizontalAlignment: 'right'
    });

    $("#iptComment").jqxTextArea({
        width: 450,
        height: 100,
        placeHolder: 'Enter a sentence...'
    });

}

function onSearch () {
    let params = {
        grade: $("#cmbStdGradeSrch").val() ? $("#cmbStdGradeSrch").val() : "",
        sClass: $("#cmbStdClazzSrch").val() ? $("#cmbStdClazzSrch").val() : "",
        serviceId: $("#cmbStdServiceSrch").val() ? $("#cmbStdServiceSrch").val() : "",
        price : $("#iptPriceSrch").val(),
        suppliersId : "1"
    };
    // source.localdata = data;
    // originalData = data
    $("#grdStudentDebts").on('cellvaluechanged', function (event) {
        let args = event.args;
        let datafield = args.datafield;
        let rowIndex = args.rowindex;
        let value = +args.newvalue;
        let selectedRowData = $('#grdStudentDebts').jqxGrid('getrowdata', rowIndex);
        let price = +selectedRowData.price
        if(datafield === 'quantity') {
            $("#grdStudentDebts").jqxGrid('setcellvalue', rowIndex, "amountDebt", value* price);
        }
    });
    $('#grdStudentDebts').jqxGrid('updatebounddata');
    SS.sendToServer(
        'SD_R_02',
        false,
        params,
        function onSuccess(data) {
            source.localdata = data.lst;
            originalData =  data.lst;
            $('#grdStudentDebts').jqxGrid('updatebounddata');
        },

        function onError(err) {
            SS.alert(SS.title.ERROR, SS.message.ERROR);
        }
    );
}

function onGetService() {
    return new Promise(resolve => {
        SS.sendToServer(
            'SL_R_02',
            false,
            {},
            function onSuccess(data) {
                resolve(data)
            },
            function onError(err) {
                SS.alert(SS.title.ERROR, SS.message.ERROR);
            }
        )
    })
}

$(document).ready(function () {
    onGetService().then(value =>{
        if(value && value.lst) {
            $("#cmbStdServiceSrch").jqxDropDownList({
                enableBrowserBoundsDetection: true,
                source:[{},...value.lst],
                displayMember: "serviceName", valueMember: "serviceId",
                selectedIndex: 0,
                height: SS.IPT_HEIGHT,
                width: '100%',
                dropDownHorizontalAlignment: 'right'
            });
            arrService = [...value.lst]
            init();
            createGrid();
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
                if(datafield === 'quantity') {
                    $("#grdStudentDebts").jqxGrid('setcellvalue', rowIndex, "amountDebt", value* price);
                }
            });
            $('#cmbStdServiceSrch').on('change', function (event){
                $("#iptPriceSrch").val(event.args.item.originalItem.price ?event.args.item.originalItem.price: "" );
                currentIndex =  +$('#cmbStdServiceSrch').jqxDropDownList('selectedIndex');
            })

            $('#btnSave').on('click', function (){
                if(!isUpdate) {
                    SS.alert('Notification', 'No data update')
                    return;
                }
               let data = {
                   suppliersId: arrService[currentIndex-1] ? arrService[currentIndex-1].suppliersId : "",
                   serviceId: $('#cmbStdServiceSrch').val(),
                   grade : $('#cmbStdGradeSrch').val(),
                   sClass: $('#cmbStdClazzSrch').val(),
                   price:  $("#iptPriceSrch").val(),
                   debitDate:$("#iptDateSrch").val(),
                   purpose: $('#iptComment').val(),
                   studentsDebtsList: tr_update
               }
               SS.sendToServer(
                   'SD_C_01',
                   false,
                   data,
                   function onSuccess(data) {
                      onSearch();
                      isUpdate =  false;
                   }
               );

            })
        }
    })
})