var fn = {
    dataset: null,
    gridSource: null,
    data: {},
    
    initGrid: function() {
        this.gridSource = {
            datafields: [
            	{ name: 'rnum', type: 'int' },
            	{ name: 'id', type: 'int' },
            	{ name: 'name', type: 'string' },
            	{ name: 'description', type: 'string' },
            	{ name: 'delYn', type: 'string' }
            ],
            datatype: "array",
            localdata: fn.dataset
        };
		
        var dataAdapter = new $.jqx.dataAdapter(fn.gridSource, {
			loadComplete : function(data) {},
			loadError : function(xhr, status, error) {}
		});
        
        $("#grdRole").jqxGrid({
            source: dataAdapter,
            pageable: true,
            columnsresize: true,
            adaptive: true,
            columns: [
	            { text: '#', datafield: 'rnum', align: 'center', cellsalign: 'center', width: '5%', editable: false },
//	            { text: 'ID', datafield: 'id', align: 'center', cellsalign: 'left', width: '15%', editable: false },
	            { text: 'Name', datafield: 'name', align: 'center', cellsalign: 'center', width: '30%', editable: false },
	            { text: 'Description', datafield: 'description', align: 'center', cellsalign: 'center', width: '40%', editable: false },
	            { text: 'Del  Y/N', datafield: 'delYn', align: 'center', cellsalign: 'center', width: '10%', editable: false },
	            { text: '', align: 'center', width: '15%',
	                    cellsrenderer: function (rowIndex, column, value) {
	                        return '<div style="text-align: center; margin-top: 4px;">' +
	                            '<button alt="Delete" class="btn btn-danger btn-icon btn-sm" style="margin-right: 10px" onclick="fn.onDelete(' + rowIndex + ')"><span class="glyphicon glyphicon-trash"></span></button>' +
	                            '</div>';
	                    }
	            }
            ],
            theme: 'bootstrap',
            width: '100%',
            height: SS.grid.height,
            rowsheight: 33
        });
    },

    init: function() {
    	this.initGrid();
    	
        $("#iptSrchRoleName").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 45 });

        $("#id-ss-popup").jqxWindow({
            isModal: true,
            autoOpen: false,
            width: 700,
            height: 500,
            theme: 'bootstrap',
            position: 'center',
            resizable: false,
            draggable: true,
            title: "Role"
        });
    },

    onSearch: function() {
        var params = {
            name:  $("#iptSrchRoleName").val()
        }
        SS.sendToServer(
            'R_R_01',
            false,
            params,
            function onSuccess(data) {
            	fn.gridSource.localdata = data.lst;
                $("#grdRole").jqxGrid({ source: fn.gridSource });
            },
            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },
    
    initPopupCreate: function() {
    	$("#iptInsRoleName").jqxInput({height: SS.IPT_HEIGHT, width: '100%', maxLength: 45});
		
		$("#btnCancel").click(function() {	
			$("#id-ss-popup").jqxWindow('close');
		});
		
		$("#btnSave").click(function() {
			let params = {
					name: $("#iptInsRoleName").val()
			};
			SS.sendToServer('R_C_01', false, params, function onSuccess(data) {
				$("#id-ss-popup").jqxWindow('close');

	            $('#grdRole').jqxGrid('refresh');
	            fn.onSearch();
			}, function onError(err) {
				SS.alert(SS.title.ERROR, SS.message.ERROR);
			});
		});
    },

    onCreate: function() {
    	this.onPopupOpen('role/create', 'Create Role', fn.initPopupCreate);
    },

    onDelete: function(rowIndex) {
        let data = $("#grdRole").jqxGrid('getrowdata', rowIndex);
        let id = data.id;
        if (id) {
            SS.confirm(SS.title.CONFIRM, "Do you want delete ? ", function (result) {
                if (result ) {
                    SS.sendToServer(
                        'R_D_01',
                        false,
                        { id : id },
                        function onSuccess(data) {
                            fn.onSearch();
                        }
                    );
                }
            });
        }
    },

    onPopupOpen: function(url, title, callback) {
    	$.ajax({
    		type: 'GET',
    		url: url,
    		success: function(html) {
    			$('#id-ss-popup').jqxWindow({ content: html });
    			if (html) {
    				callback();
        	        $("#id-ss-popup").jqxWindow('open');
    			}
    		}
    	});
    }
}


$(document).ready(function() {
	fn.init();

	$('#btnStdSrch').click(function() {
		$('#grdRole').jqxGrid('refresh');
		fn.onSearch();
	});

	$('#btnStdCreate').click(function() {
		fn.onCreate();
	});
	
	$(document).on('keypress', function(e) {
    	if (e.keyCode == 13) {
    		e.preventDefault();
    		fn.onSearch();
    	}
    });
});