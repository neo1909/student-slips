let sourceMaster = {
    datafields: [{
        name: 'id',
        type: 'int'
        },
        {
            name: 'studentId',
            type: 'int'
        },
        {
            name: 'nameStudent',
            type: 'string'
        },
        {
            name: 'serviceId',
            type: 'int'
        },
        {
            name: 'nameService',
            type: 'string'
        },
        {
            name: 'debit',
            type: 'int'
        },
        {
            name: 'claims',
            type: 'int'
        },
        {
            name: 'balance',
            type: 'int'
        },
        {
            name: 'isHightColor',
            type: 'int'
        },
        {
            name: 'serviceListString',
            type: 'string'
        }
    ],
    datatype: "array",
    localdata: null
}

let sourceDetail = {};

let originalServiceIdList = [];
let checkedAllServices = false;

function init() {
	sourceDetail = JSON.parse(JSON.stringify(sourceMaster));
	
    $("#iptSrchFromDate").jqxDateTimeInput({
        height: SS.IPT_HEIGHT,
        width: '100%',
        formatString: "dd/MM/yyyy"
    });
    $("#iptSrchToDate").jqxDateTimeInput({
        height: SS.IPT_HEIGHT,
        width: '100%',
        formatString: "dd/MM/yyyy"
    });
    
    SS.sendToServer('SV_R_01', false, {}, function onSuccess(data) {
    	let src = [];
		if (data && data.lst) src = [...data.lst];
		originalServiceIdList = data.lst.map(i => i.id);
		src.unshift({id: "", name: "All"});
		$("#iptSrchService").jqxComboBox({ source: src, displayMember: "name", valueMember: "id", height: SS.IPT_HEIGHT, width: '100%', checkboxes: true});
	});
    
    let dataClass = [];
    for (let i=1; i<=8; i++) {
    	for (let j=1; j<=16; j++) {
    		dataClass.push(i + "/" + j);
    	}
    }
    
    $("#iptSrchClass").jqxDropDownList({ source: dataClass, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%' });

};
function setMinDate(time) {
    const date = new Date( time )
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = +date.getDate() +1;
    $("#iptSrchToDate").jqxDateTimeInput('setMinDate', new Date( year, month, day));
    $("#iptSrchToDate").jqxDateTimeInput('setDate', new Date( year, month, day));
}
function createGrid() {
    let dataAdapter = new $.jqx.dataAdapter(sourceMaster, {
        loadComplete: function (data) {
        },

        loadError: function (xhr, status, error) {
        }
    });
    
    $("#grdOverviewClass").jqxGrid({
        source: dataAdapter,
        columns: [{
                text: 'Name and surname',
                datafield: 'studentId',
                displayfield: 'nameStudent',
                align: 'center',
                cellsalign: 'center',
                width: '20%',
                editable: false,
            },
            {
                text: 'Services',
                datafield: 'serviceListString',
                align: 'center',
                cellsalign: 'center',
                width: '35%',
                editable: false,
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties) {
                	if (value == 'Total') {
                		return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%;text-align: ' + columnproperties.cellsalign + '; color:red; "><b>Total</b></div>';
                	}
                	return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + value + '</div>';
                }
            },
            {
                text: 'Debit',
                datafield: 'debit',
                align: 'center',
                cellsalign: 'right',
                width: '15%',
                editable: false,
                cellsformat: 'd'
            },
            {
                text: 'Claims',
                datafield: 'claims',
                align: 'center',
                cellsalign: 'right',
                width: '15%',
                editable: false,
                cellsformat: 'd'
            },
            {
                text: 'Balance',
                datafield: 'balance',
                align: 'center',
                cellsalign: 'right',
                width: '15%',
                editable: false,
                cellsformat: 'd',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties) {
                	let formatValue = value.toLocaleString().replace(/\./g, ",");
                	if (value && value > 0) {
                		return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + formatValue + '</div>';
					} else {
						return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; background-color: green; color: white">' + formatValue + '</div>';
					}
                }
            }
        ],
        theme: 'bootstrap',
        width: '100%',
        height: 350,
        rowsheight: 33,
        selectionmode: 'none'
    });
}

