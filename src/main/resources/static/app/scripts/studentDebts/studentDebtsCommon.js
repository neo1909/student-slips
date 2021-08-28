let originalData = [];
let tr_update = [];
let isUpdateNote = false;
let selectedSupplierId = 0;
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
            type: 'number'
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
                if (tr_update.length > 0) {
                    tr_update = tr_update.filter(item => item.referenceNo !== selectedRowData.referenceNo);
                }
                
                return;
            }
            if (tr_update.length > 0) {
                tr_update = tr_update.filter(item => {
                	if (item.referenceNo === selectedRowData.referenceNo) {                		
                		return (item.referenceNo !== selectedRowData.referenceNo);
                	} else {
                		return true;
                	}
                });
            }
            tr_update.push({
            	quantity: selectedRowData.quantity,
            	amountDebt: selectedRowData.amountDebt,
            	studentId: selectedRowData.studentId,
            	referenceNo: selectedRowData.referenceNo,
            	id: selectedRowData.id,
            	taskId: selectedRowData.taskId
            });
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
                cellsalign: 'center',
                width: '16,6667%',
                editable: false,
            },
            {
                text: 'Reference No',
                datafield: 'referenceNo',
                align: 'center',
                cellsalign: 'center',
                width: '16,6667%',
                editable: false,
            },
            {
                text: 'Service',
                datafield: 'nameService',
                align: 'center',
                cellsalign: 'center',
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
                cellsalign: 'right',
                width: '16,6667%',
                editable: false,
                cellsformat: 'd2'
            },
            {
                text: 'Amount of debit',
                datafield: 'amountDebt',
                columntype: 'textbox',
                align: 'center',
                cellsalign: 'right',
                editable: false,
                cellsformat: 'd2'
            },
        ],
        theme: 'bootstrap',
        width: '100%',
        height: 350,
        rowsheight: 33
    });
    let localizationobj = {
    	currencysymbol: "",
		decimalseparator: ",",
		thousandsseparator: "."
    }
    $("#grdStudentDebts").jqxGrid('localizestrings', localizationobj);
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
        source: SS.dataSource.grade('All'),
        displayMember: 'name',
        valueMember: 'id',
        selectedIndex: 0,
        height: SS.IPT_HEIGHT,
        width: '100%',
        dropDownHorizontalAlignment: 'right'
    });
    $("#cmbStdClazzSrch").jqxDropDownList({
        enableBrowserBoundsDetection: true,
        source: SS.dataSource.clazz('All'),
        displayMember: 'name',
        valueMember: 'id',
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
    $("#cmbStdInstSrch").jqxDropDownList({
        enableBrowserBoundsDetection: true,
        height: SS.IPT_HEIGHT,
        width: '100%',
        dropDownHorizontalAlignment: 'right',
        disabled: true
    });

    $("#iptComment").jqxTextArea({
        width: 450,
        height: 100,
        placeHolder: 'Enter note on the purpose of the payment...'
    });
}

$(document).ready(function() {
	init();
	createGrid();
	
    $("#grdStudentDebts").on('cellvaluechanged', function (event) {
        let args = event.args;
        let datafield = args.datafield;
        let rowIndex = args.rowindex;
        let value = +args.newvalue;
        let selectedRowData = $('#grdStudentDebts').jqxGrid('getrowdata', rowIndex);
        let price = +selectedRowData.price
        if (datafield === 'quantity') {
            if (value < 0) $("#grdStudentDebts").jqxGrid('setcellvalue', rowIndex, "quantity", value * (-1));
            $("#grdStudentDebts").jqxGrid('setcellvalue', rowIndex, "amountDebt", (value < 0) ? (value * price * (-1)) : (value * price));
        }
    });
    
    $("#iptComment").on("change", function() {
        if (updateTaskOriginalData.note !== $("#iptComment").val()) {
        	isUpdateNote = true;
        } else {
        	isUpdateNote = false;
        }
    });
    

    $('#btnPrint').on('click', function() {
    	let studentsInfo = [];
    	SS.sendToServer(
	        'ST_R_03',
	        false,
	        {},
	        function onSuccess(data) {
	        	if (data && data.lst) {
	        		studentsInfo.push(...data.lst);
	        	}
	        }
	    );
    	let paymentPurpose = $("#iptComment").val();
    	
    	let rows = $("#grdStudentDebts").jqxGrid('getrows');
        let newWindow = window.open('', '', 'width=800, height=500'),
        document = newWindow.document.open(),
        pageContent =
            `<!DOCTYPE html>
            <html><head>
			    <link href="https://fonts.googleapis.com/css?family=Oxygen+Mono" rel="stylesheet" type="text/css">
			        <style>
			            @media print {
			                * {-webkit-print-color-adjust:exact;}
			                #buttonPanel, .note {
			                    display: none;
			                }
			                body, .invoice {
			                    margin: 0;
			                }
			            }
			            body {
			                font-family: Arial,Verdana,Helvetica,Clean,Sans-serif;
			                font-size: 13px;
			                background: #fff;
			                margin: 0;
			            }
			            input[type='button'] {
			                border: 1px solid #B3B3B3;
			                -moz-border-radius: 3px;
			                -webkit-border-radius: 3px;
			                cursor: pointer;
			                padding-top: 7px;
			                padding-bottom: 7px;
			                padding-left: 30px;
			                padding-right: 7px;
			                width: 100px;
			            }
			            .btnPrint {
			                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gMNDwcSCt1XLQAAAcBJREFUOMudkc9rE1EQgL/NLqw5lBI8efIvEX+VttgEf0Qp1lIteFOESkXFi4hiLcGAeLAHEa0VRDxIKViI2oNn/4lEyVLC0mzbfVN253loElqqafSDxxveMB9vZhx2UPn2eSVN06N0wXXd7wPHh4/8MblcWbKqav+GqtrlypLdWeO1g/GJsRkRwXEcXr1+2Xq1u67JK1cREcYnxmbevnl3ByDTFjSj9el6PQCgWDyPVUXVbh+rnDl7DoB6PaAZrU+36zqCcC1yg2BbIGLIFwpYq1irjOTziBgAgiAgXIvcTgulp0+mVPWRqlKr1QAwYgDL4NAQFouIwbbaCOoBI8MDFE4NbmYymXvObOnx5o3rU1nf9ymcLtALi58WERGePS/Hnqpmfd8nDBvERjhx8ljX4q9fVgjDBrncQVQ129mCkZjYbFGt/eoqiM0WRuK9azRiiI1Qrf7cRyCtGe0RxKSq+/4A4MCPF3C4tFuQasrC/FxPQ2wAh1qxc/HSqCZJ4riui+PQM0mS4nme9VYbIbn+Pm7fvcXlyWs9FS/Mz/Hg/kNWGyFeM9oo5/r7brYT/0Iz2ig7ABdGi5b/4MP7j85vbBz7ujm/MAgAAAAASUVORK5CYII=') no-repeat scroll 7px 7px;
			            }
			            .btnEnd {
			                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKcSURBVDiNdZNPaBRJFMZ/r6q6u3qyg3uIHowg6s5hL+JFQYUQ0atoUMOq5CgeDCwaD5K7Lh724B+MoFdFUC+eRFAUJGoEhRUc3R13QiZsQGeiyfRkOp3uqT3EGf8/+Kh6l69+Xz2eHBzcfzJJkhF+UCKC7/vYwGKMARGyLMUG9s+zZ86fMEmSjPTv2kO5XCaKIhqNBs1mkziOSdOUCxfOo5RCa4NSCoBm3OTsuTPDwGkDEAQBQRCQJAlpmtJqtXDOobUGQCmNMeZjL2ht6FnZA5BXAPl8njAMyeVyhGHYuVtrAUEERBSl0Ys82L4dEcHaEMCYdk5rLc65Tm4RQSmFCLgs49nRIbJqlQ/FIvW/X8N/0/wzOtptlhAVWmu01vi+T5ZlHbO0XufJ/oN0FwqsHhggLpcZ37uPZckCT8sT9zoEbROlVEc2injY28faHTtYvm4d6fQ06w8dAhHEGO4cPrwUoU3Rltaa3NQUq27epLBzJz8ZQ3T/Pii1JBHyfX2IUnQM2q+3z+5bt1hdKGDjmOj5c1pxTKvRoDU/j+7qIlizBkRQnxN8HuHt4CBvXr1iulhEhSGLlQrZ3BwuTcnqdZJKBZdlnwja/9A2SlasYOrIEXI3rhM3m6zcsAEdhiwuLNBSivlqFZyTDsH3ppGGIbe3bMEVfqFcqZBEEX+Nj/Pv5CQvii/xurqefmFgjOloYmKCwPoMDR/j18uXWNa/m9elEtpaNj4eY/L4MPuiqP+LCJ7nUXpTwoY+vx0YIJ/Po7UmatRZ/vsQsqqH2bt3mZ37QLX2DmDeAHieR61WJVlcYPPWTXiej3Mt5uqzgHzazG29/Lytl/fva8zMzCwZ+L5/6uq1KyO1WhURYezR2Dfr/HU55wiC4A8g/R8/Pf1dkwClZQAAAABJRU5ErkJggg==') no-repeat scroll 7px 7px;
			            }
			            .invoice{
			                display:block;position:relative;left:0;height: 325px;
			                background-image:url('data:image/gif;base64,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');
			                background-repeat:no-repeat;margin:10px;
			                width: 850px;
			                background-size: 850px auto;}
			            .name{position:absolute;left:24px;top:30px;width:380px}
			            .address{position:absolute;left:24px;top:47px;width:380px}
			            .paymentPurpose{position:absolute;left:24px;top:113px;width:380px}
			            .institution{position:absolute;left:24px;top:189px;width:380px}
			            .paymentCode{position:absolute;left:446px;top:46px;font-family:'Oxygen Mono',sans-serif}
			            .currency{position:absolute;left:496px;top:47px}
			            .amount{position:absolute;top:45px;right:22px;font-family:'Oxygen Mono',sans-serif}
			            .account{position:absolute;left:446px;top:94px;font-family:'Oxygen Mono',sans-serif}
			            .model{position:absolute;left:446px;top:147px;font-family:'Oxygen Mono',sans-serif}
			            .referenceNumber{position:absolute;left:499px;top:146px;font-family:'Oxygen Mono',sans-serif}
			            .currencyDate{position:absolute;left:460px;top:271px;}
			            .note {
			                margin: 10px;
			            }
			            .ips-qr-code img {
			                width: 100%;
			                margin-top: -2px;
			            }
			            .ips-qr-code {
			                position: absolute;
			                bottom: 10px;
			                right: 10px;
			                width: 135px;
			            }
			            .ips-qr-code span {
			                display: inline-block;
			                text-align: center;
			                width: 100%;
			                font-size: 10px;
			            }
			            #buttonPanel {
			                margin: 10px;
			            }
			        </style>
			    </head>
			    <body cz-shortcut-listen="true">`
        	;
        
        for (let i = 0 ; i < rows.length; i++) {
        	const student = studentsInfo.find(s => rows[i].studentId == s.id);
        	pageContent += `
			<div class="invoice">
        		<label class="name">
			        ${rows[i].nameStudent}
			    </label>
			    <label class="address">
			        
			    </label>
			    <label class="paymentPurpose">
			        ${paymentPurpose}
			    </label>
			    <label class="institution">
			        ${student ? student.schoolName: ''}
			    </label>
			    <label class="paymentCode">
			        121
			    </label>
			    <label class="amount">
			        ${rows[i].amountDebt}
			    </label>
			    <label class="account">
			        ${student ? student.schoolAccountNumber : ''}
			    </label>
			    <label class="model">
			        97
			    </label>
			    <label class="referenceNumber">
			        ${rows[i].referenceNo}
			    </label>
			    <label class="currencyDate">
			        EMPTY_FIELD
			    </label>
			    <label class="currency">
			        RSDS
			    </label>
        	`;
        	pageContent += '<div style="break-after: always"></div>';
        }
        pageContent += '</body></html>'
        document.write(pageContent);
        document.close();
        newWindow.print();
    });
});