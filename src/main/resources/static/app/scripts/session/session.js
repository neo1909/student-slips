var fn = {
    dataset: null,
    gridSource: null,
    data: {},
    
    initGrid: function() {
        this.gridSource = {
            datafields: [
            	{ name: 'rnum', type: 'int' },
            	{ name: 'primaryId', type: 'string' },
            	{ name: 'sessionId', type: 'string' },
            	{ name: 'createTime', type: 'date' },
            	{ name: 'lastAccessTime', type: 'date' },
            	{ name: 'maxInactiveInterval', type: 'int' },
            	{ name: 'expiryTime', type: 'date' },
            	{ name: 'principalName', type: 'string' },
            	{ name: 'fullName', type: 'string' }
            ],
            datatype: "array",
            localdata: fn.dataset
        };
		
        var dataAdapter = new $.jqx.dataAdapter(fn.gridSource, {
			loadComplete : function(data) {},
			loadError : function(xhr, status, error) {}
		});
        
        $("#grdSession").jqxGrid({
            source: dataAdapter,
            columnsresize: true,
            adaptive: true,
            columns: [
	            { text: '#', datafield: 'rnum', align: 'center', cellsalign: 'center', width: '3%', editable: false },
	            { text: 'ID', datafield: 'primaryId', align: 'center', cellsalign: 'center', width: '15%', editable: false },
	            { text: 'Session ID', datafield: 'sessionId', align: 'center', cellsalign: 'center', width: '15%', editable: false },
	            { text: 'Creation Time', cellsformat: 'dd/MM/yyyy', datafield: 'createTime', align: 'center', cellsalign: 'center', width: '10%', editable: false },
	            { text: 'Last Access Time', cellsformat: 'dd/MM/yyyy', datafield: 'lastAccessTime', align: 'center', cellsalign: 'center', width: '10%', editable: false },
	            { text: 'Max Inactive Interval', datafield: 'maxInactiveInterval', align: 'center', cellsalign: 'center', width: '5%', editable: false },
	            { text: 'Expiry Time', cellsformat: 'dd/MM/yyyy', datafield: 'expiryTime', align: 'center', cellsalign: 'center', width: '12%', editable: false },
	            { text: 'Principal Name', datafield: 'principalName', align: 'center', cellsalign: 'center', width: '10%', editable: false },
	            { text: 'User Fullname', datafield: 'fullName', align: 'center', cellsalign: 'center', width: '10%', editable: false },
	            { text: 'Actions', align: 'center', width: '10%',
	                    cellsrenderer: function (rowIndex, column, value) {
	                        return '<div style="text-align: center; margin-top: 4px;">' +
	                            '<button alt="Delete" class="btn btn-danger btn-icon btn-sm" style="margin-right: 10px" onclick="fn.onDelete(' + rowIndex + ')"><span class="glyphicon glyphicon-trash"></span></button>' +
	                            '</div>';
	                    }
	            }
            ],
            theme: 'bootstrap',
            width: '100%',
            height: 350,
            rowsheight: 33
        });
    },

    init: function() {
    	this.initGrid();

        $("#iptSrchSessionId").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 45 });
        $("#iptSrchUsername").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 45 });
        $("#iptSrchFullName").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 100 });
    },

    onSearch: function() {
        var params = {
            principalName: $("#iptSrchUsername").val(),
            fullName: $("#iptSrchFullName").val(),
            sessionId: $("#iptSrchSessionId").val()
        }
        SS.sendToServer(
            'SS_R_01',
            false,
            params,
            function onSuccess(data) {
            	fn.gridSource.localdata = data.lst;
                $("#grdSession").jqxGrid({ source: fn.gridSource });
            },
            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    onDelete: function(rowIndex) {
        let data = $("#grdSession").jqxGrid('getrowdata', rowIndex);
        let primaryId = data.primaryId;
        if (primaryId) {
            SS.confirm(SS.title.CONFIRM, "Do you want make this session logout ? ", function (result) {
                if (result ) {
                    SS.sendToServer(
                        'SS_D_01',
                        false,
                        { primaryId : primaryId },
                        function onSuccess(data) {
                            fn.onSearch();
                        }
                    );
                }
            });
        }
    },
}


$(document).ready(function() {
	fn.init();

	$('#btnStdSrch').click(function() {
		$('#grdSession').jqxGrid('refresh');
		fn.onSearch();
	});
});