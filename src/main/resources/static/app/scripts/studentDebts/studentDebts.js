
const data = [{
    studentId: '1',
    schoolId:2,
    suppliersId: 1,
    serviceId:1,
    referenceNo: 'ABC',
    quantity:1,
    purpose: 'Eating',
    debitDate:'19/9/2020',
    amountDebt: '2,000,000',
    sClass:1,
    grade:1,
    delYn: '',
    insertId: 1,
    insertDate:''   ,
    updateId:0,
    updateDate: '',
    nameStudent: 'Teddy',
}];

var source = {
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
        }
    ],
    datatype: "array",
    localdata: null, // đoạn này a fix cứng thì okie
    updaterow: function (rowid, rowdata, commit) {
        // synchronize with the server - send update command
        commit(true);
    }
};

function createGrid () {
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
                text: 'ServiceId',
                datafield: 'serviceId',
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
                datafield: '',
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
        sclass: $("#cmbStdClazzSrch").val() ? $("#cmbStdClazzSrch").val() : "",
        serviceId: $("#cmbStdServiceSrch").val() ? $("#cmbStdServiceSrch").val() : ""
    };
    source.localdata = data
    $('#grdStudentDebts').jqxGrid('updatebounddata');
    // SS.sendToServer(
    //     'SD_R_01',
    //     false,
    //     params,
    //     function onSuccess(data) {
    //         fn.gridSource.localdata = data.lst;
    //         $("#grdStudentDebts").jqxGrid({
    //             source: fn.gridSource
    //         });
    //     },
    //
    //     function onError(err) {
    //         SS.alert(SS.title.ERROR, SS.message.ERROR);
    //     }
    // );
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
        if(value) {
            $("#cmbStdServiceSrch").jqxDropDownList({
                enableBrowserBoundsDetection: true,
                source:[{},...value.lst],
                displayMember: "serviceName", valueMember: "suppliersId",
                selectedIndex: 0,
                height: SS.IPT_HEIGHT,
                width: '100%',
                dropDownHorizontalAlignment: 'right'
            });
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
                let price = 2000
                if(datafield == 'quantity') {
                    $("#grdStudentDebts").jqxGrid('setcellvalue', rowIndex, "amountDebt", value* price);
                }
            });
            $('#cmbStdServiceSrch').on('change', function (event){
                $("#iptPriceSrch").val(event.args.item.originalItem.price ?event.args.item.originalItem.price: "" );
            })
        }
    })
})