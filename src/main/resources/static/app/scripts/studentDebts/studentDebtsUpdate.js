let screenType = "U";

function initUpdate() {
	taskId = $("#iptTaskId").val() > 0 ? $("#iptTaskId").val() : 0;
	
	$("#screen-title").html("Student Debts: Update task ID = " + taskId);
	onSearchUpdate();

	$("#btnCancelUpdate").show();
	$("#btnStdSrch").prop('disabled', true);
	
	SS.sendToServer(
        'TA_R_01',
        false,
        { taskId: taskId },
        function onSuccess(data) {
        	if (data && data.lst && data.lst.length > 0) {	        		
        		updateTaskOriginalData = data.lst[0];
        		$("#iptComment").val(updateTaskOriginalData.note);

        		$("#cmbStdServiceSrch").jqxDropDownList({
        	        source: [updateTaskOriginalData.serviceName],
        	        disabled: true,
        	        selectedIndex: 0
        	    });
        		
        		let src = [{name: `1st ${i18n.lang.posting.installment}`, value: '1'}, {name: `2nd ${i18n.lang.posting.installment}`, value: '2'}, {name: `3rd ${i18n.lang.posting.installment}`, value: '3'}];
        		for (let i = 4, len = 12; i <= len; i++) {
        			src.push({name: `${i}th ${i18n.lang.posting.installment}`, value: `${i}`});
        		}
        		let idx = src.findIndex(i => i.value.includes(`${updateTaskOriginalData.installment}`));
        		$("#cmbStdInstSrch").jqxDropDownList({
        	        source: [...src],
        	        displayMember: 'name',
        	        valueMember: 'value',
        	        disabled: true,
        	        selectedIndex: idx
        	    });
        		
        		$("#iptPriceSrch").val(updateTaskOriginalData.price);
        		
        		let grade = $("#cmbStdGradeSrch").jqxDropDownList('getItemByValue', updateTaskOriginalData.grade == 0 ? '' : updateTaskOriginalData.grade);
        		$("#cmbStdGradeSrch").jqxDropDownList('selectItem', grade);
        		$("#cmbStdGradeSrch").jqxDropDownList({ disabled: true });
        		let sClass = $("#cmbStdClazzSrch").jqxDropDownList('getItemByValue', updateTaskOriginalData.sClass == 0 ? '' : updateTaskOriginalData.sClass);
        		$("#cmbStdClazzSrch").jqxDropDownList('selectItem', sClass);
        		$("#cmbStdClazzSrch").jqxDropDownList({ disabled: true });
        	}
        },
        function onError(err) {
            SS.alert( SS.title.ERROR, "Failed to get task data");
        }
    );
}

function onSearchUpdate() {
	tr_update = [];
    SS.sendToServer(
    	'SD_R_01',
        false,
        { taskId: taskId },
        function onSuccess(data) {
        	if (data && data.status && data.status === 'NG') {
                SS.alert( SS.title.ERROR, data.message);
                return;
        	}
            if(data && data.lst) {
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

$(document).ready(function () {
	initUpdate();
    
    $("#btnCancelUpdate").on('click', function() {
         window.location.href = "/archive/task-archive";
    });

    $("#btnApplyToAll").on('click', function() {
    	let rows = $("#grdStudentDebts").jqxGrid('getrows');
    	for (let i=1 ; i<rows.length; i++) {
            $("#grdStudentDebts").jqxGrid('setcellvalue', i, "quantity", rows[0].quantity);
    	}
    });

    $('#btnSave').on('click', function () {
        if ((!tr_update || tr_update.length === 0) && !isUpdateNote) {
            SS.alert('Notification', i18n.lang.common.msg_noDataUpdate)
            return;
        }
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
            	if (data && data.status && data.status === 'NG') {
                    SS.alert( SS.title.ERROR, data.message);
                    return;
            	}
                isUpdateNote = false;
                tr_update = [];
                SS.alert('Notification', i18n.lang.posting.studentdebts.msg_saved);
            }
        );
    });
    
})