let originalData = [];
let tr_update = [];
let isUpdate = false;
let selectedSupplierId = 0;
let screenType = "I";
let taskId = 0;
let updateTaskOriginalData = [];

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
            type: 'number'
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
        },
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'taskId',
            type: 'int'
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
            tr_update.push({
            	quantity: selectedRowData.quantity,
            	amountDebt: selectedRowData.amountDebt,
            	studentId: selectedRowData.studentId,
            	referenceNo: selectedRowData.referenceNo,
            	id: selectedRowData.id,
            	taskId: selectedRowData.taskId
            });
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
                cellsformat: 'd'
            },
            {
                text: 'Price',
                datafield: 'price',
                align: 'center',
                cellsalign: 'center',
                width: '16,6667%',
                editable: false,
                cellsformat: 'd'
            },
            {
                text: 'Amount of debit',
                datafield: 'amountDebt',
                columntype: 'textbox',
                align: 'center',
                cellsalign: 'right',
                editable: false,
                cellsformat: 'd'
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
    
    $('#btnPrint').prop("disabled", true);

	taskId = $("#iptTaskId").val() > 0 ? $("#iptTaskId").val() : 0;
	
    if (taskId > 0) {
    	screenType = 'U';
    	$("#screen-title").html("Student Debts: Update task ID = " + taskId);
    	onSearchUpdate();
        $(".search-condition-panel").hide();
		$("#btnCancelUpdate").show();
		$("#btnStdSrch").remove();
		
		SS.sendToServer(
	        'TA_R_01',
	        false,
	        { taskId: taskId },
	        function onSuccess(data) {
	        	if (data && data.lst && data.lst.length > 0) {	        		
	        		updateTaskOriginalData = data.lst[0];
	        		$("#iptComment").val(updateTaskOriginalData.note);
	        	}
	        },
	        function onError(err) {
	            SS.alert( SS.title.ERROR, "Failed to get task data");
	        }
	    );
    } else {
    	screenType = 'I';
		$("#btnCancelUpdate").remove();
		$("#btnStdSrch").show();
    }
}

function onSearchUpdate() {
	tr_update = [];
    SS.sendToServer(
    	'SD_R_01',
        false,
        { taskId: taskId },
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

function onSearch() {
	tr_update = [];
    let params = {
        grade: $("#cmbStdGradeSrch").val() ? $("#cmbStdGradeSrch").val() : "",
        sClass: $("#cmbStdClazzSrch").val() ? $("#cmbStdClazzSrch").val() : "",
        serviceId: $("#cmbStdServiceSrch").val() ? $("#cmbStdServiceSrch").val() : "",
        price: $("#iptPriceSrch").val(),
    };
    if(!params.serviceId) {
        SS.alert('Notification', 'Please select service')
        return;
    }
    SS.sendToServer(
    	'SD_R_02',
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

function onGetService(gradeId) {
    SS.sendToServer(
        'SL_R_03',
        false, {
            grade: gradeId,
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
    
    init();
    createGrid();
    
    if (screenType == 'I') {
        $('#btnStdSrch').click(function () {
            $('#grdStudentDebts').jqxGrid('refresh');
            onSearch();
        });

        $('#cmbStdGradeSrch').on('change', function (event) {
            if (event.args && event.args.item) {
                const gradeId = event.args.item.originalItem
                onGetService(gradeId);
            }
        })

        $('#cmbStdServiceSrch').on('change', function (event) {
        	let priceItem = event.args.item.originalItem.price ? event.args.item.originalItem.price : "";
        	$("#iptPriceSrch").val(priceItem);
        	selectedSupplierId = event.args.item.originalItem.supplierId ? event.args.item.originalItem.supplierId : 0;
        });
    } else {
        $("#btnCancelUpdate").on('click', function() {
        	 localStorage.removeItem('task');
             window.location.href = "/archive/task-archive";
        });
    }

    $("#btnApplyToAll").on('click', function() {
    	let rows = $("#grdStudentDebts").jqxGrid('getrows');
    	for (let i=1 ; i<rows.length; i++) {
            $("#grdStudentDebts").jqxGrid('setcellvalue', i, "quantity", rows[0].quantity);
    	}
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
    
    $("#iptComment").on("change", function() {
        if (updateTaskOriginalData.note !== $("#iptComment").val()) {
        	isUpdate = true;
        }
    });
    
    $('#btnPrint').on('click', function() {    	
    	let gridContent = $("#grdStudentDebts").jqxGrid('exportdata', 'html');
        let newWindow = window.open('', '', 'width=800, height=500'),
        document = newWindow.document.open(),
        pageContent =
            '<!DOCTYPE html>\n' +
            '<html>\n' +
            '<head>\n' +
            '<meta charset="utf-8" />\n' +
            '<title>Posting > Students Debts</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '<div>\n' + gridContent + '\n</div>' +
            '\n</body>\n</html>';
        document.write(pageContent);
        document.close();
        newWindow.print();
    });

    $('#btnSave').on('click', function () {
        if (!isUpdate) {
            SS.alert('Notification', 'No data update')
            return;
        }
        if(screenType == 'U') {
            let params = {
            	taskId: taskId,
            	purpose: $("#iptComment").val(),
                studentsDebtsList: tr_update
            }
            SS.sendToServer(
                'SD_U_01',
                false,
                params,
                function onSuccess(data) {
                    localStorage.removeItem('task');
                    $('#btnPrint').prop("disabled", false);
                    SS.alert('Notification', 'Update task successfully');
                }
            );
        } else {
            let data = {
            	suppliersId: selectedSupplierId,
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
                    $('#btnPrint').prop("disabled", false);
                    SS.alert('Notification', 'Save task successfully');
                }
            );
        }

    });
    
})