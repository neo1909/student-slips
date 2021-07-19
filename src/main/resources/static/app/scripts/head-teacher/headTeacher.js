;

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

        $("#grdHeadTeacher").jqxGrid({
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
            height: 400,
            rowsheight: 33
        });

        // Search
        $("#iptHTdNmSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...' });
        $("#cmbHTGradeSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.gradeEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });
        $("#cmbHTClazzSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.clazzEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });

        // Popup Head Teacher
        $("#popupHeadTeacher").jqxWindow({
            isModal: true,
            autoOpen: false,
            height: 380,
            width: 700,
            theme: 'bootstrap',
            title: 'Head teacher detail',
            position: 'center',
            resizable: false
        });

        $('#iptHTNm').jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter name...' });
        $("#cmbHTGrade").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.grade, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%' });
        $("#cmbHTClass").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.clazz, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%' });

        $('#frmHeadTeacher').jqxValidator({
            hintType: 'label',
            rules: [
                { input: '#iptHTNm', message: 'Name is required!', action: 'keyup, blur', rule: 'required' },
                { input: '#iptHTNm', message: 'Name is invalid!', action: 'keyup, blur', rule: 'length=1,150' },
            ]
        });


        /*
        * Init Component Event
        * */
        $('#btnHTSrch').click(function () {
            $('#grdHeadTeacher').jqxGrid('refresh');
            fn.onSearch();
        });

        $('#btnHTCreate').click(function () {
            $("#popupHeadTeacher").jqxWindow('open', fn.popup.open());
        });

        $('#btnCancel').click(function () {
            $("#popupHeadTeacher").jqxWindow('close');
        });

        $('#btnSave').click(function () {
            if (!$('#frmHeadTeacher').jqxValidator('validate')) {
                return;
            }

            fn.onSave();
        });
    },

    onSearch: function () {
        let headTeacherNm = $('#iptHTdNmSrch').val();
        let htGrade = $('#cmbHTGradeSrch').val();
        let htClazz = $('#cmbHTClazzSrch').val();
        if (headTeacherNm) {
            headTeacherNm = headTeacherNm.trim();
        }

        let params = {
            name: headTeacherNm,
            grade: htGrade,
            sClass: htClazz
        };

        SS.sendToServer(
            'HT_R_01',
            false,
            params,
            function onSuccess(data) {
                fn.gridSource.localdata = data.lst;
                $("#grdHeadTeacher").jqxGrid({ source: fn.gridSource });
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    onSave: function () {
        let data = {
            id: $('#iptHTId').val(),
            name: $('#iptHTNm').val().trim(),
            grade: $('#cmbHTGrade').val(),
            sClass: $('#cmbHTClass').val(),
            schoolId: 1,
        };

        if (data.id) {  // Update
            SS.sendToServer(
                'HT_U_01',
                false,
                data,
                function onSuccess(data) {
                    $("#popupHeadTeacher").jqxWindow('close');
                    fn.onSearch();
                }
            );
        } else {    // Insert
            SS.sendToServer(
                'HT_C_01',
                false,
                data,
                function onSuccess(data) {
                    $("#popupHeadTeacher").jqxWindow('close');
                    fn.onSearch();
                }
            );
        }

    },

    onDelete: function (rowIndex) {
        let data = $("#grdHeadTeacher").jqxGrid('getrowdata', rowIndex);
        let headTeacherId = data.id;
        if (headTeacherId) {
            SS.confirm(SS.title.CONFIRM, "Do you want delete ? ", function (result) {
                if (result ) {
                    SS.sendToServer(
                        'HT_D_01',
                        false,
                        { id : headTeacherId },
                        function onSuccess(data) {
                            fn.onSearch();
                        }
                    );
                }
            });
        }
    },

    onUpdate: function (rowIndex) {
        let data = $("#grdHeadTeacher").jqxGrid('getrowdata', rowIndex);
        let headTeacherId = data.id;
        if (headTeacherId != null) {
            $("#popupHeadTeacher").jqxWindow('open', fn.popup.open(headTeacherId));
        }
    },

    popup: {
        reset: function () {
            $('#iptHTNm').val('');
            $('#cmbHTGrade').jqxDropDownList('selectIndex', 0 );
            $('#cmbHTClass').jqxDropDownList('selectIndex', 0 );
            $('#iptHTId').val(null);
        },

        open: function (headTeacherId) {
            fn.popup.reset();

            if (headTeacherId != null) { // Update
                SS.sendToServer(
                    'HT_R_02',
                    false,
                    { id : headTeacherId },
                    function onSuccess(data) {
                        $('#iptHTId').val(data.obj.id);
                        $('#iptHTNm').val(data.obj.name);
                        $('#cmbHTGrade').val(data.obj.grade);
                        $('#cmbHTClass').val(data.obj.sClass);
                    }
                );
            }
        }
    }

};

$(document).ready(function() {
    fn.init();
    fn.onSearch();
});
