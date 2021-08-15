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
                {name: 'debit', type: 'string'},
                {name: 'claims', type: 'string'},
                {name: 'balance', type: 'string'},
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
                {text: 'Dedit', datafield: 'debit', align: 'center', cellsalign: 'center', width: '15%,'},
                {text: 'Claim', datafield: 'claims', align: 'center', cellsalign: 'center', width: '15%,'},
                {text: 'Balance', datafield: 'balance', align: 'center', cellsalign: 'center', width: '15%,', cellclassname: function (row, columnfield, value){
                        let convertedValue = parseFloat(value);
                        if (convertedValue < 0) {
                            return 'green';
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
        $("#cmbStdClazzSrch").jqxDropDownList({enableBrowserBoundsDetection: true, source: SS.clazzEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });
        $("#cmbServiceSrch").jqxDropDownList({enableBrowserBoundsDetection: true, source: fnCommon.commonService, displayMember: "name", valueMember: "id", selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });
        $("#iptFromDate").jqxDateTimeInput({height: SS.IPT_HEIGHT, width: '100%', formatString: "dd/MM/yyyy"});
        $("#iptToDate").jqxDateTimeInput({height: SS.IPT_HEIGHT, width: '100%', formatString: "dd/MM/yyyy"});

        $("#grdSchoolOverview").on('rowselect', function (event) {
            rowindex = event.args.rowindex;
            rowdata = $("#grdSchoolOverview").jqxGrid('getrowdata', rowindex)

            fnDetail.onSearch(rowdata);
        });
    },

    onSearch: function () {
        $("#grdSchoolOverview").jqxGrid('clearselection');
        $('#grdSchoolOverview').jqxGrid('refresh');
        let params = {
            fromDate: $('#iptFromDate').val(),
            toDate: $('#iptToDate').val(),
            grade: $('#cmbStdGradeSrch').val(),
            sClass: $('#cmbStdClazzSrch').val(),
            serviceListId: [ $('#cmbServiceSrch').val()],
        };
        SS.sendToServer(
            'OVS_R_01',
            false,
            params,
            function onSuccess(data) {
                fnOverview.gridSource.localdata = data.lst;
                $("#grdSchoolOverview").jqxGrid({ source: fnOverview.gridSource });
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
                {name: 'debit', type: 'string'},
                {name: 'claims', type: 'string'},
                {name: 'balance', type: 'string'},
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
                {text: 'Dedit', datafield: 'debit', align: 'center', cellsalign: 'center', width: '15%,'},
                {text: 'Claim', datafield: 'claims', align: 'center', cellsalign: 'center', width: '15%,'},
                {text: 'Balance', datafield: 'balance', align: 'center', cellsalign: 'center', width: '15%,', cellclassname: function (row, columnfield, value){
                        let convertedValue = parseFloat(value);
                        if (convertedValue < 0) {
                            return 'green';
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
            sClass: $('#cmbStdClazzSrch').val(),
            serviceListId: [ rowdata.headTeacherId],
            sClass: $('#cmbStdClazzSrch').val(),
        };
        SS.sendToServer(
            'OVS_R_02',
            false,
            params,
            function onSuccess(data) {
                fnDetail.gridSource.localdata = data.lst;
                $("#grdSchoolDetail").jqxGrid({ source: fnDetail.gridSource });
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

$(document).ready(function() {
    fnCommon.onServiceSearch();
    fnOverview.init();
    fnDetail.init();
    fnOverview.onSearch();
});
