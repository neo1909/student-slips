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
            type: 'number'
        },
        {
            name: 'claims',
            type: 'number'
        },
        {
            name: 'balance',
            type: 'number'
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
let totalData = {};

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
		$("#cmbSrchService").jqxComboBox({ source: src, displayMember: "name", valueMember: "id", height: SS.IPT_HEIGHT, width: '100%', checkboxes: true});
	});
    
    let dataClass = [];
    for (let i=1; i<=8; i++) {
    	for (let j=1; j<=16; j++) {
    		dataClass.push(i + "/" + j);
    	}
    }
    
    $("#cmbSrchClass").jqxDropDownList({ source: dataClass, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%' });

};
function setMinDate(time) {
    const date = new Date( time )
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = +date.getDate();
    $("#iptSrchToDate").jqxDateTimeInput('setMinDate', new Date( year, month, day));
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
        pageable: true,
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
                cellsformat: 'd2'
            },
            {
                text: 'Claims',
                datafield: 'claims',
                align: 'center',
                cellsalign: 'right',
                width: '15%',
                editable: false,
                cellsformat: 'd2',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties) {
                	let formatValue = SS.format.formatNumberByLocales(!value ? 0 : value);
            		return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + formatValue + '</div>';
                }
            },
            {
                text: 'Balance',
                datafield: 'balance',
                align: 'center',
                cellsalign: 'right',
                width: '15%',
                editable: false,
                cellsformat: 'd2',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties) {
                	let formatValue = SS.format.formatNumberByLocales(!value ? 0 : value);
                	if (value && value < 0) {                    		
                		return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; background-color: green; color: white">' + formatValue + '</div>';
                	} else {
                		return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + formatValue + '</div>';
                	}
                }
            }
        ],
        theme: 'bootstrap',
        width: '100%',
        height: 350,
        rowsheight: 33,
        selectionmode: 'row'
    });
    $("#grdOverviewClass").jqxGrid('localizestrings', SS.grid.localization);
}

function createGridDetail() {
    let dataAdapter = new $.jqx.dataAdapter(sourceDetail);
    $("#grdOverviewClassDetail").jqxGrid({
        source: dataAdapter,
        pageable: true,
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
                cellsformat: 'd2'
            },
            {
                text: 'Claims',
                datafield: 'claims',
                align: 'center',
                cellsalign: 'right',
                width: '15%',
                editable: false,
                cellsformat: 'd2',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties) {
                	let formatValue = SS.format.formatNumberByLocales(!value ? 0 : value);
            		return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + formatValue + '</div>';
                }
            },
            {
                text: 'Balance',
                datafield: 'balance',
                align: 'center',
                cellsalign: 'right',
                width: '15%',
                editable: false,
                cellsformat: 'd2',
                cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties) {
                	let formatValue = SS.format.formatNumberByLocales(!value ? 0 : value);
                	if (value && value < 0) {                    		
                		return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; background-color: green; color: white">' + formatValue + '</div>';
                	} else {
                		return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + formatValue + '</div>';
                	}
                }
            },
        ],
        theme: 'bootstrap',
        width: '100%',
        height: 300,
        rowsheight: 33
    });
    $("#grdOverviewClassDetail").jqxGrid('localizestrings', SS.grid.localization);
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
		
		if (gridId === '#grdOverviewClass') {
			$("#grdMaster-total .debit").html(SS.format.formatNumberByLocales(totalDebit));
			$("#grdMaster-total .claims").html(SS.format.formatNumberByLocales(totalClaims));
			$("#grdMaster-total .balance").html(SS.format.formatNumberByLocales(totalBalance));
			
			totalData.master = {};
			totalData.master.totalDebit = totalDebit;
			totalData.master.totalClaims = totalClaims;
			totalData.master.totalBalance = totalBalance;
		} else {
			$("#grdDetail-total .debit").html(SS.format.formatNumberByLocales(totalDebit));
			$("#grdDetail-total .claims").html(SS.format.formatNumberByLocales(totalClaims));
			$("#grdDetail-total .balance").html(SS.format.formatNumberByLocales(totalBalance));

			if (totalData && totalData.master) {				
				let debit = totalData.master.totalDebit;
				let claims = totalData.master.totalClaims;
				let balance = totalData.master.totalBalance;
				$("#summary-total .debit").html(SS.format.formatNumberByLocales(debit));
				$("#summary-total .claims").html(SS.format.formatNumberByLocales(claims));
				$("#summary-total .balance").html(SS.format.formatNumberByLocales(balance));
			}
		}
		
	}
}

