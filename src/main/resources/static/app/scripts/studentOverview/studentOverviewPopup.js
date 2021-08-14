let fnPopup = {
    dataset: null,
    gridSource: null,

    init: function() {

        /*
        * Init Component
        * */
        fnPopup.gridSource = {
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
                { text: 'Date', datafield: '', align: 'center', cellsalign:'center', width: '10%'
                    , cellsrenderer: function (rowIndex, column, value, defaultHtml) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 9px;">'+
                            + (rowIndex + 1)
                            + '</div>';
                    }
                },
                { text: 'Bank Statement', datafield: 'name', align: 'center', cellsalign:'left', width: '20%,'},
                { text: 'Description of Service', align: 'center', cellsalign:'left', width: '20%,'},
                { text: 'Debit', datafield: 'schoolName', align: 'center', cellsalign:'left', width: '15%,'},
                { text: 'Claim', datafield: 'grade', align: 'center', cellsalign:'center', width: '15%,'},
                { text: 'Balance', datafield: 'sClass', align: 'center', cellsalign:'center', width: '15%,'},
                { text: 'Print', cellsalign:'center', width: '5%,'
                    , cellsrenderer: function (rowIndex, column, value) {
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

