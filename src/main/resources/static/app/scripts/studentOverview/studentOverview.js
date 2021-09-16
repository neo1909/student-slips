let fn = {
    dataset: null,
    gridSource: null,

    init: function() {

        /*
        * Init Component
        * */
        fn.gridSource = {
            datafields: [
                { name: 'id', type: 'int'},
                { name: 'name', type: 'string'},
                { name: 'schoolId', type: 'int'},
                { name: 'schoolName', type: 'string'},
                { name: 'sClass', type: 'int'},
                { name: 'grade', type: 'int'},
                { name: 'delYn', type: 'string'},
                { name: 'insertId', type: 'int'},
                { name: 'insertDate', type: 'string'},
                { name: 'updateId', type: 'int'},
                { name: 'updateDate', type: 'string'},
                { name: 'studentId', type: 'string'}
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

        $("#grdStudents").jqxGrid({
            source: dataAdapter,
            pageable: true,
            columns: [
                { text: i18n.lang.common.vld_no, datafield: '', align: 'center', cellsalign:'center', width: '5%'
                    , cellsrenderer: function (rowIndex, column, value, defaultHtml) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 9px;">'+
                            + (rowIndex + 1)
                            + '</div>';
                    }
                },
                { text: i18n.lang.dataentry.student.studentId, datafield: 'studentId', align: 'center', cellsalign:'left', width: '10%,'},
                { text: i18n.lang.common.vld_nameAndSurname, datafield: 'name', align: 'center', cellsalign:'left', width: '30%,'},
                { text: i18n.lang.common.vld_school, datafield: 'schoolName', align: 'center', cellsalign:'left', width: '30%,'},
                { text: i18n.lang.common.vld_grade, datafield: 'grade', align: 'center', cellsalign:'center', width: '9%,'},
                { text: i18n.lang.common.vld_class, datafield: 'sClass', align: 'center', cellsalign:'center', width: '9%,'},
                { text: i18n.lang.common.vld_balanceSheet, cellsalign:'center', width: '7%,'
                    , cellsrenderer: function (rowIndex, column, value) {
                        return '<div style="text-align: center; margin-top: 4px;">'
                            + '<button alt="Edit" class="btn btn-info btn-icon btn-sm" style="margin-right: 10px" onclick="fn.onUpdate(' + rowIndex +')"><span class="glyphicon glyphicon-menu-right"></span></button>'
                          /*  + '<button alt="Delete" class="btn btn-danger btn-icon btn-sm" onclick="fn.onDelete(' + rowIndex +')"><span class="glyphicon glyphicon-trash"></span></button>'*/
                            + '</div>';
                    }
                }
            ],
            theme: 'bootstrap',
            width: '100%',
            height: SS.grid.height,
            rowsheight: 33
        });
        $("#grdStudents").jqxGrid('localizestrings', SS.grid.localization);

        // Search
        $("#iptStdNmSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: i18n.lang.common.plh_enterSearch });
        $("#cmbStdGradeSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.dataSource.grade('All'), displayMember: 'name', valueMember: 'id', selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });
        $("#cmbStdClazzSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.dataSource.clazz('All'), displayMember: 'name', valueMember: 'id', selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });

        // Popup Student
        $("#popupStudent").jqxWindow({
            isModal: true,
            autoOpen: false,
            height: 720,
            width: 1280,
            theme: 'bootstrap',
            title: i18n.lang.overview.title_overviewStudentPopup,
            position: 'center',
            resizable: false
        });

        $('#btnStdSrch').click(function () {
            $('#grdStudents').jqxGrid('refresh');
            fn.onSearch();
        });

    },

    onSearch: function () {
        let stdNm = $('#iptStdNmSrch').val();
        let stdGrade = $('#cmbStdGradeSrch').val();
        let stdClazz = $('#cmbStdClazzSrch').val();
        if (stdNm) {
            stdNm = stdNm.trim();
        }

        let params = {
            name: stdNm,
            grade: stdGrade,
            sClass: stdClazz
        };

        SS.sendToServer(
            'ST_R_01',
            false,
            params,
            function onSuccess(data) {
                fn.gridSource.localdata = data.lst;
                $("#grdStudents").jqxGrid({ source: fn.gridSource });
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    onDelete: function (rowIndex) {
        let data = $("#grdStudents").jqxGrid('getrowdata', rowIndex);
        let studentId = data.id;
        if (studentId) {
            SS.confirm(SS.title.CONFIRM, i18n.lang.common.msg_delConfirm, function (result) {
                if (result ) {
                    SS.sendToServer(
                        'ST_D_01',
                        false,
                        { id : studentId },
                        function onSuccess(data) {
                            fn.onSearch();
                        }
                    );
                }
            });
        }
    },

    onUpdate: function (rowIndex) {
        let data = $("#grdStudents").jqxGrid('getrowdata', rowIndex);
        let studentId = data.id;
        if (studentId != null) {
            $("#popupStudent").jqxWindow('open', fn.popup.open(studentId));
        }
    },

    popup: {
        reset: function () {

        },

        open: function (studentId) {
            fn.popup.reset();

            if (studentId != null) { // Update
                SS.sendToServer(
                    'ST_R_02',
                    false,
                    { id : studentId },
                    function onSuccess(data) {
                        $('#iptStdId').val(data.obj.studentId);
                        $('#iptSeqNo').val(data.obj.id);
                        $('#iptStdNmOverviewSrch').val(data.obj.name);
                        $('#cmbStdGradeOverviewSSrch').val(data.obj.grade);
                        $('#cmbStdClassOverviewSrch').val(data.obj.sClass);
                        let fromDate = new Date();

                        let currDate = fromDate.getDate();
                        let currMonth = fromDate.getMonth();
                        let currYear = fromDate.getFullYear();
                        if(fromDate.getMonth()<=7){
                            fromDate.setFullYear(currYear-1, currMonth, currDate);
                        }
                        fromDate.setDate(1);
                        fromDate.setMonth(8)
                        fromDate.setHours(0);
                        fromDate.setMinutes(0);
                        fromDate.setMilliseconds(0);

                        $('#iptFromDate').val(fromDate);

                        let toDate = new Date();
                        toDate.setHours(0);
                        toDate.setMinutes(0);
                        toDate.setMilliseconds(0);
                        $('#iptToDate').val(toDate);

                        fnPopup.onSearch( $('#iptFromDate').val(), $('#iptToDate').val());
                    }
                );
            }
        },

    }
};

$(document).ready(function() {
    fn.init();
    fn.onSearch();
    
    $(document).on('keypress', function(e) {
    	if (e.keyCode == 13) {
    		e.preventDefault();
    		fn.onSearch();
    	}
    });
});

