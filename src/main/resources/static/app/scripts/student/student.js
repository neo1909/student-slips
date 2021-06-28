;

const IPT_HEIGHT = 32;

let fn = {

    init: function() {

        let data = new Array();
        let number = [
            "1", "2", "3", "4"
        ];
        let studentId = [
            "001", "002", "003", "004"
        ];
        let studentName = [
            "Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso"
        ];
        let studentClass = [
            "1", "2", "3", "4"
        ];
        let studentGrade = [
            "1", "2", "3", "4"
        ];

        for (let i = 0; i < 4; i++) {
            let row = {};
            row["number"] = number[i];
            row["studentId"] = studentId[i];
            row["studentName"] = studentName[i];
            row["studentClass"] = studentClass[i];
            row["studentGrade"] = studentGrade[i];
            data[i] = row;
        }
        let source = {
            localdata: data,
            datatype: "array"
        };
        let dataAdapter = new $.jqx.dataAdapter(source, {
            autoBind: true,
            loadComplete: function (data) { },
            loadError: function (xhr, status, error) { }
        });

        $("#iptStdNmSrch").jqxInput({ height: IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...' });
        $("#cmbStdGradeSrch").jqxInput({ height: IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...' });
        $("#cmbStdClazzSrch").jqxInput({ height: IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...' });

        $("#grdStudents").jqxGrid(
            {
                source: dataAdapter,
                columns: [
                    { text: 'No.', datafield: 'number', align: 'center', cellsalign:'center', width: '8%'},
                    { text: 'ID Number', datafield: 'studentId', align: 'center', cellsalign:'center', width: '18%'},
                    { text: 'Name and surname', datafield: 'studentName', align: 'center', cellsalign:'left', width: '48%,'},
                    { text: 'Grade', datafield: 'studentGrade', align: 'center', cellsalign:'center', width: '8%,'},
                    { text: 'Class', datafield: 'studentClass', align: 'center', cellsalign:'center', width: '8%,'},
                    { text: '', cellsalign:'center', width: '10%,'
                        , cellsrenderer: function (row, column, value) {

                            return '<div style="text-align: center; margin-top: 5px;">'
                                + '<button alt="Edit" class="btn btn-info btn-icon btn-sm" style="margin-right: 10px" onclick="fn.onUpdate(' + row +')"><span class="glyphicon glyphicon-edit"></span></button>'
                                + '<button alt="Delete" class="btn btn-danger btn-icon btn-sm" onclick="fn.onDelete(' + row +')"><span class="glyphicon glyphicon-trash"></span></button>'
                                + '</div>';
                        }
                    }
                ],
                theme: 'bootstrap',
                width: '100%',
                height: 600,
                rowsheight: 36
            }
        );

        $('#btnStdCreate').click(function () {
            $("#popupStudent").jqxWindow('open', fn.popupStudent.create());
        });

        $('#btnStdSrch').click(function () {
            data = new Array();
            source.localdata = data;
            $('#grdStudents').jqxGrid('refresh');
            fn.onSearch();
        });


        /*
        ** Popup Student
        * */
        $("#popupStudent").jqxWindow({
            isModal: true,
            autoOpen: false,
            height: 380,
            width: 700,
            theme: 'bootstrap',
            title: 'Student',
            position: 'center',
            resizable: false
        });

        $('#iptStdNm').jqxInput({ height: IPT_HEIGHT, width: '100%', placeHolder: 'Enter name...' });

        $("#cmbStdGrade").jqxComboBox({ enableBrowserBoundsDetection: true, source: SS.grade, selectedIndex: 0, height: IPT_HEIGHT, width: '100%' });

        $("#cmbStdClass").jqxComboBox({ enableBrowserBoundsDetection: true, source: SS.clazz, selectedIndex: 0, height: IPT_HEIGHT, width: '100%' });

    },

    onSearch: function () {
        let stdNm = $('#iptStdNmSrch').val();
        let stdGrade = $('#cmbStdGradeSrch').val();
        let stdClazz = $('#cmbStdClazzSrch').val();

        let params = {};

        SS.sendToServer(
            'ST_R_01',
            params,

            function onSuccess(data) {
            },

            function onError(err) {
                alert('Error');
            }
        );

    },

    onDelete: function (row) {
        let data = $("#grdStudents").jqxGrid('getrowdata', row);

        if (confirm("Delete students ?")) {
            alert("Delete: " + data.studentName);
        }
    },

    onUpdate: function (row) {
        let data = $("#grdStudents").jqxGrid('getrowdata', row);
        $("#popupStudent").jqxWindow('open', fn.popupStudent.create(data.studentId));
        alert("Update: " + data.studentName);
    },

    popupStudent: {
        create: function (id) {
            alert(id);
        }
    }

};

$(document).ready(function() {
    $.jqx.theme = "bootstrap";
    fn.init();
});

