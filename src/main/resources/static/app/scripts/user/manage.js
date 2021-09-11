var fn = {
    dataset: null,
    gridSource: null,
    data: {},
    
    initGrid: function() {
        this.gridSource = {
            datafields: [
            	{ name: 'rnum', type: 'int' },
            	{ name: 'id', type: 'int' },
            	{ name: 'username', type: 'string' },
            	{ name: 'email', type: 'string' },
            	{ name: 'schoolId', type: 'int' },
            	{ name: 'schoolName', type: 'string' },
            	{ name: 'fullName', type: 'string' },
            	{ name: 'userType', type: 'string' },
            	{ name: 'lastLoginDate', type: 'date' },
            	{ name: 'status', type: 'string' },
            	{ name: 'description', type: 'string' },
            	{ name: 'delYn', type: 'string' },
            	{ name: 'insertId',type: 'int' },
            	{ name: 'insertDate', type: 'string' },
            	{ name: 'updateId', type : 'int' },
            	{ name: 'updateDate', type : 'string' },
            	{ name: 'approveStatus', type : 'string' },
            	{ name: 'approveDate', type : 'date' }
            ],
            datatype: "array",
            localdata: fn.dataset
        };
		
        var dataAdapter = new $.jqx.dataAdapter(fn.gridSource, {
			loadComplete : function(data) {},
			loadError : function(xhr, status, error) {}
		});
        
        $("#grdUser").jqxGrid({
            source: dataAdapter,
            columnsresize: true,
            pageable: true,
            adaptive: true,
            columns: [
	            { text: '#', datafield: 'rnum', align: 'center', cellsalign: 'center', width: '5%', editable: false },
	            { text: 'Username', datafield: 'username', align: 'center', cellsalign: 'center', width: '10%', editable: false },
	            { text: 'Email', datafield: 'email', align: 'center', cellsalign: 'center', width: '15%', editable: false },
	            { text: 'School', datafield: 'schoolId', displayfield: 'schoolName', align: 'center', cellsalign: 'center', width: '15%', editable: false },
	            { text: 'Full name', datafield: 'fullName', align: 'center', cellsalign: 'center', width: '15%', editable: false },
	            { text: 'User Type', datafield: 'userType', align: 'center', cellsalign: 'center', width: '5%', editable: false },
	            { text: 'Last Login Date', datafield: 'lastLoginDate', cellsformat: 'dd/MM/yyyy', align: 'center', cellsalign: 'center', width: '10%', editable: false },
	            { text: 'Status', datafield: 'status', align: 'center', cellsalign: 'center', width: '10%', editable: false },
	            { text: 'Approve Status', datafield: 'approveStatus', align: 'center', cellsalign: 'center', width: '10%', editable: false },
	            { text: 'Approve Date', datafield: 'approveDate', cellsformat: 'dd/MM/yyyy HH:mm:ss', align: 'center', cellsalign: 'center', width: '10%', editable: false },
	            { text: 'Del  Y/N', datafield: 'delYn', align: 'center', cellsalign: 'center', width: '10%', editable: false },
	            { text: '', align: 'center', width: '10%',
	                    cellsrenderer: function (rowIndex, column, value) {
	                        return '<div style="text-align: center; margin-top: 4px;">' +
	                        	'<button alt="Approve" class="btn btn-info btn-icon btn-sm" style="margin-right: 10px" onclick="fn.onOpenApprovePopup(' + rowIndex + ')"><span class="glyphicon glyphicon-check"></span></button>' +
	                            '<button alt="Edit" class="btn btn-info btn-icon btn-sm" style="margin-right: 10px" onclick="fn.onUpdate(' + rowIndex + ')"><span class="glyphicon glyphicon-edit"></span></button>' +
	                            '<button alt="Delete" class="btn btn-danger btn-icon btn-sm" style="margin-right: 10px" onclick="fn.onDelete(' + rowIndex + ')"><span class="glyphicon glyphicon-trash"></span></button>' +
	                            '<button alt="AssignRole" class="btn btn-primary btn-icon btn-sm" onclick="fn.onAssignRole(' + rowIndex + ')"><span class="glyphicon glyphicon-lock"></span></button>' +
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
    	
    	fn.data.statusList = [
    		{value: "", name: "All"},
    		{value: "ACTIVE", name: "ACTIVE"},
    		{value: "DEACTIVE", name: "DEACTIVE"},
    	];
    	
    	fn.data.approveStatusList = [
    		{value: "", name: "All"},
    		{value: "APPROVED", name: "APPROVED"},
    		{value: "PENDING", name: "PENDING"},
    		{value: "REJECTED", name: "REJECTED"}
    	];
    	
        $("#iptSrchUsername").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 45 });
        $("#iptSrchFullName").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', maxLength: 100 });

        SS.sendToServer('SC_R_03', false, {}, function onSuccess(data) {
        	var src = [];
    		if (data && data.lst) src = data.lst;	
    		fn.data.schoolList = [...src] || [];
    		fn.data.schoolList.unshift({id: 0, schoolName: ""});
    		src.unshift({id: -1, schoolName: "All"});
    		$("#iptSrchSchool").jqxDropDownList({ source: src, selectedIndex: 0, displayMember: "schoolName", valueMember: "id", height: SS.IPT_HEIGHT, width: '100%'});
    	});
        
        $("#iptSrchStatus").jqxDropDownList({ source: fn.data.statusList, displayMember: "name", valueMember: "value", selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%'});
        $("#iptSrchApproveStatus").jqxDropDownList({ source: fn.data.approveStatusList, displayMember: "name", valueMember: "value", selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%'});

        $("#id-ss-popup").jqxWindow({
            isModal: true,
            autoOpen: false,
            width: 700,
            height: 500,
            theme: 'bootstrap',
            position: 'center',
            resizable: false,
            draggable: true,
            title: "User"
        });
    },

    onSearch: function() {
        var params = {
            username:  $("#iptSrchUsername").val(),
            fullName:  $("#iptSrchFullName").val(),
            schoolId: $("#iptSrchSchool").val(),
            status: $("#iptSrchStatus").val(),
            approveStatus: $("#iptSrchApproveStatus").val()
        }
        SS.sendToServer(
            'U_R_01',
            false,
            params,
            function onSuccess(data) {
            	fn.gridSource.localdata = data.lst;
                $("#grdUser").jqxGrid({ source: fn.gridSource });
            },
            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },
    
    initPopupCreate: function() {
    	$("#iptInsUsername").jqxInput({height: SS.IPT_HEIGHT, width: '100%', maxLength: 45});
    	$("#iptInsPassword").jqxInput({height: SS.IPT_HEIGHT, width: '100%', maxLength: 45});
    	$("#iptInsFullName").jqxInput({height: SS.IPT_HEIGHT, width: '100%', maxLength: 100});
		$("#iptInsEmail").jqxInput({height: SS.IPT_HEIGHT, width: '100%', maxLength: 180});
		
		$("#iptInsSchool").jqxDropDownList({ source: fn.data.schoolList, displayMember: "schoolName", valueMember: "id", selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%'});

		$("#frmCreateUser").jqxValidator({
			hintType: 'label',
            rules: [
                { input: '#iptInsUsername', message: 'Username is required', action: 'keyup, blur', rule: 'required' },
                { input: '#iptInsPassword', message: 'Password is invalid', action: 'keyup, blur', rule: 'required' },
                { input: '#iptInsPassword', message: 'Min length is 8', action: 'keyup, blur', rule: 'minLength=8' },
                { input: '#iptInsEmail', message: 'Email is required', action: 'keyup, blur', rule: 'required' },
                { input: '#iptInsEmail', message: 'Email is invalid', action: 'keyup, blur', rule: 'email' },
            ]
		});
		
		$("#btnCancel").click(function() {	
			$("#id-ss-popup").jqxWindow('close');
		});
		
		$("#btnSave").click(function() {
            if (!$('#frmCreateUser').jqxValidator('validate')) return;
			let params = {
				username: $("#iptInsUsername").val(),
				password: $("#iptInsPassword").val(),
				fullName: $("#iptInsFullName").val(),
				schoolId: $("#iptInsSchool").val(),
				email: $("#iptInsEmail").val()
			};
			SS.sendToServer('U_C_01', false, params, function onSuccess(data) {
				$("#id-ss-popup").jqxWindow('close');

	            $('#grdUser').jqxGrid('refresh');
	            fn.onSearch();
			}, function onError(err) {
				SS.alert(SS.title.ERROR, SS.message.ERROR);
			});
		});
    },

    onOpenApprovePopup: function(rowIndex) {
        var data = $("#grdUser").jqxGrid('getrowdata', rowIndex);
        let id = data.id;
        if (id) {
        	this.onPopupOpen('user/approve?id=' + id, 'Approve User', function() {
        		fn.initPopupApprove(data);
        	});
        }
    },
    
    initPopupApprove: function(data) {
    	
		$("#btnCancel").click(function() {	
			$("#id-ss-popup").jqxWindow('close');
		});
		
		$("#btnApprove").click(function() {
	    	if (data.approveStatus == "APPROVED") {
	    		SS.alert(SS.title.ERROR, 'No approval change was made');
	    		return;
	    	}
            SS.confirm(SS.title.CONFIRM, "Do you want to approve? ", function (result) {
                if (result) {
        			let params = {
        				id: data.id,
        				approveStatus: "APPROVED"
        			};
        			SS.sendToServer('U_A_01', false, params, function onSuccess(data) {
        				$("#id-ss-popup").jqxWindow('close');
        				
        				$('#grdUser').jqxGrid('refresh');
        	            fn.onSearch();
        			}, function onError(err) {
        				SS.alert(SS.title.ERROR, SS.message.ERROR);
        			});
                }
            });
		});
		
		$("#btnReject").click(function() {
	    	if (data.approveStatus == "REJECTED") {
	    		SS.alert(SS.title.ERROR, 'No approval change was made');
	    		return;
	    	}
            SS.confirm(SS.title.CONFIRM, "Do you want to reject? ", function (result) {
                if (result) {
        			let params = {
        				id: data.id,
        				approveStatus: "REJECTED"
        			};
        			SS.sendToServer('U_A_01', false, params, function onSuccess(data) {
        				$("#id-ss-popup").jqxWindow('close');
        				
        				$('#grdUser').jqxGrid('refresh');
        	            fn.onSearch();
        			}, function onError(err) {
        				SS.alert(SS.title.ERROR, SS.message.ERROR);
        			});
                }
            });
		});
    },

    onCreate: function() {
    	this.onPopupOpen('user/create', 'Create User', fn.initPopupCreate);
    },
    
    initPopupUpdate: function(data) {
    	$("#iptUpdFullName").jqxInput({height: SS.IPT_HEIGHT, width: '100%', maxLength: 100});
		$("#iptUpdEmail").jqxInput({height: SS.IPT_HEIGHT, width: '100%', maxLength: 180});

		$("#iptUpdSchool").jqxDropDownList({ source: fn.data.schoolList, displayMember: "schoolName", valueMember: "id", height: SS.IPT_HEIGHT, width: '100%'});
	    $("#iptUpdStatus").jqxDropDownList({ source: fn.data.statusList, displayMember: "name", valueMember: "value",  height: SS.IPT_HEIGHT, width: '100%'});

	    $("#iptUpdSchool").val(data.schoolId);
	    $("#iptUpdFullName").val(data.fullName);
	    $("#iptUpdStatus").val(data.status);
	    $("#iptUpdEmail").val(data.email);

		$("#frmUpdateUser").jqxValidator({
			hintType: 'label',
            rules: [
                { input: '#iptUpdEmail', message: 'Email is required', action: 'keyup, blur', rule: 'required' },
                { input: '#iptUpdEmail', message: 'Email is invalid', action: 'keyup, blur', rule: 'email' },
            ]
		});
	    
		$("#btnCancel").click(function() {	
			$("#id-ss-popup").jqxWindow('close');
		});
		$("#btnSave").click(function() {
            if (!$('#frmUpdateUser').jqxValidator('validate')) return;
            
            let isUpdated = false;
            if ($("#iptUpdFullName").val() != data.fullName || $("#iptUpdSchool").val() != data.schoolId || $("#iptUpdStatus").val() != data.status || $("#iptUpdEmail").val() != data.email) isUpdated = true;
            
            if (!isUpdated) {
            	SS.alert(SS.title.ERROR, "There is nothing to update");
            	return;
            }
            
            SS.confirm(SS.title.CONFIRM, "Do you want to update? ", function (result) {
                if (result) {
        			let params = {
        				id: data.id,
        				fullName: $("#iptUpdFullName").val(),
        				schoolId: $("#iptUpdSchool").val(),
        				email: $("#iptUpdEmail").val(),
        				status: $("#iptUpdStatus").val()
        			};
        			SS.sendToServer('U_U_01', false, params, function onSuccess(data) {
        				$("#id-ss-popup").jqxWindow('close');
        				
        				$('#grdUser').jqxGrid('refresh');
        	            fn.onSearch();
        			}, function onError(err) {
        				SS.alert(SS.title.ERROR, SS.message.ERROR);
        			});
                }
            });
		});
    },

    onUpdate: function(rowIndex) {
        var data = $("#grdUser").jqxGrid('getrowdata', rowIndex);
        let id = data.id;
        if (id) {
        	this.onPopupOpen('user/update?id=' + id, 'Update User', function() {
        		fn.initPopupUpdate(data);
        	});
        }
    },

    onDelete: function(rowIndex) {
        let data = $("#grdUser").jqxGrid('getrowdata', rowIndex);
        let id = data.id;
        if (id) {
            SS.confirm(SS.title.CONFIRM, "Do you want to delete ? ", function (result) {
                if (result ) {
                    SS.sendToServer(
                        'U_D_01',
                        false,
                        { id : id },
                        function onSuccess(data) {
                        	if (data && data.status == 'NG' && data.message) {
                        		SS.alert(SS.title.ERROR, data.message);
                        	}
                            fn.onSearch();
                        },
                        function onError(err) {
                        	if (err && err.msg) {
                        		SS.alert(SS.title.ERROR, err.msg);
                        	}
                        }
                    );
                }
            });
        }
    },
    
    initPopupAssignRole: function(data) {
        SS.sendToServer('R_R_01', false, {}, function onSuccess(listRoles) {
        	let srcRoles = [];
    		if (listRoles) srcRoles = listRoles.lst;
    		$("#iptRoles").jqxComboBox({ source: srcRoles, displayMember: "name", valueMember: "id", height: SS.IPT_HEIGHT, width: '100%', checkboxes: true});
    		
            SS.sendToServer('UR_R_02', false, {userId: data.id}, function onSuccess(listUserRoles) {
            	let srcUserRoles = [];
        		if (listUserRoles) srcUserRoles = listUserRoles.lst;
        		srcUserRoles.forEach(ur => {
        			let roleItemAssigned = $("#iptRoles").jqxComboBox('getItemByValue', ur);
        			if (roleItemAssigned) {
        				$("#iptRoles").jqxComboBox('checkItem', roleItemAssigned); 
        			}
        		});
        	});
    	});


		$("#btnCancel").click(function() {	
			$("#id-ss-popup").jqxWindow('close');
		});
		$("#btnSave").click(function() {
			let listCheckedRoles = $("#iptRoles").jqxComboBox('getCheckedItems');
			let params = {
				userId: data.id,
				roleIdList: listCheckedRoles.map(role => role.value)
			};
			SS.sendToServer('UR_C_01', false, params, function onSuccess(data) {
				$("#id-ss-popup").jqxWindow('close');
				
			}, function onError(err) {
				SS.alert(SS.title.ERROR, SS.message.ERROR);
			});
		});
    },
    
    onAssignRole: function(rowIndex) {
        let data = $("#grdUser").jqxGrid('getrowdata', rowIndex);
        let id = data.id;
        if (id) {
        	this.onPopupOpen('user/assignRole?id=' + id, 'Assign Role User', function() {
        		fn.initPopupAssignRole(data);
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
    fn.onSearch();
    
    $(document).on('keypress', function(e) {
    	if (e.keyCode == 13) {
    		e.preventDefault();
    		fn.onSearch();
    	}
    });

	$('#btnStdSrch').click(function() {
		$('#grdUser').jqxGrid('refresh');
		fn.onSearch();
	});

	$('#btnStdCreate').click(function() {
		fn.onCreate();
	});
});