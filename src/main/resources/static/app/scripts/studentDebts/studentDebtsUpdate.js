let screenType = "U";

function initUpdate() {
	taskId = $("#iptTaskId").val() > 0 ? $("#iptTaskId").val() : 0;
	
	$("#screen-title").html("Student Debts: Update task ID = " + taskId);
	onSearchUpdate();
    
    $("#cmbStdGradeSrch").jqxDropDownList({ disabled: true });
    $("#cmbStdClazzSrch").jqxDropDownList({ disabled: true });
    $("#cmbStdServiceSrch").jqxDropDownList({ disabled: true });
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
        		
        		onGetInstallments(updateTaskOriginalData.grade, updateTaskOriginalData.serviceId);
        	    onGetService(updateTaskOriginalData.grade);
        		$("#iptPriceSrch").val(updateTaskOriginalData.price);
        		let grade = $("#cmbStdGradeSrch").jqxDropDownList('getItemByValue', updateTaskOriginalData.grade == 0 ? '' : updateTaskOriginalData.grade);
        		$("#cmbStdGradeSrch").jqxDropDownList('selectItem', grade);
        		let sClass = $("#cmbStdClazzSrch").jqxDropDownList('getItemByValue', updateTaskOriginalData.sClass == 0 ? '' : updateTaskOriginalData.sClass);
        		$("#cmbStdClazzSrch").jqxDropDownList('selectItem', sClass);
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

function onGetService(gradeId) {
    SS.sendToServer(
        'SL_R_03',
        false, {
            grade: gradeId,
        },

        function onSuccess(data) {
            if (data && data.lst && data.lst.length > 0) {
            	let dataList = [...data.lst].map(d => {
            		return { serviceId: d.serviceId, serviceName: d.serviceName }
            	});
            	console.log(dataList);
                $("#cmbStdServiceSrch").jqxDropDownList({
                    source: [{serviceId: '', serviceName: ''}, ...dataList],
                    displayMember: "serviceName",
                    valueMember: "serviceId",
                    disabled: true,
                    selectedIndex: 0
                });
                
        		let serviceItem = $("#cmbStdServiceSrch").jqxDropDownList('getItem', updateTaskOriginalData.serviceId);
        		$("#cmbStdServiceSrch").jqxDropDownList('selectItem', serviceItem);
            	
                return;
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

function onGetInstallments(gradeId, serviceId) {
    SS.sendToServer(
        'SL_R_04',
        false, {
            grade: gradeId,
            serviceId: serviceId,
        },
        function onSuccess(data) {
            if (data && data.obj) {
            	let serviceInstallmentsMap = [];
            	if (data.obj.noPayment > 0 && data.obj.amount1 > 0) serviceInstallmentsMap.push({name: '1st installment', value: '1-' + data.obj.amount1});
            	if (data.obj.noPayment > 1 && data.obj.amount2 > 0) serviceInstallmentsMap.push({name: '2nd installment', value: '2-' + data.obj.amount2});
            	if (data.obj.noPayment > 2 && data.obj.amount3 > 0) serviceInstallmentsMap.push({name: '3rd installment', value: '3-' + data.obj.amount3});
            	if (data.obj.noPayment > 3) {            		
            		for (let i = 4, len = data.obj.noPayment; i <= len; i++) {
            			if (data.obj['amount'+i] > 0) serviceInstallmentsMap.push({name: `${i}th installment`, value: i + '-' + data.obj['amount'+i]});
            		}
            	}
                $("#cmbStdInstSrch").jqxDropDownList({
                    source: [{name: '', value: '0-' + data.obj.price}, ...serviceInstallmentsMap],
                    displayMember: "name",
                    valueMember: "value",
                    disabled: true,
                    selectedIndex: 0
                });

        		let installments = $("#cmbStdInstSrch").jqxDropDownList('getItems').filter(i => i.value.includes(updateTaskOriginalData.installment + ""));
        		$("#cmbStdInstSrch").jqxDropDownList('selectItem', installments[0]);

                return;
            }
        },
        function onError(err) {
            SS.alert(SS.title.ERROR, SS.message.ERROR);
        }
    )
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
            SS.alert('Notification', 'No data update')
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
                SS.alert('Notification', 'Update task successfully');
            }
        );
    });
    
})