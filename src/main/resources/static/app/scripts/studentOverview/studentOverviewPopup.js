let fnPopup = {
    dataset: null,
    gridSource: null,

    init: function() {

        /*
        * Init Component
        * */
        fnPopup.gridSource = {
            datafields: [
                { name: 'id', type: 'id'},
                { name: 'date', type: 'date'},
                { name: 'description', type: 'string'},
                { name: 'debit', type: 'int'},
                { name: 'print', type: 'int'},
                { name: 'claims', type: 'int'},
                { name: 'balance', type: 'int'},
                { name: 'rowType', type: 'int'},
            ],
            datatype: "array",
            localdata: fnPopup.dataset
        };

        let dataAdapter = new $.jqx.dataAdapter(fnPopup.gridSource, {
            loadComplete: function (data) {
            },

            loadError: function (xhr, status, error) {
            }
        });

        $("#grdStudentBalance").jqxGrid({
            source: dataAdapter,
            columns: [
                { text: 'Date', datafield: 'date', align: 'center', cellsalign:'center', width: '20%', cellsformat: 'D' },

                { text: 'Description of Service', datafield: 'description', align: 'center', cellsalign:'left', width: '30%,'},
                { text: 'Debit', datafield: 'debit', align: 'center', cellsalign:'left', width: '15%,'},
                { text: 'Claim', datafield: 'claims', align: 'center', cellsalign:'center', width: '15%,'},
                { text: 'Balance', datafield: 'balance', align: 'center', cellsalign:'center', width: '15%,'},
                { text: 'Print', datafield: 'print', cellsalign:'center', width: '5%,'
                    , cellsrenderer: function (row, rowIndex, column, value) {

                    if(column === 'false') {
                        return '<div style="text-align: center; margin-top: 4px;"> </div>';
                    }

                    return '<div style="text-align: center; margin-top: 4px;">'
                        + '<button alt="Edit" class="btn btn-success btn-icon btn-sm" style="margin-right: 10px" onclick="fnPopup.onPrint('+ row +')"><span class="glyphicon glyphicon-print"></span></button>'
                        + '</div>';
                    }
                }
            ],
            theme: 'bootstrap',
            width: '100%',
            height: '90%',
            rowsheight: 33
        });

        // Search
        $("#iptStdNmOverviewSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...', disabled: true  });
        $("#cmbStdGradeOverviewSSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.gradeEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right', disabled: true  });
        $("#cmbStdClassOverviewSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.clazzEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right', disabled: true  });

    },

    onSearch: function (studentId) {
        let stdNm = $('#iptStdNmSrch').val();
        let stdGrade = $('#cmbStdGradeSrch').val();
        let stdClazz = $('#cmbStdClazzSrch').val();
        if (stdNm) {
            stdNm = stdNm.trim();
        }

        let params = {
            id: studentId
        };

        SS.sendToServer(
            'ST_OV_02',
            false,
            params,
            function onSuccess(data) {
                fnPopup.gridSource.localdata = data.lst;
                $("#grdStudentBalance").jqxGrid({ source: fnPopup.gridSource });
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );
    },

    popup: {
        reset: function () {
        },

        open: function (studentId) {
            fnPopup.popup.reset();

            if (studentId != null) { // Update
                SS.sendToServer(
                    'ST_R_02',
                    false,
                    { id : studentId },
                    function onSuccess(data) {

                    }
                );
            }
        }
    },

    onPrint: function (rowIndex) {

        let data = $("#grdStudentBalance").jqxGrid('getrowdata', rowIndex);
        let studentId = data.id;
        let date = data.date;

        let printData = fnPopup.getPrintData(studentId, date);

        let mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<table className="tableStyle" border="0">');
        mywindow.document.write('    <tr>');
        mywindow.document.write('        <td colSpan="5" rowSpan="2">Platilac<br><textarea rows="4" cols="50">' + printData.payerInfo + '</textarea></td>');
        mywindow.document.write('        <td colSpan="1">Sifra Placanja<br><textarea rows="1" cols="10"></textarea></td>');
        mywindow.document.write('        <td colSpan="1">Valuta<br><textarea rows="1" cols="10"></textarea></td>');
        mywindow.document.write('        <td colSpan="3">Iznos<br><textarea rows="1" cols="30">' + printData.amount + '</textarea></td>');
        mywindow.document.write('    </tr>');
        mywindow.document.write('    <tr>');
        mywindow.document.write('        <td colSpan="5">Racun platioca<br><textarea rows="1" cols="63">' + printData.payerAcc + '</textarea></td>');
        mywindow.document.write('    </tr>');
        mywindow.document.write('    <tr>');
        mywindow.document.write('        <td colSpan="5" rowSpan="2">Svrha placanja<br><textarea rows="4" cols="50">' + printData.purpose + '</textarea></td>');
        mywindow.document.write('        <td colSpan="1">Model<br><textarea rows="1" cols="10"></textarea></td>');
        mywindow.document.write('        <td colSpan="1">-</td>');
        mywindow.document.write('        <td colSpan="3">Poziv na broj (zadizenje)<br><textarea rows="1" cols="30"></textarea></td>');

        mywindow.document.write('    </tr>');
        mywindow.document.write('    <tr>');
        mywindow.document.write('        <td colSpan="5">Racun primaoca<br>');
        mywindow.document.write('            <textarea rows="1" cols="63">' + printData.payeeAcc + '</textarea></td>');
        mywindow.document.write('    </tr>');
        mywindow.document.write('    <tr>');
        mywindow.document.write('        <td colSpan="5" rowSpan="2">Primalac<br><textarea rows="4" cols="50">' + printData.payee + '</textarea></td>');
        mywindow.document.write('        <td>Model<br><textarea rows="1" cols="10"></textarea></td>');
        mywindow.document.write('        <td>-</td>');
        mywindow.document.write('        <td colSpan="2">Poziv na broj (odobrenje)<br><textarea rows="1" cols="30">' + printData.refNo + '</textarea></td>');
        mywindow.document.write('        <td></td>');
        mywindow.document.write('    </tr>');
        mywindow.document.write('    <tr>');
        mywindow.document.write('        <td colSpan="2">21.05.2021</td>');
        mywindow.document.write('        <td></td>');
        mywindow.document.write('        <td><input type="checkbox"></td>');
        mywindow.document.write('        <td></td>');

        mywindow.document.write('    </tr>');
        mywindow.document.write('    <tr>');
        mywindow.document.write('        <td></td>');
        mywindow.document.write('        <td></td>');
        mywindow.document.write('        <td></td>');
        mywindow.document.write('        <td></td>');
        mywindow.document.write('        <td>Datum prijema</td>');
        mywindow.document.write('        <td>Datum izvrsenja</td>');
        mywindow.document.write('        <td></td>');
        mywindow.document.write('        <td></td>');
        mywindow.document.write('        <td>Hitno</td>');
        mywindow.document.write('        <td></td>');
        mywindow.document.write('    </tr>');
        mywindow.document.write('</table>');


    mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;
    },

    getPrintData: function (studentId, date) {

        let params = {
            id: studentId,
            date: date
        };

        let printData = {};

        SS.sendToServer(
            'ST_OV_03',
            false,
            params,
            function onSuccess(data) {
                printData = {
                    payerInfo: data.lst.payerInfo,
                    purpose: data.lst.purpose,
                    payee: data.lst.payee,
                    amount: data.lst.amount,
                    payerAcc: data.lst.payerAcc,
                    payeeAcc: data.lst.payeeAcc,
                    refNo: data.lst.refNo
                }
            },

            function onError(err) {
                SS.alert( SS.title.ERROR, SS.message.ERROR);
            }
        );

        return printData;
    },


};

$(document).ready(function() {
    fnPopup.init();
    fnPopup.onSearch();
});

