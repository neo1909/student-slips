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
            name: 'grade',
            type: 'int'
        },
        {
            name: 'sClass',
            type: 'int'
        },
        {
            name: 'serviceId',
            type: 'int'
        },
        {
            name: 'serviceName',
            type: 'string'
        },
        {
            name: 'note',
            type: 'string'
        },
        {
            name: 'debitDate',
            type: 'date'
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
        }
    ],
    datatype: "array",
    localdata: null,
};

function createGrid() {
    let dataAdapter = new $.jqx.dataAdapter(source);
    $("#grdTask").jqxGrid({
        source: dataAdapter,
        pageable: true,
        columns: [{
                text: 'Date',
                datafield: 'debitDate',
                cellsformat: 'dd/MM/yyyy',
                align: 'center',
                cellsalign: 'left',
                width: '20%',
                editable: false,
            },
            {
                text: 'Grade',
                datafield: 'grade',
                align: 'center',
                cellsalign: 'left',
                width: '10%',
                editable: false,
            },
            {
                text: 'Class',
                datafield: 'sClass',
                align: 'center',
                cellsalign: 'right',
                width: '10%',
                editable: false,
            },
            {
                text: 'Service',
                columntype: 'textbox',
                datafield: 'serviceName',
                align: 'center',
                cellsalign: 'right',
                width: '15%',
                editable: false,
            },
            {
                text: 'Note',
                datafield: 'note',
                align: 'center',
                cellsalign: 'center',
                width: '35%',
                editable: false,
            },
            {
                text: 'Actions',
                align: 'center',
                width: '10%,',
                cellsrenderer: function (rowIndex, column, value) {
                    return '<div style="text-align: center; margin-top: 4px;">' +
                        '<button alt="Edit" class="btn btn-info btn-icon btn-sm" style="margin-right: 10px" onclick="onUpdate(' + rowIndex + ')"><span class="glyphicon glyphicon-edit"></span></button>' +
                        '<button alt="Delete" class="btn btn-danger btn-icon btn-sm" onclick="onDelete(' + rowIndex + ')"><span class="glyphicon glyphicon-trash"></span></button>' +
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
}

function setMinDate(time) {
    const date = new Date( time )
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = +date.getDate();
    $("#iptToDate").jqxDateTimeInput('setMinDate', new Date( year, month, day));
}

function onSearch() {
    let params = {
        toDate:  $("#iptToDate").val(),
        fromDate: $("#iptFromDate").val()
    }
    SS.sendToServer(
        'TA_R_01',
        false,
        params,
        function onSuccess(data) {
           source.localdata = data.lst;
            $("#grdTask").jqxGrid({ source: source });
        },

        function onError(err) {
            SS.alert( SS.title.ERROR, SS.message.ERROR);
        }
    );
}

function onDelete(rowIndex) {
    let data = $("#grdTask").jqxGrid('getrowdata', rowIndex);
    let id = data.id;
    if (id) {
        SS.confirm(SS.title.CONFIRM, "Do you want delete ? ", function (result) {
            if (result ) {
                SS.sendToServer(
                    'TA_D_01',
                    false,
                    data,
                    function onSuccess(data) {
                        onSearch();
                    }
                );
            }
        });
    }
}

function onUpdate(rowIndex) {
    let data = $("#grdTask").jqxGrid('getrowdata', rowIndex);
    window.location.href = "/posting/student-debts?id=" + data.id;
}


$(document).ready(function () {
    localStorage.removeItem('task')
    init();
    createGrid();
    setMinDate($("#iptFromDate").val('date'));

    $('#iptFromDate').on('valueChanged', function (event)
    {
        const jsDate = event.args.date;
        setMinDate(jsDate)
    });
    
    $(document).on('keypress', function(e) {
    	if (e.keyCode == 13) {
    		e.preventDefault();
    		onSearch();
    	}
    });

    $('#btnStdSrch').click(function () {
        $('#grdTask').jqxGrid('refresh');
        onSearch();
    });


})