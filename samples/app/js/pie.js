/**
 Provides more features for the widget module...

 @module widget
 @submodule widget-foo
 @main widget
 **/
var doughnutData = [
    {
        value: 7,
        color: "#fcc75d",
        highlight: "Red",
        label: "卖品"
    },
    {
        value: 61,
        color: '#f2805c',
        highlight: "Red",
        label: "会员卡充值"
    },
    {
        value: 32,
        color: '#8367a9',
        highlight: "Red",
        label: "票房"
    }

];
var doughnutDataEarnings = [
    {
        value: 33,
        color: "#448ed3",
        highlight: "#126ec4",
        label: "日报"
    },
    {
        value: 33,
        color: '#448ed3',
        highlight: "#126ec4",
        label: "周报"
    },
    {
        value: 33,
        color: '#448ed3',
        highlight: "#126ec4",
        label: "月报"
    }

];

window.onload = function () {
    var ctx = document.getElementById("chart-area").getContext("2d"),
        ctxEarnings = document.getElementById("chart-area-earnings").getContext("2d");
    var options = {
        responsive: true,
        percentageInnerCutout: 30,
        segmentShowStroke: false,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()+'-legend'+ ' container text-center'%> \"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label +'  '+segments[i].value+'%'%><%}%></li><%}%></ul>"
    };
    var optionsEarnings = {
        responsive: true,
        percentageInnerCutout: 0,
        segmentStrokeWidth : 10,
        segmentShowStroke: true,
        segmentStrokeColor :'#e6eeff',
        labelAlign: 'center',
        legendTemplate: "<ul class=\"<%=name.toLowerCase()+'-legend'+ ' container text-center'%> \"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label +'  '+segments[i].value+'%'%><%}%></li><%}%></ul>"
    };
    window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, options);
    window.myDoughnutEarnings = new Chart(ctxEarnings).Pie(doughnutDataEarnings, optionsEarnings);
    //$('.J_legend').append(myDoughnut.generateLegend());
};