function createGridDetail() {
    let dataAdapter = new $.jqx.dataAdapter(sourceDetail);
    $("#grdOverviewClassDetail").jqxGrid({
        source: dataAdapter,
        editable: true,
            columns: [{
                text: 'Name and surname',
                datafield: 'studentId',
                displayfield: 'nameStudent',
                align: 'center',
                cellsalign: 'center',
                width: '20%',
                editable: false,
            },
            {
                text: 'Services',
                datafield: 'serviceId',
                displayfield: 'nameService',
                align: 'center',
                cellsalign: 'center',
                width: '35%',
                editable: false,
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties) {
                	if (value == -1) {
                		return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%;text-align: ' + columnproperties.cellsalign + '; color:red; "><b>Total</b></div>';
                	}
                	return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + value + '</div>';
                }
            },
            {
                text: 'Debit',
                datafield: 'debit',
                align: 'center',
                cellsalign: 'right',
                width: '15%',
                editable: false,
                cellsformat: 'd'
            },
            {
                text: 'Claims',
                datafield: 'claims',
                align: 'center',
                cellsalign: 'right',
                width: '15%',
                editable: false,
                cellsformat: 'd'
            },
            {
                text: 'Balance',
                datafield: 'balance',
                align: 'center',
                cellsalign: 'right',
                width: '15%',
                editable: false,
                cellsformat: 'd',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties) {
                	let formatValue = value.toLocaleString().replace(/\./g, ",");
                	if (value && value > 0) {
                		return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + formatValue + '</div>';
					} else {
						return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; background-color: green; color: white">' + formatValue + '</div>';
					}
                }
            },
        ],
        theme: 'bootstrap',
        width: '100%',
        height: 300,
        rowsheight: 33
    });
}

function onCalculateTotal(gridId) {
	
	let totalDebit = 0;
	let totalClaims = 0;
	let totalBalance = 0;
	let allRows = $(gridId).jqxGrid('getrows');
	if (allRows.length > 0) {
		allRows.forEach(row => {
			totalDebit += row.debit;
			totalClaims += row.claims;
			totalBalance += row.balance;
		});
		
		console.log(totalDebit +":" + totalClaims + ":" + totalBalance);

		if (gridId === '#grdOverviewClass') {
			$("#grdMaster-debit").html(Number(totalDebit).toLocaleString());
			$("#grdMaster-claims").html(Number(totalClaims).toLocaleString());
			$("#grdMaster-balance").html(Number(totalBalance).toLocaleString());
		} else {
			$("#grdDetail-debit").html(Number(totalDebit).toLocaleString());
			$("#grdDetail-claims").html(Number(totalClaims).toLocaleString());
			$("#grdDetail-balance").html(Number(totalBalance).toLocaleString());
		}
		
	}
}

function onSearch() {
	
	$("#grdMaster-debit").html(0);
	$("#grdMaster-claims").html(0);
	$("#grdMaster-balance").html(0);
	$("#grdDetail-debit").html(0);
	$("#grdDetail-claims").html(0);
	$("#grdDetail-balance").html(0);
	
	let serviceListId = [];
	let serviceListString = '';
	if (checkedAllServices) {
		serviceListId = [...originalServiceIdList];
		serviceListString = 'All';
	} else {
		serviceListId = $("#iptSrchService").jqxComboBox('getCheckedItems').map(i=>i.value);
		$("#iptSrchService").jqxComboBox('getCheckedItems').forEach(i => {			
			serviceListString += i.label +  ',';
		});
		serviceListString = serviceListString.slice(0, serviceListString.length-1);
	}
	
	let srchGrade = $("#iptSrchClass").val().split("/")[0];
	let srchClass = $("#iptSrchClass").val().split("/")[1];
	
	if (serviceListId.length == 0) {
		SS.alert( SS.title.ERROR, "Service is required");
		return;
	}
	
    let params = {
        sClass:  srchClass,
        grade: srchGrade,
        serviceListId: serviceListId,
        fromDate: $("#iptSrchFromDate").val(),
        toDate:  $("#iptSrchToDate").val(),
        serviceListString: serviceListString
    }
    SS.sendToServer(
        'OVC_R_01',
        false,
        params,
        function onSuccess(data) {
            sourceMaster.localdata = data.lst;
            $("#grdOverviewClass").jqxGrid({ source: sourceMaster });
        	onCalculateTotal("#grdOverviewClass");
        },
        function onError(err) {
            SS.alert( SS.title.ERROR, SS.message.ERROR);
        }
    );
}

