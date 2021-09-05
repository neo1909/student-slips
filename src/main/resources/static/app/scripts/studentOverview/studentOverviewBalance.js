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
        {name: 'studentDebtsId', type: 'int'},
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
                    text: 'Print', datafield: 'print', cellsalign: 'center', width: '5%', exportable: false
                    , cellsrenderer: function (row, rowIndex, column, value) {

                        if (column === 'false') {
                            return '<div style="text-align: center; margin-top: 4px;"> </div>';
                        }

                        return '<div style="text-align: center; margin-top: 4px;">'
                            + '<button alt="Edit" class="btn btn-success btn-icon btn-sm" style="margin-right: 10px" onclick="fnPopup.onPrint(' + i + ',' + row + ')"><span class="glyphicon glyphicon-print"></span></button>'
                            + '</div>';
                    }
                }
            ],
            theme: 'bootstrap',
            width: '100%',
            autoheight: true,
            rowsheight: 33
        });
    }
        // Search
        $("#iptStdNmOverviewSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...', disabled: true  });
        $("#cmbStdGradeOverviewSSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.dataSource.arr_gradeEmpty(), selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right', disabled: true  });
        $("#cmbStdClassOverviewSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.dataSource.arr_clazzEmpty(), selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right', disabled: true  });
        $("#iptFromDate").jqxDateTimeInput({height: SS.IPT_HEIGHT, width: '100%', formatString: "dd/MM/yyyy"});
        $("#iptToDate").jqxDateTimeInput({height: SS.IPT_HEIGHT, width: '100%', formatString: "dd/MM/yyyy"});

        $('#btnStudentBalanceSearch').click(function () {

            let fromDateStr = $('#iptFromDate').val();
            let toDateStr = $('#iptToDate').val();

            fnPopup.onSearch(fromDateStr, toDateStr)
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
                $('#grdStudentBalance1').jqxGrid('clear');
                $('#grdStudentBalance2').jqxGrid('clear');
                $('#grdStudentBalance3').jqxGrid('clear');
                $('#grdStudentBalance4').jqxGrid('clear');
                $('#grdStudentBalance5').jqxGrid('clear');

                fnPopup.gridSource1.localdata = data.lst1;
                if(data.lst1 && data.lst1[0].serviceId != -1) {
                    $('#serviceLabel1').text(data.lst1.length <= 1 ? "No service" : data.lst1[0].serviceNm);
                    $("#grdStudentBalance1").jqxGrid({source: fnPopup.gridSource1});
                    $('#serviceLabel1').show();
                    $('#grdStudentBalance1').show();
                } else {
                    onHideGrid(1)
                }
                fnPopup.gridSource2.localdata = data.lst2;
                if(data.lst2 && data.lst2[0].serviceId != -1) {
                    $('#serviceLabel2').text(data.lst2[0].serviceNm == null ? "" : data.lst2[0].serviceNm);
                    $("#grdStudentBalance2").jqxGrid({source: fnPopup.gridSource2});
                    $('#serviceLabel2').show();
                    $('#grdStudentBalance2').show();

                } else {
                    onHideGrid(2)
                }

                fnPopup.gridSource3.localdata = data.lst3;
                if(data.lst3 && data.lst3[0].serviceId != -1) {
                    $('#serviceLabel3').text(data.lst3[0].serviceNm == null ? "" : data.lst3[0].serviceNm);
                    $("#grdStudentBalance3").jqxGrid({source: fnPopup.gridSource3});
                    $('#grdStudentBalance3').show();
                    $('#serviceLabel3').show();
                } else {
                    onHideGrid(3)
                }

                fnPopup.gridSource4.localdata = data.lst4;
                if(data.lst4 && data.lst4[0].serviceId != -1) {
                    $('#serviceLabel4').text(data.lst4[0].serviceNm == null ? "" : data.lst4[0].serviceNm);
                    $("#grdStudentBalance4").jqxGrid({source: fnPopup.gridSource4});
                    $('#grdStudentBalance4').show();
                    $('#serviceLabel4').show();
                } else {
                    onHideGrid(4)
                }

                fnPopup.gridSource5.localdata = data.lst5;
                if(data.lst5 && data.lst5[0].serviceId != -1) {
                    $('#serviceLabel5').text(data.lst5[0].serviceNm == null ? "" : data.lst5[0].serviceNm);
                    $("#grdStudentBalance5").jqxGrid({source: fnPopup.gridSource5});
                    $('#grdStudentBalance5').show();
                    $('#serviceLabel5').hide();
                } else {
                    onHideGrid(5)
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

    onPrint: function (gridIndex, rowIndex) {

        let data = $('#grdStudentBalance' + gridIndex).jqxGrid('getrowdata', rowIndex);
        let studentDebtsId = data.studentDebtsId;
        let studentId = data.id;
        let date = data.date;

        let printData = fnPopup.getPrintData(studentDebtsId, studentId, date);

        let mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<html><head>\n' +
           /* '    <link href="https://fonts.googleapis.com/css?family=Oxygen+Mono" rel="stylesheet" type="text/css">\n' +*/
            '        <style>\n' +
            '            @media print {\n' +
            '                * {-webkit-print-color-adjust:exact;}\n' +
            '                #buttonPanel, .note {\n' +
            '                    display: none;\n' +
            '                }\n' +
            '                body, .invoice {\n' +
            '                    margin: 0;\n' +
            '                }\n' +
            '            }\n' +
            '            body {\n' +
            '                font-family: Arial,Verdana,Helvetica,Clean,Sans-serif;\n' +
            '                font-size: 13px;\n' +
            '                background: #fff;\n' +
            '                margin: 0;\n' +
            '            }\n' +
            '            input[type=\'button\'] {\n' +
            '                border: 1px solid #B3B3B3;\n' +
            '                -moz-border-radius: 3px;\n' +
            '                -webkit-border-radius: 3px;\n' +
            '                cursor: pointer;\n' +
            '                padding-top: 7px;\n' +
            '                padding-bottom: 7px;\n' +
            '                padding-left: 30px;\n' +
            '                padding-right: 7px;\n' +
            '                width: 100px;\n' +
            '            }\n' +
            '\n' +
            '            .invoice{\n' +
            '                display:block;position:relative;left:0;height: 325px;\n' +
            '                background-image:url(\'data:image/gif;base64,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\');\n' +
            '                background-repeat:no-repeat;margin:10px;\n' +
            '                width: 850px;\n' +
            '                background-size: 850px auto;}\n' +
            '            .name{position:absolute;left:24px;top:30px;width:380px}\n' +
            '            .address{position:absolute;left:24px;top:47px;width:380px}\n' +
            '            .paymentPurpose{position:absolute;left:24px;top:113px;width:380px}\n' +
            '            .institution{position:absolute;left:24px;top:189px;width:380px}\n' +
            '            .paymentCode{position:absolute;left:446px;top:46px;font-family:\'Oxygen Mono\',sans-serif}\n' +
            '            .currency{position:absolute;left:496px;top:47px}\n' +
            '            .amount{position:absolute;top:45px;right:22px;font-family:\'Oxygen Mono\',sans-serif}\n' +
            '            .account{position:absolute;left:446px;top:94px;font-family:\'Oxygen Mono\',sans-serif}\n' +
            '            .model{position:absolute;left:446px;top:147px;font-family:\'Oxygen Mono\',sans-serif}\n' +
            '            .referenceNumber{position:absolute;left:499px;top:146px;font-family:\'Oxygen Mono\',sans-serif}\n' +
            '            .currencyDate{position:absolute;left:460px;top:271px;}\n' +
            '            .note {\n' +
            '                margin: 10px;\n' +
            '            }\n' +
            '            .ips-qr-code img {\n' +
            '                width: 100%;\n' +
            '                margin-top: -2px;\n' +
            '            }\n' +
            '            .ips-qr-code {\n' +
            '                position: absolute;\n' +
            '                bottom: 10px;\n' +
            '                right: 10px;\n' +
            '                width: 135px;\n' +
            '            }\n' +
            '            .ips-qr-code span {\n' +
            '                display: inline-block;\n' +
            '                text-align: center;\n' +
            '                width: 100%;\n' +
            '                font-size: 10px;\n' +
            '            }\n' +

            '        </style>\n' +
            '    </head>\n' +
            '    <body cz-shortcut-listen="true">\n' +
            '        \n' +
            '<div class="invoice">\n' +
            '    <label class="name">\n' +
            printData.payerInfo +
            '    </label>\n' +
            '    <label class="address">\n' +
            '     ' +
            '    </label>\n' +
            '    <label class="paymentPurpose">\n' +
            printData.purpose +
            '    </label>\n' +
            '    <label class="institution">\n' +
            printData.payee +
            '    </label>\n' +
            '    <label class="paymentCode">\n' +
            '        121\n' +
            '    </label>\n' +
            '    <label class="amount">\n' +
            SS.format.formatNumberByLocales(printData.amount) +
            '    </label>\n' +
            '    <label class="account">\n' +
            printData.payeeAcc +
            '    </label>\n' +
            '    <label class="model">\n' +
            '        ' +
            '    </label>\n' +
            '    <label class="referenceNumber">\n' +
            printData.refNo +
            '    </label>\n' +
            '    <label class="currencyDate">\n' +
            '        ' +
            '    </label>\n' +
            '    <label class="currency">\n' +
            '        RSD\n' +
            '    </label>\n' +
            '   \n' +
            '\n' +
            '</div>\n' +
            '</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;
    },

    getPrintData: function (studentDebtsId, studentId, date) {

        let params = {
            id: studentId,
            studentDebtsId: studentDebtsId,
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

function onHideGrid(index) {
    $('#grdStudentBalance'+index).hide();
    $('#serviceLabel'+index).hide();
    $('#grdStudentBalance'+index).jqxGrid('refresh');
}

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
            '<h4>'+ $('#iptStdNmOverviewSrch').val() +'</h4>' +
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


    $('#grdStudentBalance1').jqxGrid('localizestrings', SS.grid.localization);
    $('#grdStudentBalance2').jqxGrid('localizestrings', SS.grid.localization);
    $('#grdStudentBalance3').jqxGrid('localizestrings', SS.grid.localization);
    $('#grdStudentBalance4').jqxGrid('localizestrings', SS.grid.localization);
    $('#grdStudentBalance5').jqxGrid('localizestrings', SS.grid.localization);


    $('#btnPrint').click(function () {
        onPrint()
    });
});

