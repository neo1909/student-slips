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

        for (let i = 0; i < 4; i++) {
            let row = {};
            row["number"] = number[i];
            row["studentId"] = studentId[i];
            row["studentName"] = studentName[i];
            data[i] = row;
        }
        let source = {
            localdata: data,
            datatype: "array"
        };
        let dataAdapter = new $.jqx.dataAdapter(source, {
            loadComplete: function (data) { },
            loadError: function (xhr, status, error) { }
        });

        $("#iptStudentNmSearch").jqxInput({ height: IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...' });
        $("#jqxgrid").jqxGrid(
            {
                source: dataAdapter,
                columns: [
                    { text: 'No.', datafield: 'number', align: 'center', cellsalign:'center', width: '100'},
                    { text: 'ID Number', datafield: 'studentId', align: 'center', cellsalign:'center', width: '150'},
                    { text: 'Name and surname', datafield: 'studentName', align: 'center', cellsalign:'left'}
                ],
                theme: 'bootstrap',
                width: '95%',
                height: 600
            }
        );
        $('#btnCreate').click(function () {
            $("#popupStudent").jqxWindow('open');
        });


        /*
        ** Popup Student
        * */
        $("#popupStudent").jqxWindow({
            isModal: true,
            autoOpen: false,
            height: 550,
            width: 700,
            theme: 'bootstrap',
            title: 'Student',
            position: 'center',
            resizable: false
        });

        $('#iptStdNm').jqxInput({ height: IPT_HEIGHT, width: '100%', placeHolder: 'Enter name...' });

        let srcStdGrade = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
        $("#cmbStdGrade").jqxComboBox({ enableBrowserBoundsDetection: true, source: srcStdGrade, selectedIndex: 0, height: IPT_HEIGHT, width: '100%' });

        let srcStdClass = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        $("#cmbStdClass").jqxComboBox({ enableBrowserBoundsDetection: true, source: srcStdClass, selectedIndex: 0, height: IPT_HEIGHT, width: '100%' });



    },

    popupStudent: {
        create: function () {

        }
    }

};

$(document).ready(function() {
    $.jqx.theme = "bootstrap";
    fn.init();
});