function onSearchDetail(rowData) {
    
	let serviceListId = [];
	if (checkedAllServices) {
		serviceListId = [...originalServiceIdList];
	} else {
		serviceListId = $("#iptSrchService").jqxComboBox('getCheckedItems').map(i=>i.value);
	}
	
	if (serviceListId.length == 0) {
		SS.alert( SS.title.ERROR, "Service is required");
		return;
	}
    
    SS.sendToServer(
        'OVC_R_02',
        false,
        { 
        	studentId: rowData.studentId, 
        	serviceListId: serviceListId,
            fromDate: $("#iptSrchFromDate").val(),
            toDate:  $("#iptSrchToDate").val(),
        },
        function onSuccess(data) {
        	sourceDetail.localdata = data.lst;
            $('#grdOverviewClassDetail').jqxGrid({ source: sourceDetail });
        	onCalculateTotal("#grdOverviewClassDetail");
        }
    );
}

function onPrint() {
	let gridContent = $("#grdOverviewClass").jqxGrid('exportdata', 'html');
	let gridDetailContent = $("#grdOverviewClassDetail").jqxGrid('exportdata', 'html');
    let newWindow = window.open('', '', 'width=800, height=500'),
    document = newWindow.document.open(),
    pageContent =
        '<!DOCTYPE html>\n' +
        '<html>\n' +
        '<head>\n' +
        '<meta charset="utf-8" />\n' +
        '<title>Overview / Class</title>\n' +
        '</head>\n' +
        '<body>\n' +
        '<div>In Total</div>' +
        '<div>\n' + gridContent + '\n</div>' +
        $('#grdMaster-total').html() +
        '<br/>\n' +
        '<br/>\n' +
        '<div>In Detail</div>' +
        '<div>\n' + gridDetailContent + '\n</div>' +
        $('#grdDetail-total').html() +
        '\n</body>\n</html>';
    document.write(pageContent);
    document.close();
    newWindow.print();
}

$(document).ready(function () {
    init();
    createGrid();
    createGridDetail()
    setMinDate($("#iptSrchFromDate").val('date'));
    $('#iptSrchFromDate').on('valueChanged', function(event) {
        const jsDate = event.args.date;
        setMinDate(jsDate)
    });
    $('#btnStdSrch').click(function () {
        $('#grdOverviewClass').jqxGrid('refresh');
        $('#grdOverviewClassDetail').jqxGrid('clear');
        onSearch();
    });
    
    $("#grdOverviewClass").on('rowdoubleclick', function (event) {
        let rowData = $("#grdOverviewClass").jqxGrid('getrowdata', event.args.rowindex);
        $('#grdOverviewClassDetail').jqxGrid('refresh');
    	onSearchDetail(rowData);
    });

    $('#btnPrint').click(function () {
        onPrint()
    });
    
    $("#iptSrchService").on('checkChange', function(event) {
	    if (event.args) {
		    var item = event.args.item;
		    var value = item.value;
		    var label = item.label;
		    var checked = item.checked;
		    if (label === 'All') {
		    	let allItems = $("#iptSrchService").jqxComboBox('getItems');
		    	if (checked) {
			    	for (let i=1; i<allItems.length; i++) {
				    	$("#iptSrchService").jqxComboBox('uncheckItem', i);
			    		$("#iptSrchService").jqxComboBox('disableItem', i);
			    	}
		    		checkedAllServices = true;
		    	} else {
			    	for (let i=1; i<allItems.length; i++) {
			    		$("#iptSrchService").jqxComboBox('enableItem', i);
			    	}
		    		checkedAllServices = false;
		    	}
		    }
		}
	});
    
    $("#iptSrchService").jqxComboBox('checkIndex', 0);

})

