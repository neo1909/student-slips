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
                { text: 'No.', datafield: '', align: 'center', cellsalign:'center', width: '5%'
                    , cellsrenderer: function (rowIndex, column, value, defaultHtml) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 9px;">'+
                            + (rowIndex + 1)
                            + '</div>';
                    }
                },
                { text: 'Student Id', datafield: 'studentId', align: 'center', cellsalign:'left', width: '10%,'},
                { text: 'Name and surname', datafield: 'name', align: 'center', cellsalign:'left', width: '30%,'},
                { text: 'School', datafield: 'schoolName', align: 'center', cellsalign:'left', width: '30%,'},
                { text: 'Grade', datafield: 'grade', align: 'center', cellsalign:'center', width: '9%,'},
                { text: 'Class', datafield: 'sClass', align: 'center', cellsalign:'center', width: '9%,'},
                { text: '', cellsalign:'center', width: '7%,'
                    , cellsrenderer: function (rowIndex, column, value) {
                        return '<div style="text-align: center; margin-top: 4px;">'
                            + '<button alt="Edit" class="btn btn-info btn-icon btn-sm" style="margin-right: 10px" onclick="fn.onUpdate(' + rowIndex +')"><span class="glyphicon glyphicon-edit"></span></button>'
                            + '<button alt="Delete" class="btn btn-danger btn-icon btn-sm" onclick="fn.onDelete(' + rowIndex +')"><span class="glyphicon glyphicon-trash"></span></button>'
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
        $("#iptStdNmSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...' });
        $("#cmbStdGradeSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.dataSource.arr_gradeAll(), selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });
        $("#cmbStdClazzSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.dataSource.arr_clazzAll(), selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });

        // Popup Student
        $("#popupStudent").jqxWindow({
            isModal: true,
            autoOpen: false,
            height: 380,
            width: 700,
            theme: 'bootstrap',
            title: 'Student detail',
            position: 'center',
            resizable: false
        });

        $('#iptStdNm').jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter name...' });
        $("#cmbStdGrade").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.dataSource.arr_grade(), selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%' });
        $("#cmbStdClass").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.dataSource.arr_clazz(), selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%' });

        $('#frmStudent').jqxValidator({
            hintType: 'label',
            rules: [
                { input: '#iptStdNm', message: 'Name is required!', action: 'keyup, blur', rule: 'required' },
                { input: '#iptStdNm', message: 'Name is invalid!', action: 'keyup, blur', rule: 'length=1,150' },
            ]
        });


        /*
        * Init Component Event
        * */
        $('#btnStdSrch').click(function () {
            $('#grdStudents').jqxGrid('refresh');
            fn.onSearch();
        });

        $('#btnStdCreate').click(function () {
            $("#popupStudent").jqxWindow('open', fn.popup.open());
        });

        $('#btnCancel').click(function () {
            $("#popupStudent").jqxWindow('close');
        });

        $('#btnSave').click(function () {
            if (!$('#frmStudent').jqxValidator('validate')) {
                return;
            }

            fn.onSave();
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
            grade: stdGrade == 'All' ? '' : stdGrade,
            sClass: stdClazz == 'All' ? '' : stdClazz
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

    onSave: function () {
        let data = {
            id: $('#iptStdId').val(),
            name: $('#iptStdNm').val().trim(),
            grade: $('#cmbStdGrade').val(),
            sClass: $('#cmbStdClass').val()
        };

        if (data.id) {  // Update
            SS.sendToServer(
                'ST_U_01',
                false,
                data,
                function onSuccess(data) {
                    $("#popupStudent").jqxWindow('close');
                    fn.onSearch();
                }
            );
        } else {    // Insert
            SS.sendToServer(
                'ST_C_01',
                false,
                data,
                function onSuccess(data) {
                    $("#popupStudent").jqxWindow('close');
                    fn.onSearch();
                }
            );
        }

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
        console.log(rowIndex);
        let data = $("#grdStudents").jqxGrid('getrowdata', rowIndex);
        let studentId = data.id;
        if (studentId != null) {
            $("#popupStudent").jqxWindow('open', fn.popup.open(studentId));
        }
    },

    popup: {
        reset: function () {
            $('#iptStdNm').val('');
            $('#cmbStdGrade').jqxDropDownList('selectIndex', 0 );
            $('#cmbStdClass').jqxDropDownList('selectIndex', 0 );
            $('#iptStdId').val(null);
        },

        open: function (studentId) {
            fn.popup.reset();

            if (studentId != null) { // Update
                SS.sendToServer(
                    'ST_R_02',
                    false,
                    {id: studentId},
                    function onSuccess(data) {
                        $('#iptStdId').val(data.obj.id);
                        $('#iptStdNm').val(data.obj.name);
                        $('#cmbStdGrade').val(data.obj.grade);
                        $('#cmbStdClass').val(data.obj.sClass);
                    }
                );
            }
        }
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
    })
});
