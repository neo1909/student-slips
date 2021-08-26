let originalListGradeIds = [];
var tr_update = [];
var tr_insert = [];
var tr_delete = [];
var screenType = '';

let fn = {
    dataset: null,
    gridSource: null,
    init: function () {

        /*
        * Init Component
        * */
        fn.gridSource = {
            datafields: [

                { name: 'groupId', type: 'int' },
                { name: 'name', type: 'string' },

                { name: 'suppliersId', type: 'int' },
                { name: 'supplierName', type: 'string' },

                { name: 'schoolId', type: 'int' },

                { name: 'serviceId', type: 'int' },
                { name: 'serviceName', type: 'string' },

                { name: 'price', type: 'number' },
                { name: 'noPayment', type: 'int' },
                { name: 'grade', type: 'int' },

                { name: 'amount1', type: 'number' },
                { name: 'amount2', type: 'number' },
                { name: 'amount3', type: 'number' },
                { name: 'amount4', type: 'number' },
                { name: 'amount5', type: 'number' },
                { name: 'amount6', type: 'number' },
                { name: 'amount7', type: 'number' },
                { name: 'amount8', type: 'number' },
                { name: 'amount9', type: 'number' },
                { name: 'amount12', type: 'number' },
                { name: 'amount11', type: 'number' },
                { name: 'amount12', type: 'number' },
                { name: 'listGradeIdsStr', type: 'string' },

                { name: 'delYn', type: 'string' },
                { name: 'insertId', type: 'int' },
                { name: 'insertDate', type: 'string' },
                { name: 'updateId', type: 'int' },
                { name: 'updateDate', type: 'string' }
            ],
            datatype: "array",
            localdata: fn.dataset
        };

        let dataAdapter = new $.jqx.dataAdapter(fn.gridSource, {
            loadComplete: function (data) {
            },

            loadError: function (xhr, status, error) {
            }
        });

        $("#grdDetail").jqxGrid({
            source: dataAdapter,
            columns: [
                {
                    text: 'No.', datafield: '', align: 'center', cellsalign: 'center', width: '5%'
                    , cellsrenderer: function (rowIndex, column, value, defaultHtml) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 9px;">' +
                            + (rowIndex + 1)
                            + '</div>';
                    }
                },
                { text: 'Name', datafield: 'name', align: 'center', cellsalign: 'left', width: '15%' },
                { text: 'Supplier Name', datafield: 'supplierName', align: 'center', cellsalign: 'left', width: '15%' },
                { text: 'Service Name', datafield: 'serviceName', align: 'center', cellsalign: 'left', width: '15%' },
                { text: 'Price', datafield: 'price', align: 'center', cellsalign: 'right', width: '20%', cellsformat: 'd2' },
                { text: 'No. Payment', datafield: 'noPayment', align: 'center', cellsalign: 'right', width: '10%' },
                { text: 'Grade', datafield: 'listGradeIdsStr', align: 'center', cellsalign: 'center', width: '10%' },

                {
                    text: 'Actions', cellsalign: 'center', width: '10%,'
                    , cellsrenderer: function (rowIndex, column, value) {
                        return '<div style="text-align: center; margin-top: 4px;">'
                            + '<button alt="Edit" class="btn btn-info btn-icon btn-sm" style="margin-right: 10px" onclick="fn.onUpdate(' + rowIndex + ')"><span class="glyphicon glyphicon-edit"></span></button>'
                            + '<button alt="Delete" class="btn btn-danger btn-icon btn-sm" onclick="fn.onDelete(' + rowIndex + ')"><span class="glyphicon glyphicon-trash"></span></button>'
                            + '</div>';
                    }
                }
            ],
            theme: 'bootstrap',
            width: '100%',
            height: 400,
            rowsheight: 33
        });
        let localizationobj = {
        	currencysymbol: "",
    		decimalseparator: ",",
    		thousandsseparator: "."
        }
        $("#grdDetail").jqxGrid('localizestrings', localizationobj);

        // Search
        $("#iptNmSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...' });

        // Popup
        $("#popupDetail").jqxWindow({
            isModal: true,
            autoOpen: false,
            height: 600,
            width: 1000,
            theme: 'bootstrap',
            title: 'Supplier Service detail',
            position: 'center',
            resizable: false
        });

        $('#iptNm').jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter name...' });
        $("#cmbSupplier").jqxDropDownList({ enableBrowserBoundsDetection: true, height: SS.IPT_HEIGHT, width: '100%' });
        $("#cmbService").jqxDropDownList({ enableBrowserBoundsDetection: true,source: [], selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', disabled: true });
        $("#cmbGrade").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.grade, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', checkboxes: true });
        $("#cmbNoPayment").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.noPayment, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%' });

        $("#iptPrice").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, min: 0, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt01").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt02").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt03").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt04").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt05").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt06").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt07").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt08").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt09").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt10").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt11").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $("#iptAmt12").jqxNumberInput({ width: '100%', height: SS.IPT_HEIGHT, inputMode: 'simple', spinButtons: false, groupSeparator: ".", decimalSeparator: "," });
        $('#btnSrch').click(function () {
            $('#grdDetail').jqxGrid('refresh');
            fn.onSearch();
        });

        $('#btnCreate').click(function () {
        	screenType = 'I';
            $("#popupDetail").jqxWindow('open', fn.popup.open());
        });

        $('#btnCancel').click(function () {
            $("#popupDetail").jqxWindow('close');
        });

        $('#btnSave').click(function () {
            fn.onSave();
        });
        

		$("#formCreateUpdateSupplierService").jqxValidator({
			hintType: 'label',
            rules: [
                { input: '#iptNm', message: 'Name is required', action: 'keyup, blur', rule: 'required' },
                { input: '#cmbSupplier', message: 'Supplier is required', action: 'change, keyup, blur', rule: function () {
                		return ($('#cmbSupplier').val() > 0)
                	} 
                },
                { input: '#cmbService', message: 'Service is required', action: 'change, keyup, blur', rule: function () {
            			return ($('#cmbService').val() > 0)
            		}  
                },
                { input: '#cmbGrade', message: 'Grade is required', action: 'blur', rule: function () {
        				return ($('#cmbGrade').val() && $('#cmbGrade').val() != '')
        			}
                },
                { input: '#cmbNoPayment', message: 'No. of Payment is required', action: 'change, keyup, blur', rule: function () {
            			return ($('#cmbNoPayment').val() > 0)
            		}
                },
            ]
		});
    },

    onSearch: function () {
        let params = {
            name: $('#iptNmSrch').val() ? $('#iptNmSrch').val().trim() : ""
        };
        SS.sendToServer(
            'SLG_R_01',
            false,
            params,
            function onSuccess(data) {
                fn.gridSource.localdata = data.lst;
                $("#grdDetail").jqxGrid({ source: fn.gridSource });
            },

            function onError(err) {
                SS.alert(SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    convertStringToNumber: function (num) {
        return Number(num)
    },

    onSave: function () {
    	if (!$("#formCreateUpdateSupplierService").jqxValidator('validate')) return;
        let data = {
            groupId : $('#iptId').val(),
            name: $('#iptNm').val().trim(),
            supplierId: $('#cmbSupplier').val(),
            serviceId: $('#cmbService').val(),
            listGradeIds: Array.from(String($('#cmbGrade').val().replaceAll(',',"")), fn.convertStringToNumber),
            price: $('#iptPrice').val(),
            noPayment: $('#cmbNoPayment').val(),
            amount1: $('#iptAmt01').val(),
            amount2: $('#iptAmt02').val(),
            amount3: $('#iptAmt03').val(),
            amount4: $('#iptAmt04').val(),
            amount5: $('#iptAmt05').val(),
            amount6: $('#iptAmt06').val(),
            amount7: $('#iptAmt07').val(),
            amount8: $('#iptAmt08').val(),
            amount9: $('#iptAmt09').val(),
            amount10: $('#iptAmt10').val(),
            amount11: $('#iptAmt11').val(),
            amount12: $('#iptAmt12').val()
        };

        if (data.groupId) {  // Update
            SS.sendToServer(
                'SL_U_03',
                false,
                Object.assign(data, {
                	trInsert: tr_insert,
                	trUpdate: tr_update,
                	trDelete: tr_delete,
                }),
                function onSuccess(data) {
                    $("#popupDetail").jqxWindow('close');
                    fn.onSearch();
                }
            );
        } else {    // Insert
            SS.sendToServer(
                'SL_C_03',
                false,
                data,
                function onSuccess(data) {
                    $("#popupDetail").jqxWindow('close');
                    fn.onSearch();
                }
            );
        }

    },

    onDelete: function (rowIndex) {
        let data = $("#grdDetail").jqxGrid('getrowdata', rowIndex);
        let id = data.groupId;
        if (id) {
            SS.confirm(SS.title.CONFIRM, "Do you want delete ? ", function (result) {
                if (result) {
                    SS.sendToServer(
                        'SL_D_03',
                        false,
                        { groupId: id },
                        function onSuccess(data) {
                            fn.onSearch();
                        }
                    );
                }
            });
        }
    },

    onUpdate: function (rowIndex) {
    	screenType = 'U';
        let data = $("#grdDetail").jqxGrid('getrowdata', rowIndex);
        let id = data.groupId;
        if (id != null) {
            $("#popupDetail").jqxWindow('open', fn.popup.open(id));
        }
    },

    getService: function (id) {
        if (id) {
            SS.sendToServer(
                'SV_R_01',
                false,
                {
                    supplierId: id
                },
                function onSuccess(data) {
                    if (data && data.lst && data.lst.length > 0) {
                        $("#cmbService").jqxDropDownList({
                            source: [...data.lst],
                            displayMember: "name",
                            valueMember: "id",
                            disabled: false,
                            selectedIndex: 0
                        })
                        return
                    }
                    $("#cmbService").jqxDropDownList({
                        disabled: true,
                        source: [],
                    })
                },

                function onError(err) {
                    fn._srcService = [];
                    SS.alert(SS.title.ERROR, SS.message.ERROR);
                }
            );
        }
    },


    popup: {
        reset: function () {
            $('#iptId').val(null);
            $('#iptPrice').val("");
            $('#iptNm').val("");
            $('#cmbGrade').jqxDropDownList('uncheckAll');
            $('#cmbNoPayment').jqxDropDownList('selectIndex', 0 );
            $('#cmbSupplier').jqxDropDownList('selectIndex', 0 );
            $('#cmbService').jqxDropDownList('selectIndex', 0 );
            $('#iptAmt01').val("");
            $('#iptAmt02').val("");
            $('#iptAmt03').val("");
            $('#iptAmt04').val("");
            $('#iptAmt05').val("");
            $('#iptAmt06').val("");
            $('#iptAmt07').val("");
            $('#iptAmt08').val("");
            $('#iptAmt09').val("");
            $('#iptAmt10').val("");
            $('#iptAmt11').val("");
            $('#iptAmt12').val("");
        },


        getSupplier: function () {
            SS.sendToServer(
                'SL_R_01',
                false,
                {
                    name: ""
                },
                function onSuccess(data) {
                    $("#cmbSupplier").jqxDropDownList({ source: [{}, ...data.lst], displayMember: 'name', valueMember: 'id' })
                },
                function onError(err) {
                    SS.alert(SS.title.ERROR, SS.message.ERROR);
                }
            );
        },

        open: function (id) {
            fn.popup.reset();
            fn.popup.getSupplier();
            ;
            if (id != null) { // Update
                SS.sendToServer(
                    'SLG_R_02',
                    false,
                    { groupId: id},
                    function onSuccess(data) {
                        if (Object.keys(data).length > 0) {
                            let obj = data.obj;
                            $('#iptId').val(obj.groupId);
                            $('#iptPrice').val(obj.price);
                            $('#iptNm').val(obj.name);
                            $('#cmbSupplier').val(obj.supplierId);
                            $('#cmbService').val(obj.serviceId);
                            originalListGradeIds = [...obj.listGradeIds];
                            for(let i = 0; i<= obj.listGradeIds.length ; i++) {
                                $("#cmbGrade").jqxDropDownList('checkItem', obj.listGradeIds[i]);
                            }
                             // loop grade to bind checked
                            $('#cmbNoPayment').val(obj.noPayment);
                            $('#iptAmt01').val(obj.amount1);
                            $('#iptAmt02').val(obj.amount2);
                            $('#iptAmt03').val(obj.amount3);
                            $('#iptAmt04').val(obj.amount4);
                            $('#iptAmt05').val(obj.amount5);
                            $('#iptAmt06').val(obj.amount6);
                            $('#iptAmt07').val(obj.amount7);
                            $('#iptAmt08').val(obj.amount8);
                            $('#iptAmt09').val(obj.amount9);
                            $('#iptAmt10').val(obj.amount10);
                            $('#iptAmt11').val(obj.amount11);
                            $('#iptAmt12').val(obj.amount12);
                        }
                    }
                );
            }
        }
    }

};


function diffArray(arr1, arr2) {
	return new Set([...(new Set(arr1))].filter(x => !(new Set(arr2)).has(x)));
};

$(document).ready(function () {
    fn.init();
    fn.onSearch();
    
    $(document).on('keypress', function(e) {
    	if (e.keyCode == 13) {
    		e.preventDefault();
    		fn.onSearch();
    	}
    });
    
    $('#cmbSupplier').on('change', function (event) {
        if (event.args && event.args.item && event.args.item.originalItem.id) {
            const supplierId = event.args.item.originalItem.id;
            return fn.getService(supplierId);
        }
        $("#cmbService").jqxDropDownList({
            disabled: true,
            source: [],
        })
    })
    $("#cmbNoPayment").on('change', function (event) {
        $('#iptAmt01').val("");
        $('#iptAmt02').val("");
        $('#iptAmt03').val("");
        $('#iptAmt04').val("");
        $('#iptAmt05').val("");
        $('#iptAmt06').val("");
        $('#iptAmt07').val("");
        $('#iptAmt08').val("");
        $('#iptAmt09').val("");
        $('#iptAmt10').val("");
        $('#iptAmt11').val("");
        $('#iptAmt12').val("");
        if (event.args && event.args.item) {
            const id = event.args.item.originalItem;
            let arrPay = document.querySelectorAll('.amountPay');
            for(let j=1; j<= arrPay.length; j++){
                arrPay[j-1].style.display = "none";
            }
            for (let i = 1; i <= id; i++) {
                arrPay[i-1].style.display = "block";
            }
        }
    });
    $("#cmbGrade").on('checkChange', function (event) {
    	if (event.args && screenType == 'U') {
		    var checkedItems = $("#cmbGrade").jqxDropDownList('getCheckedItems').map(i => Number(i.value));
            tr_insert = [...diffArray(checkedItems, originalListGradeIds)];
            tr_delete = [...diffArray(originalListGradeIds, checkedItems)];
            tr_update = originalListGradeIds.filter(grade => ![...tr_insert, ...tr_delete].includes(grade));
    	}
    });
});

