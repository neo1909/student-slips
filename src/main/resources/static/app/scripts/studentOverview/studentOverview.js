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
                { name: 'updateDate', type: 'string'}
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
            columns: [
                { text: 'No.', datafield: '', align: 'center', cellsalign:'center', width: '5%'
                    , cellsrenderer: function (rowIndex, column, value, defaultHtml) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 9px;">'+
                            + (rowIndex + 1)
                            + '</div>';
                    }
                },
                { text: 'Name and surname', datafield: 'name', align: 'center', cellsalign:'left', width: '35%,'},
                { text: 'School', datafield: 'schoolName', align: 'center', cellsalign:'left', width: '35%,'},
                { text: 'Grade', datafield: 'grade', align: 'center', cellsalign:'center', width: '9%,'},
                { text: 'Class', datafield: 'sClass', align: 'center', cellsalign:'center', width: '9%,'},
                { text: 'Balance Sheet', cellsalign:'center', width: '7%,'
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
            height: 400,
            rowsheight: 33
        });

        // Search
        $("#iptStdNmSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...',  });
        $("#cmbStdGradeSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.gradeEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });
        $("#cmbStdClazzSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.clazzEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });

        // Popup Student
        $("#popupStudent").jqxWindow({
            isModal: true,
            autoOpen: false,
            height: 600,
            width: 1000,
            theme: 'bootstrap',
            title: 'Student Balance Overview',
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
            SS.confirm(SS.title.CONFIRM, "Do you want delete ? ", function (result) {
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
                        $('#iptStdId').val(data.obj.id);
                        $('#iptStdNmOverviewSrch').val(data.obj.name);
                        $('#cmbStdGradeOverviewSSrch').val(data.obj.grade);
                        $('#cmbStdClassOverviewSrch').val(data.obj.sClass);
                        fnPopup.onSearch(studentId);
                    }
                );
            }
        },

    }
};

$(document).ready(function() {
    fn.init();
    fn.onSearch();
});

