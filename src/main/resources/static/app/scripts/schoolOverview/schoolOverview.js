let fnOverview = {
    dataset: null,
    gridSource: null,

    init: function () {
        /*
        * Init Component
        * */
        fnOverview.gridSource = {
            datafields: [
                {name: 'studentId', type: 'int'},
                {name: 'nameStudent', type: 'string'},
                {name: 'serviceId', type: 'int'},
                {name: 'nameService', type: 'string'},
                {name: 'debit', type: 'int'},
                {name: 'claims', type: 'int'},
                {name: 'balance', type: 'int'},
                {name: 'isHightColor', type: 'int'},
                {name: 'gradeClass', type: 'string'},
                {name: 'headTeacherId', type: 'int'},
                {name: 'headTeacherName', type: 'string'},
            ],
            datatype: "array",
            localdata: fnOverview.dataset
        };

        let dataAdapter = new $.jqx.dataAdapter(fnOverview.gridSource, {
            loadComplete: function (data) {
            },

            loadError: function (xhr, status, error) {
            }
        });

        $("#grdSchoolOverview").jqxGrid({
            source: dataAdapter,
            columns: [
                {
                    text: 'No.', datafield: '', align: 'center', cellsalign: 'center', width: '5%'
                    , cellsrenderer: function (rowIndex, column, value, defaultHtml) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 9px;">' +
                            +(rowIndex + 1)
                            + '</div>';
                    }
                },
                {text: 'Grade/Class', datafield: 'gradeClass', align: 'center', cellsalign: 'center', width: '10%,'},
                {text: 'Head Teacher', datafield: 'headTeacherName', align: 'center', cellsalign: 'left', width: '25%,'},
                {text: 'Services', datafield: 'nameService', align: 'center', cellsalign: 'center', width: '15%,'},
                {text: 'Dedit', datafield: 'debit', align: 'center', cellsalign: 'center', width: '15%,', cellsformat: 'd'},
                {text: 'Claim', datafield: 'claims', align: 'center', cellsalign: 'center', width: '15%,', cellsformat: 'd'},
                {text: 'Balance', datafield: 'balance', align: 'center', cellsalign: 'center', width: '15%,', cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties){
                        let formatValue = value.toLocaleString().replace(/\./g, ",");/*
                        if (formatValue < 0) {
                            return 'green';
                        }*/
                        if (value && value > 0) {
                            return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + formatValue + '</div>';
                        } else {
                            return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; background-color: green; color: white">' + formatValue + '</div>';
                        }
                    }},
            ],
            theme: 'bootstrap',
            width: '100%',
            height: 300,
            rowsheight: 33
        });

        /*
        * Init Component Event
        * */
        $('#btnStdSrch').click(function () {
            $('#grdSchoolOverview').jqxGrid('refresh');
            fnOverview.onSearch();
        });

        // Search
        $("#cmbStdGradeSrch").jqxDropDownList({enableBrowserBoundsDetection: true, source: SS.gradeEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });
       // $("#cmbStdClazzSrch").jqxDropDownList({enableBrowserBoundsDetection: true, source: SS.clazzEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });
        $("#cmbServiceSrch").jqxDropDownList({enableBrowserBoundsDetection: true, source: fnCommon.commonService, displayMember: "name", valueMember: "id", selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });
        $("#iptFromDate").jqxDateTimeInput({height: SS.IPT_HEIGHT, width: '100%', formatString: "dd/MM/yyyy"});
        $("#iptToDate").jqxDateTimeInput({height: SS.IPT_HEIGHT, width: '100%', formatString: "dd/MM/yyyy"});

        $("#grdSchoolOverview").on('rowselect', function (event) {
            rowindex = event.args.rowindex;
            rowdata = $("#grdSchoolOverview").jqxGrid('getrowdata', rowindex)

            fnDetail.onSearch(rowdata);
        });

        SS.sendToServer('SV_R_01', false, {}, function onSuccess(data) {
            let src = [];
            if (data && data.lst) src = [...data.lst];
            originalServiceIdList = data.lst.map(i => i.id);
            src.unshift({id: "", name: "All"});
            $("#cmbServiceSrch").jqxComboBox({ source: src, displayMember: "name", valueMember: "id", height: SS.IPT_HEIGHT, width: '100%', checkboxes: true});
        });
    },

    onSearch: function () {
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
            serviceListId = $("#cmbServiceSrch").jqxComboBox('getCheckedItems').map(i=>i.value);
            $("#cmbServiceSrch").jqxComboBox('getCheckedItems').forEach(i => {
                serviceListString += i.label +  ',';
            });
            serviceListString = serviceListString.slice(0, serviceListString.length-1);
        }

        if (serviceListId.length == 0) {
            SS.alert( SS.title.ERROR, "Service is required");
            return;
        }

        $("#grdSchoolOverview").jqxGrid('clearselection');
        $('#grdSchoolOverview').jqxGrid('refresh');
        let params = {
            fromDate: $('#iptFromDate').val(),
            toDate: $('#iptToDate').val(),
            grade: $('#cmbStdGradeSrch').val(),
           // sClass: $('#cmbStdClazzSrch').val(),
            serviceListId: serviceListId,
        };
        SS.sendToServer(
            'OVS_R_01',
            false,
            params,
            function onSuccess(data) {
                fnOverview.gridSource.localdata = data.lst;
                $("#grdSchoolOverview").jqxGrid({ source: fnOverview.gridSource });
                onCalculateTotal("#grdSchoolOverview");
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    onDelete: function (rowIndex) {
        let data = $("#grdSchoolOverview").jqxGrid('getrowdata', rowIndex);
        let id = data.id;
        if (id) {
            SS.confirm(SS.title.CONFIRM, "Do you want delete ? ", function (result) {
                if (result ) {
                    SS.sendToServer(
                        'SC_D_01',
                        false,
                        { id : id },
                        function onSuccess(data) {
                            fnOverview.onSearch();
                        }
                    );
                }
            });
        }
    },


};

let fnDetail = {
    dataset: null,
    gridSource: null,

    init: function () {
        fnDetail.gridSource = {
            datafields: [
                {name: 'studentId', type: 'int'},
                {name: 'nameStudent', type: 'string'},
                {name: 'serviceId', type: 'int'},
                {name: 'nameService', type: 'string'},
                {name: 'debit', type: 'int'},
                {name: 'claims', type: 'int'},
                {name: 'balance', type: 'int'},
                {name: 'isHightColor', type: 'int'},
                {name: 'gradeClass', type: 'string'},
                {name: 'headTeacherId', type: 'int'},
                {name: 'headTeacherName', type: 'string'},
            ],
            datatype: "array",
            fnDetail: fnOverview.dataset
        };

        let dataAdapter = new $.jqx.dataAdapter(fnDetail.gridSource, {
            loadComplete: function (data) {
            },

            loadError: function (xhr, status, error) {
            }
        });

        $("#grdSchoolDetail").jqxGrid({
            source: dataAdapter,
            columns: [
                {
                    text: 'No.', datafield: '', align: 'center', cellsalign: 'center', width: '5%'
                    , cellsrenderer: function (rowIndex, column, value, defaultHtml) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 9px;">' +
                            +(rowIndex + 1)
                            + '</div>';
                    }
                },
                {text: 'Grade/Class', datafield: 'gradeClass', align: 'center', cellsalign: 'center', width: '10%,'},
                {text: 'Head Teacher', datafield: 'headTeacherName', align: 'center', cellsalign: 'left', width: '25%,'},
                {text: 'Services', datafield: 'nameService', align: 'center', cellsalign: 'center', width: '15%,'},
                {text: 'Dedit', datafield: 'debit', align: 'center', cellsalign: 'center', width: '15%,', cellsformat: 'd'},
                {text: 'Claim', datafield: 'claims', align: 'center', cellsalign: 'center', width: '15%,', cellsformat: 'd'},
                {text: 'Balance', datafield: 'balance', align: 'center', cellsalign: 'center', width: '15%,', cellsformat: 'd', cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties){
                        let formatValue = value.toLocaleString().replace(/\./g, ",");/*
                        if (formatValue < 0) {
                            return 'green';
                        }*/
                        if (value && value > 0) {
                            return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; ">' + formatValue + '</div>';
                        } else {
                            return '<div style="padding: 4px; padding-top: 9.5px; width: 100%; height: 100%; text-align: ' + columnproperties.cellsalign + '; background-color: green; color: white">' + formatValue + '</div>';
                        }
                    }},
            ],
            theme: 'bootstrap',
            width: '100%',
            height: 300,
            rowsheight: 33
        });
    },

    onSearch: function (rowdata) {

        $("#grdSchoolOverview").jqxGrid('clearselection');
        $('#grdSchoolOverview').jqxGrid('refresh');
        let params = {
            fromDate: $('#iptFromDate').val(),
            toDate: $('#iptToDate').val(),
            grade: $('#cmbStdGradeSrch').val(),
            //sClass: $('#cmbStdClazzSrch').val(),
            serviceListId: [ rowdata.headTeacherId],
            //sClass: $('#cmbStdClazzSrch').val(),
        };
        SS.sendToServer(
            'OVS_R_02',
            false,
            params,
            function onSuccess(data) {
                fnDetail.gridSource.localdata = data.lst;
                $("#grdSchoolDetail").jqxGrid({ source: fnDetail.gridSource });
                onCalculateTotal("#grdSchoolDetail");
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    }

};

let fnCommon = {
    commonService: null,

    onServiceSearch: function () {
        SS.sendToServer(
            'SV_R_01',
            false,
            {name: ""},
            function onSuccess(data) {
                fnCommon.commonService = data.lst;
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },
};

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

        if (gridId === '#grdSchoolOverview') {
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

function onPrint() {
    let gridContent = $("#grdSchoolOverview").jqxGrid('exportdata', 'html');
    let gridDetailContent = $("#grdSchoolDetail").jqxGrid('exportdata', 'html');
    let newWindow = window.open('', '', 'width=800, height=500'),
        document = newWindow.document.open(),
        pageContent =
            '<!DOCTYPE html>\n' +
            '<html>\n' +
            '<head>\n' +
            '<meta charset="utf-8" />\n' +
            '<title>School Overview Balance</title>\n' +
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

let originalServiceIdList = [];
let checkedAllServices = false;

$(document).ready(function() {
    fnCommon.onServiceSearch();
    fnOverview.init();
    fnDetail.init();


    $("#cmbServiceSrch").on('checkChange', function(event) {
        if (event.args) {
            var item = event.args.item;
            var value = item.value;
            var label = item.label;
            var checked = item.checked;
            if (label === 'All') {
                let allItems = $("#cmbServiceSrch").jqxComboBox('getItems');
                if (checked) {
                    for (let i=1; i<allItems.length; i++) {
                        $("#cmbServiceSrch").jqxComboBox('uncheckItem', i);
                        $("#cmbServiceSrch").jqxComboBox('disableItem', i);
                    }
                    checkedAllServices = true;
                } else {
                    for (let i=1; i<allItems.length; i++) {
                        $("#cmbServiceSrch").jqxComboBox('enableItem', i);
                    }
                    checkedAllServices = false;
                }
            }
        }
    });

    $('#btnPrint').click(function () {
        onPrint()
    });
    $("#cmbServiceSrch").jqxComboBox('checkIndex', 0);
    fnOverview.onSearch();
});
