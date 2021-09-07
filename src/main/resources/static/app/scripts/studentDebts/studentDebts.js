let screenType = "I";

function initSearch() {
    
    $('#btnPrint').prop("disabled", true);

	taskId = $("#iptTaskId").val() > 0 ? $("#iptTaskId").val() : 0;
	
	$("#btnCancelUpdate").remove();
	$("#btnStdSrch").show();
}

function resetFields() {
	$("#iptComment").val('');
};

function onSearch() {
	resetFields();
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
        	if (data && data.status && data.status === 'NG') {
                SS.alert( SS.title.ERROR, data.message);
                return;
        	}
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
            	let dataList = [...data.lst].map(d => {
            		return { serviceId: d.serviceId, serviceName: d.serviceName }
            	});
                $("#cmbStdServiceSrch").jqxDropDownList({
                    source: [{serviceId: '', serviceName: ''}, ...dataList],
                    displayMember: "serviceName",
                    valueMember: "serviceId",
                    disabled: false,
                    selectedIndex: 0
                });
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
	if (!serviceId) return;
    SS.sendToServer(
        'SL_R_04',
        false, {
            grade: gradeId,
            serviceId: serviceId,
        },
        function onSuccess(data) {
            if (data && data.obj) {
            	let src = [];
            	if (data.obj.noPayment <= 1) {            		
            		src = [{name: '1st installment', value: `1-${data.obj.price}`}] 
            	} else {
            		src = [{name: '1st installment', value: `1-${data.obj.amount1}`}];
                	if (data.obj.noPayment > 1) src.push({name: '2nd installment', value: `2-${data.obj.amount2}`});
                	if (data.obj.noPayment > 2) src.push({name: '3rd installment', value: `3-${data.obj.amount3}`});
                	if (data.obj.noPayment > 3) {            		
                		for (let i = 4, len = data.obj.noPayment; i <= len; i++) {
                			src.push({name: `${i}th installment`, value: `${i}-${data.obj['amount'+i]}`});
                		}
                	}
            	}
            	
                $("#cmbStdInstSrch").jqxDropDownList({
                    source: [...src],
                    displayMember: "name",
                    valueMember: "value",
                    disabled: false,
                    selectedIndex: 0
                })
                return;
            }
        },
        function onError(err) {
            SS.alert(SS.title.ERROR, SS.message.ERROR);
        }
    )
}


$(document).ready(function () {
    
	initSearch();
    
    onGetService(0);
    
    $(document).on('keypress', function(e) {
    	if (e.keyCode == 13) {
    		e.preventDefault();
    		onSearch();
    	}
    });
    
    $('#btnStdSrch').click(function () {
        $('#grdStudentDebts').jqxGrid('refresh');
        onSearch();
    });

    $('#cmbStdGradeSrch').on('change', function (event) {
        if (event.args && event.args.item) {
            const gradeId = event.args.item.originalItem.id;
            onGetService(gradeId);
        }
    })

    $('#cmbStdServiceSrch').on('change', function (event) {
    	let priceItem = event.args.item.originalItem.price ? event.args.item.originalItem.price : "";
    	$("#iptPriceSrch").val(priceItem);
    	selectedSupplierId = event.args.item.originalItem.supplierId ? event.args.item.originalItem.supplierId : 0;
    	onGetInstallments($("#cmbStdGradeSrch").val(), $('#cmbStdServiceSrch').val());
    });

    $('#cmbStdInstSrch').on('change', function (event) {
    	let installment = event.args.item.value ? event.args.item.value : "";
    	$("#iptPriceSrch").val(Number(installment.split("-")[1]));
    });

    $("#btnApplyToAll").on('click', function() {
    	let rows = $("#grdStudentDebts").jqxGrid('getrows');
    	for (let i=1 ; i<rows.length; i++) {
            $("#grdStudentDebts").jqxGrid('setcellvalue', i, "quantity", rows[0].quantity);
    	}
    });
    

    $('#btnSave').on('click', function () {
	    if (!tr_update || tr_update.length === 0) {
	        SS.alert('Notification', 'No data update')
	        return;
	    }
	    
	    let data = {
	    	suppliersId: selectedSupplierId,
	        serviceId: $('#cmbStdServiceSrch').val(),
	        grade: $('#cmbStdGradeSrch').val(),
	        sClass: $('#cmbStdClazzSrch').val(),
	        price: $("#iptPriceSrch").val(),
	        debitDate: $("#iptDateSrch").val(),
	        purpose: $('#iptComment').val(),
	        installment: Number($("#cmbStdInstSrch").val().split("-")[0]),
	        studentsDebtsList: tr_update
	    }
	    SS.sendToServer(
	        'SD_C_01',
	        false,
	        data,
	        function onSuccess(data) {
	        	if (data && data.status && data.status === 'NG') {
	                SS.alert( SS.title.ERROR, data.message);
	                return;
	        	}
	            isUpdateNote = false;
	            tr_update = [];
	            $('#btnPrint').prop("disabled", false);
	            SS.alert('Notification', 'Save task successfully');
	        }
	    );
    });
    
})