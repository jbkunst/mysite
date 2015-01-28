$(function () { 

    series_info = [
        {
            name: "Studies I",
            info: "Mathematics degree at PUC",
            lineWidth: 13,
            data: [ [Date.UTC(2004, 3, 1), 0], [Date.UTC(2007,11, 1), 0], ]
        },
        {
            name: "Studies II",
            info: "Master in Statistics at PUC",
            lineWidth: 13,
            data: [ [Date.UTC(2008, 3, 1), 1], [Date.UTC(2009,11, 1), 1], ]
        },
        {
            name: "Scoring Analyst",
            info: "at Corpbanca",
            lineWidth: 13,
            data: [ [Date.UTC(2010, 8, 1), 2], [Date.UTC(2011, 2, 1), 2], ]
        },
        {
            name: "Risk Analyst",
            info: "at Equifax Chile",
            lineWidth: 13,
            data: [ [Date.UTC(2011, 2, 1), 3], [Date.UTC(2013, 1, 1), 3], ]
        },
        {
            name: "Senior Data Scientist",
            info: "at Foris",
            lineWidth: 13,
            data: [ [Date.UTC(2013, 1, 1), 4], [Date.UTC(2014,10, 1), 4], ]
        },
        {
            name: "Senior Scoring Analyst",
            info: "Scotiabank",
            lineWidth: 13,
            data: [ [Date.UTC(2014,10, 1), 5], [Date.UTC(new Date().getFullYear(),  new Date().getMonth(), 1), 5], ]
        }
    ]

// Highcharts
    Highcharts.setOptions({
        chart: {
            backgroundColor:"transparent",
            style: {
                fontFamily: 'Lato',
            },
        },
        title: {
            text: ""
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        yAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: ""
            },
            gridLineColor: "transparent",
        },
        series: {
            lineWidth: 15
        }
    });

    plot_options_timeline = {
        chart: {
            type: "line",
            renderTo: "timeline",
            zoomType: "x",
            height: $("#timeline_text").height()
        },
        xAxis: {
            labels: {
                enabled: true
            },
            type: "datetime",
            min: Date.UTC(2003,  10, 1),
            max: Date.UTC(new Date().getFullYear(),  new Date().getMonth() + 3, 29)
        },
        tooltip: {
            formatter: function() {
                    date_format = Highcharts.dateFormat('%Y - %B', new Date(this.x))
                    series_name = this.series.name
                    obj = _.filter(series_info, function(e){ return e.name == series_name})[0]
                    return "<b>"+this.series.name+"</b><br/><em>"+date_format+"</em><br/>"+ obj.info;
            }
        },
        series: series_info
    }

    chart = new Highcharts.Chart(plot_options_timeline);

});