function onSearch() {
	
	$("#grdMaster-total .debit").html(0);
	$("#grdMaster-total .claims").html(0);
	$("#grdMaster-total .balance").html(0);
	$("#grdDetail-total .debit").html(0);
	$("#grdDetail-total .claims").html(0);
	$("#grdDetail-total .balance").html(0);
	$("#summary-total .debit").html(0);
	$("#summary-total .claims").html(0);
	$("#summary-total .balance").html(0);
	
	let serviceListId = [];
	let serviceListString = '';
	if (checkedAllServices) {
		serviceListId = [...originalServiceIdList];
		serviceListString = 'All';
	} else {
		serviceListId = $("#cmbSrchService").jqxComboBox('getCheckedItems').map(i=>i.value);
		$("#cmbSrchService").jqxComboBox('getCheckedItems').forEach(i => {			
			serviceListString += i.label +  ',';
		});
		serviceListString = serviceListString.slice(0, serviceListString.length-1);
	}
	
	let srchGrade = $("#cmbSrchClass").val().split("/")[0];
	let srchClass = $("#cmbSrchClass").val().split("/")[1];
	
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
        	if (data && data.status && data.status === 'NG') {
                SS.alert( SS.title.ERROR, data.message);
                return;
        	}
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
		serviceListId = $("#cmbSrchService").jqxComboBox('getCheckedItems').map(i=>i.value);
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
        	if (data && data.status && data.status === 'NG') {
                SS.alert( SS.title.ERROR, data.message);
                return;
        	}
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
        '<br/>\n' +
        $('#summary-total').html() +
        '\n</body>\n</html>';
    document.write(pageContent);
    document.close();
    newWindow.print();
}

$(document).ready(function () {
	
	$("#grdMaster-total .debit").html(0);
	$("#grdMaster-total .claims").html(0);
	$("#grdMaster-total .balance").html(0);
	$("#grdDetail-total .debit").html(0);
	$("#grdDetail-total .claims").html(0);
	$("#grdDetail-total .balance").html(0);
	$("#summary-total .debit").html(0);
	$("#summary-total .claims").html(0);
	$("#summary-total .balance").html(0);
	
    init();
    createGrid();
    createGridDetail()
    setMinDate($("#iptSrchFromDate").val('date'));
    $('#iptSrchFromDate').on('valueChanged', function(event) {
        const jsDate = event.args.date;
        setMinDate(jsDate)
    });
    
    $('#btnSearch').click(function () {
        $('#grdOverviewClass').jqxGrid('refresh');
        $('#grdOverviewClassDetail').jqxGrid('clear');
        onSearch();
    });
    
    $(document).on('keypress', function(e) {
    	if (e.keyCode == 13) {
    		e.preventDefault();
    		onSearch();
    	}
    });
    
    $("#grdOverviewClass").on('rowclick', function (event) {
        let rowData = $("#grdOverviewClass").jqxGrid('getrowdata', event.args.rowindex);
        $('#grdOverviewClassDetail').jqxGrid('refresh');
    	onSearchDetail(rowData);
    });

    $('#btnPrint').click(function () {
        onPrint()
    });
    
    $("#cmbSrchService").on('checkChange', function(event) {
	    if (event.args) {
		    var item = event.args.item;
		    var value = item.value;
		    var label = item.label;
		    var checked = item.checked;
		    if (label === 'All') {
		    	let allItems = $("#cmbSrchService").jqxComboBox('getItems');
		    	if (checked) {
			    	for (let i=1; i<allItems.length; i++) {
				    	$("#cmbSrchService").jqxComboBox('uncheckItem', i);
			    		$("#cmbSrchService").jqxComboBox('disableItem', i);
			    	}
		    		checkedAllServices = true;
		    	} else {
			    	for (let i=1; i<allItems.length; i++) {
			    		$("#cmbSrchService").jqxComboBox('enableItem', i);
			    	}
		    		checkedAllServices = false;
		    	}
		    }
		}
	});
    
    $("#cmbSrchService").jqxComboBox('checkIndex', 0);
    
    onSearch();

})

