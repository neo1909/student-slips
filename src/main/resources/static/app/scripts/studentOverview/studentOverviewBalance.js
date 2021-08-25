let fnPopup = {
    dataset1: null,
    gridSource1: null,

    dataset2: null,
    gridSource2: null,

    dataset3: null,
    gridSource3: null,

    dataset4: null,
    gridSource4: null,

    dataset5: null,
    gridSource5: null,

    dataList: [
        {name: 'id', type: 'id'},
        {name: 'serviceId', type: 'int'},
        {name: 'serviceNm', type: 'string'},
        {name: 'date', type: 'date'},
        {name: 'description', type: 'string'},
        {name: 'debit', type: 'number'},
        {name: 'print', type: 'int'},
        {name: 'claims', type: 'number'},
        {name: 'balance', type: 'number'},
        {name: 'rowType', type: 'int'},
    ],

    init: function() {

        for (let i = 1; i <= 5; i++) {
            let dataAdapter;

            if (i == 1){
                fnPopup.gridSource1 = {
                    datafields: fnPopup.dataList,
                    datatype: "array",
                    localdata: fnPopup.dataset1
                };

                dataAdapter = new $.jqx.dataAdapter(fnPopup.gridSource1, {
                    loadComplete: function (data) {
                    },

                    loadError: function (xhr, status, error) {
                    }
                });
            }
            if (i == 2){
                fnPopup.gridSource2 = {
                    datafields: fnPopup.dataList,
                    datatype: "array",
                    localdata: fnPopup.dataset2
                };

                dataAdapter = new $.jqx.dataAdapter(fnPopup.gridSource2, {
                    loadComplete: function (data) {
                    },

                    loadError: function (xhr, status, error) {
                    }
                });
            }
            if (i == 3){
                fnPopup.gridSource3 = {
                    datafields: fnPopup.dataList,
                    datatype: "array",
                    localdata: fnPopup.dataset3
                };

                dataAdapter = new $.jqx.dataAdapter(fnPopup.gridSource3, {
                    loadComplete: function (data) {
                    },

                    loadError: function (xhr, status, error) {
                    }
                });
            }
            if (i == 4){
                fnPopup.gridSource4 = {
                    datafields: fnPopup.dataList,
                    datatype: "array",
                    localdata: fnPopup.dataset4
                };

                dataAdapter = new $.jqx.dataAdapter(fnPopup.gridSource4, {
                    loadComplete: function (data) {
                    },

                    loadError: function (xhr, status, error) {
                    }
                });
            }
            if (i == 5){
                fnPopup.gridSource5 = {
                    datafields: fnPopup.dataList,
                    datatype: "array",
                    localdata: fnPopup.dataset5
                };

                dataAdapter = new $.jqx.dataAdapter(fnPopup.gridSource5, {
                    loadComplete: function (data) {
                    },

                    loadError: function (xhr, status, error) {
                    }
                });
            }

        $("#grdStudentBalance"+i).jqxGrid({
            source: dataAdapter ,
            columns: [
                {
                    text: 'Date',
                    datafield: 'date',
                    align: 'center',
                    cellsalign: 'center',
                    width: '20%',
                    cellsformat: 'D'
                },

                {
                    text: 'Description of Service',
                    datafield: 'description',
                    align: 'center',
                    cellsalign: 'left',
                    width: '30%'
                },
                {
                    text: 'Debit',
                    datafield: 'debit',
                    align: 'center',
                    cellsalign: 'center',
                    width: '15%',
                    cellsformat: 'c2'
                },
                {
                    text: 'Claim',
                    datafield: 'claims',
                    align: 'center',
                    cellsalign: 'center',
                    width: '15%',
                    cellsformat: 'c2'
                },
                {
                    text: 'Balance',
                    datafield: 'balance',
                    align: 'center',
                    cellsalign: 'center',
                    width: '15%',
                    cellsformat: 'c2',
                    cellclassname: function (row, columnfield, value) {
                        let convertedValue = parseFloat(value);
                        if (convertedValue < 0) {
                            return 'green';
                        }
                    }
                },
                {
                    text: 'Print', datafield: 'print', cellsalign: 'center', width: '5%,'
                    , cellsrenderer: function (row, rowIndex, column, value) {

                        if (column === 'false') {
                            return '<div style="text-align: center; margin-top: 4px;"> </div>';
                        }

                        return '<div style="text-align: center; margin-top: 4px;">'
                            + '<button alt="Edit" class="btn btn-success btn-icon btn-sm" style="margin-right: 10px" onclick="fnPopup.onPrint(' + row + ')"><span class="glyphicon glyphicon-print"></span></button>'
                            + '</div>';
                    }
                }
            ],
            theme: 'bootstrap',
            width: '100%',
            height: '90%',
            rowsheight: 33
        });
    }
        // Search
        $("#iptStdNmOverviewSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...', disabled: true  });
        $("#cmbStdGradeOverviewSSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.gradeEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right', disabled: true  });
        $("#cmbStdClassOverviewSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.clazzEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right', disabled: true  });
        $("#iptFromDate").jqxDateTimeInput({height: SS.IPT_HEIGHT, width: '100%', formatString: "dd/MM/yyyy"});
        $("#iptToDate").jqxDateTimeInput({height: SS.IPT_HEIGHT, width: '100%', formatString: "dd/MM/yyyy"});

        $('#btnStudentBalanceSearch').click(function () {

            let fromDateStr = $('#iptFromDate').val();
            let toDateStr = $('#iptToDate').val();

            let dateParts = fromDateStr.split("/");

            let fromDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

            dateParts = toDateStr.split("/");

            let toDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

            fnPopup.onSearch(fromDate, toDate)
        });
    },

    onSearch: function (fromDate, toDate) {

        let stdNm = $('#iptStdNmSrch').val();
        if (stdNm) {
            stdNm = stdNm.trim();
        }

        let studentId = $('#iptStdId').val();

        let params = {
            id: studentId,
            fromDate: fromDate,
            toDate: toDate
        };

        SS.sendToServer(
            'ST_OV_02',
            false,
            params,
            function onSuccess(data) {
                fnPopup.gridSource1.localdata = data.lst1;
                $('#serviceLabel1').text(data.lst1.length <= 1 ? "No service" : data.lst1[0].serviceNm);
                $("#grdStudentBalance1").jqxGrid({source: fnPopup.gridSource1});

                fnPopup.gridSource2.localdata = data.lst2;
                if(data.lst2 && data.lst2[0].serviceId != -1) {
                    $('#serviceLabel2').text(data.lst2[0].serviceNm == null ? "" : data.lst2[0].serviceNm);
                    $("#grdStudentBalance2").jqxGrid({source: fnPopup.gridSource2});
                    $('#grdStudentBalance2').show();
                } else {
                    $('#grdStudentBalance2').hide();
                }

                fnPopup.gridSource3.localdata = data.lst3;
                if(data.lst3 && data.lst3[0].serviceId != -1) {
                    $('#serviceLabel3').text(data.lst3[0].serviceNm == null ? "" : data.lst3[0].serviceNm);
                    $("#grdStudentBalance3").jqxGrid({source: fnPopup.gridSource3});
                    $('#grdStudentBalance3').show();
                } else {
                    $('#grdStudentBalance3').hide();
                }

                fnPopup.gridSource4.localdata = data.lst4;
                if(data.lst4 && data.lst4[0].serviceId != -1) {
                    $('#serviceLabel4').text(data.lst4[0].serviceNm == null ? "" : data.lst4[0].serviceNm);
                    $("#grdStudentBalance4").jqxGrid({source: fnPopup.gridSource4});
                    $('#grdStudentBalance4').show();
                } else {
                    $('#grdStudentBalance4').hide();
                }

                fnPopup.gridSource5.localdata = data.lst5;
                if(data.lst5 && data.lst5[0].serviceId != -1) {
                    $('#serviceLabel5').text(data.lst5[0].serviceNm == null ? "" : data.lst5[0].serviceNm);
                    $("#grdStudentBalance5").jqxGrid({source: fnPopup.gridSource5});
                    $('#grdStudentBalance5').show();
                } else {
                    $('#grdStudentBalance5').hide();
                }

                onCalculateTotal();
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

        let data = $("#grdStudentBalance1").jqxGrid('getrowdata', rowIndex);
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

function onCalculateTotal() {

    let totalDebit = 0;
    let totalClaims = 0;
    let totalBalance = 0;

    for (let i = 1 ; i <=5; i++ ) {
        let allRows = $("#grdStudentBalance"+i).jqxGrid('getrows');
        if (allRows.length > 0) {
            totalDebit += allRows[allRows.length-1].debit;
            totalClaims += allRows[allRows.length-1].claims;
            totalBalance += allRows[allRows.length-1].balance;
        }
    }
    $("#grdStudentBalance-debit").html(SS.format.formatNumberByLocales(totalDebit));
    $("#grdStudentBalance-claims").html(SS.format.formatNumberByLocales(totalClaims));
    $("#grdStudentBalance-balance").html(SS.format.formatNumberByLocales(totalBalance));
}

function onPrint() {

    let newWindow = window.open('', '', 'width=800, height=500'),
        document = newWindow.document.open(),
        pageContent =
            '<!DOCTYPE html>\n' +
            '<html>\n' +
            '<head>\n' +
            '<meta charset="utf-8" />\n' +
            '<title>Student Overview Balance</title>\n' +
            '</head>\n' +
            '<body>\n';

        for (let i = 1; i <= 5; i++) {
            let data = $("#grdStudentBalance"+i).jqxGrid('getrowdata', 0);
            if(data) {
                let serviceNm = data.serviceNm;
                let gridContent = $("#grdStudentBalance" + i).jqxGrid('exportdata', 'html');

                pageContent += '<div>' + serviceNm + '</div>' +
                    '<div>\n' + gridContent + '\n</div>' +
                    '<br/>\n' +
                    '<br/>\n';
            }
        }
        pageContent +=
           '<div style="margin-right: 1rem">Debit:' + $('#grdStudentBalance-debit').html() + '</div>' +
            '<div style="margin-right: 1rem">Claims:' + $('#grdStudentBalance-claims').html() + '</div>' +
            '<div style="margin-right: 1rem">Balance:' + $('#grdStudentBalance-balance').html() + '</div>' +
            '\n</body>\n</html>';
    document.write(pageContent);
    document.close();
    newWindow.print();
}

$(document).ready(function() {
    fnPopup.init();
    $('#grdStudentBalance2').hide();
    $('#grdStudentBalance3').hide();
    $('#grdStudentBalance4').hide();
    $('#grdStudentBalance5').hide();
//    fnPopup.onSearch(fromDate, toDate);


    var localizationobj = {};
    localizationobj.currencysymbol = " ";
    localizationobj.decimalseparator = ",";
    localizationobj.thousandsseparator = ".";
    $('#grdStudentBalance1').jqxGrid('localizestrings', localizationobj);
    $('#grdStudentBalance2').jqxGrid('localizestrings', localizationobj);
    $('#grdStudentBalance3').jqxGrid('localizestrings', localizationobj);
    $('#grdStudentBalance4').jqxGrid('localizestrings', localizationobj);
    $('#grdStudentBalance5').jqxGrid('localizestrings', localizationobj);


    $('#btnPrint').click(function () {
        onPrint()
    });
});

