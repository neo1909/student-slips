let fnPopup = {
    dataset: null,
    gridSource: null,

    init: function() {

        /*
        * Init Component
        * */
        fnPopup.gridSource = {
            datafields: [
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
                        + '<button alt="Edit" class="btn btn-success btn-icon btn-sm" style="margin-right: 10px" onclick="fnPopup.onUpdate(' + rowIndex +')"><span class="glyphicon glyphicon-print"></span></button>'
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
        $("#iptStdNmOverviewSrch").jqxInput({ height: SS.IPT_HEIGHT, width: '100%', placeHolder: 'Enter search...' });
        $("#cmbStdGradeOverviewSSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.gradeEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });
        $("#cmbStdClassOverviewSrch").jqxDropDownList({ enableBrowserBoundsDetection: true, source: SS.clazzEmpty, selectedIndex: 0, height: SS.IPT_HEIGHT, width: '100%', dropDownHorizontalAlignment:'right' });


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
    }
};

$(document).ready(function() {
    fnPopup.init();
    fnPopup.onSearch();
});

