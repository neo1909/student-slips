
(function() {

    let fn = {
        init: function() {
            $("#iptStudentNm").jqxInput({ placeHolder: " Enter...", disabled: false });

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
                    height: 360
                }
            );

        },

    };



    $(document).ready(function() {
        fn.init();
    });

})();