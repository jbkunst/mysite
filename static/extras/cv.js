$(function () { 

    Highcharts.setOptions({
        chart: {
            backgroundColor:'#111111',
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
    });

    plot_options_timeline = {
        chart: {
            type: 'line',
            renderTo: 'container',
            zoomType: 'x',
        },
        xAxis: {
            labels: {
                enabled: true
            },
            type: 'datetime',
        },

        yAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: ''
            },
            gridLineColor: 'transparent',
        },
        tooltip: {
            formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                    this.series.text;
            }
        },
        series: [
            {
                name: 'Estudios I', lineWidth: 10, data: [ [Date.UTC(2004,  9, 27), 1 ], [Date.UTC(2010, 10, 10), 1 ], ]
            }, {
                name: 'Trabajo 2', lineWidth: 10, data: [ [Date.UTC(2010, 10, 10), 2 ], [Date.UTC(2012,  9, 26), 2 ], ]
            }, {
                name: 'Trabajo III', lineWidth: 10, data: [ [Date.UTC(2012,  9, 26), 3 ], [Date.UTC(2014,  9, 14), 3], ]
            }
        ]
    }

    chart = new Highcharts.Chart(plot_options_timeline);

    plot_options_interest = {
        chart: {
            renderTo: 'container2',
            /*plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false*/
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false,
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#FFF',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                ['Safari',    8.5],
                ['Opera',     6.2],
            ]
        }]
    }

    chart = new Highcharts.Chart(plot_options_interest);

    var trip = new Trip([
        { sel : $("#timelinediv"), content : "Controll<br>asldasd lasdas ñasda", position : "n", expose : false, delay: 2000 },
        { sel : $("#piediv"), content : "Varaible asdas asdas dasd asdasd <br>asdasd", position : "w", expose : false, delay: 2000 },
        { sel : $("#bardiv"), content : "Varaible asdas asdas dasd asdasd <br>asdasd", position : "s", expose : false, delay: 3000 },
        { sel : $("#linediv"), content : "Varaible asdas asdas dasd asdasd <br>asdasd", position : "w", expose : false, delay: 1000 },
      ], {
        tripTheme : "white",
        animation: "fadeIn",
        backToTopWhenEnded : true,
        onTripChange : function(i, tripData) {
            $(".item").css("opacity", .3)
            tripData.sel.css("opacity", 1)
        },
        onTripEnd : function() {
            $(".item").css("opacity", 1)
        },
      });

    $("#start-trip").on("click", function() {
        trip.start();
    });
});