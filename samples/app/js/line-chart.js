/**

 @module draw line chart including single and multi-lines chart

 **/

var isJointDebug = false;
function generateChartData(numberDate, axisVal) {
    var arr = [];

    var today = new Date();
    var firstDay = today.getDate() - numberDate;
    today.setDate(firstDay ? firstDay : 1);

    for (var i = 0; i <= numberShowed; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(today);
        newDate.setDate(newDate.getDate() + i);

        var items = {
            date: newDate
        };
        $.each(axisVal, function (i, n) {
            items[n.val] = Math.round(Math.random() * 40) - 20;
        });
        arr.push(items);
    }
    return arr
}
function getChartData(data) {
    var arr = [];
    if (isJointDebug) {
        arr = data;
    } else {
        arr = generateChartData(numberDate, axisVal);
    }
    return arr;
}
function displayNewChartDataAsPan(num) {
    if (isJointDebug) {
        $.getJSON(url, function (data) {
            chart.dataProvider = data;
            chart.validateData();
        });
    } else {
        chartData = generateChartData(numberDate, axisVal);
        chart.dataProvider = chartData
        chart.validateData();
    }
}


const numberShowed = 6;

var numberDate = 6;
var chartData = [];
var chart = null;

var today = new Date();

AmCharts.ready(function () {
    function hasSVG() {
        SVG_NS = 'http://www.w3.org/2000/svg';
        return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
    }

    if(!(hasSVG())){
        alert('您当前使用的浏览器不支持本页面的图表展示');
        return;
    }
    $.getJSON(url, function (data) {
        chartData = getChartData(data);

        // chart code will go here
        chart = new AmCharts.AmSerialChart();
        chart.dataProvider = chartData;
        chart.categoryField = "date";
        chart.legend= {
            "useGraphSettings": true
        };
//        chart.angle = 30;
//        chart.depth3D = 15;

        function addGraph(valueField, lineColor) {
            graph = new AmCharts.AmGraph();
            graph.valueField = valueField;
            graph.type = "line";
            graph.balloonText = "[[category]]: <b>[[value]]</b>";
            graph.fillAlphas = 0; // or delete this line, as 0 is default
            graph.bullet = "round";
            graph.lineColor = lineColor;
            chart.addGraph(graph);
        }

        $.each(axisVal, function (i, n) {
            addGraph(n.val, n.color);

        });
        var categoryAxis = chart.categoryAxis;
        categoryAxis.autoGridCount = false;
        categoryAxis.gridCount = chartData.length;
        categoryAxis.gridPosition = "start";
        categoryAxis.labelRotation = 90;

        categoryAxis.parseDates = true;
        categoryAxis.gridAlpha = 0.15;
        categoryAxis.minorGridEnabled = true;
        categoryAxis.axisColor = "#DADADA";

        var chartCursor = new AmCharts.ChartCursor();
        //chartCursor.enabled=false;
        //chartCursor.fullWidth = true;
        chartCursor.cursorAlpha = 0;
        chartCursor.valueLineBalloonEnabled = false;
        chartCursor.categoryBalloonEnabled = false;
        //chartCursor.valueBalloonsEnabled=false;
        //show balloon only when hover the bullet
        chartCursor.valueBalloonsEnabled = false;
        chartCursor.pan = true;
        chartCursor.addListener('zoomed', handleZoom)

        function handleZoom(event) {
            var target = event.target;
            if (isNaN(target.previousIndex)) {
                return;
            }
            if (target.index - target.previousIndex < 0) {
                var date = chart.dataProvider[numberShowed].date;
                if (!(chart.dataProvider[numberShowed].date instanceof Date)) {
                    return;
                }
                if (today.getTime() <= date.getTime()) {
//                    console.log('last showed')
                } else {
                    displayNewChartDataAsPan(--numberDate);
                }
            } else {
//                console.log('right pan')
                displayNewChartDataAsPan(++numberDate);

            }
        }

        chart.addChartCursor(chartCursor);

        chart.write('chartdiv');
    })
});