/**
 Provides more features for the widget module...

 @module widget
 @submodule widget-foo
 @main widget
 **/
$(function () {
    var background = {
        type: 'linearGradient',
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 1,
        colorStops: [{offset: 0, color: '#d2e6c9'},
            {offset: 1, color: 'white'}]
    };
    var model = [
        { name: "日报", value: 33 },
        { name: "周报", value: 33 },
        { name: "月报", value: 33 }
        //data: [['日报', 33], ['周报', 33], ['月报', 33]]
    ];
    function getItem() {
        return this.data.dataItem[0]
    };
    $('#jqChart-pie').jqChart({
        //title: {text: 'Pie Chart'},
        //legend: {title: 'Countries'},
        //border: {strokeStyle: '#6ba851'},
        //background: background,
        //animation: {duration: 1},
        //shadows: {
        //    enabled: true
        //},
        //series: [
        //    {
        //        type: 'pie',
        //        fillStyles: ['#418CF0', '#FCB441', '#E0400A', '#056492', '#BFBFBF', '#1A3B69', '#FFE382'],
        //        labels: {
        //            stringFormat: getItem.call(this),
        //            //dataLabelsField:'日报',
        //            //valueType: 'dataValue',
        //            font: '15px sans-serif',
        //            fillStyle: 'white'
        //        },
        //        //explodedRadius: 10,
        //        //explodedSlices: [5],
        //        data: [['日报', 33], ['周报', 33], ['月报', 33]]
        //    }
        //]
        title: { text: 'Binding to Data Source' },
        shadows: {
            enabled: true
        },
        dataSource: model,
        series: [
            {
                labels: {
                    getVal: (function () {
                        console.log(this.stringFormat)
                        return this.stringFormat
                    })(),
                    stringFormat: '%d',
                    //dataLabelsField:'日报',
                    //valueType: 'dataValue',
                    font: '15px sans-serif',
                    fillStyle: 'white'
                },
                type: 'pie',
                //data:model.data
                dataValuesField: {
                    name: 'value',
                    type: 'string' // string, numeric, dateTime
                },
                dataLabelsField: {
                    name: 'name',
                    type:''
                }
            }
        ]
    });

    $('#jqChart-pie').bind('tooltipFormat', function (e, data) {
        var percentage = data.series.getPercentage(data.value);
        percentage = data.chart.stringFormat(percentage, '%.2f%%');

        return '<b>' + data.dataItem[0] + '</b><br />' +
        data.value + ' (' + percentage + ')';
    });
});