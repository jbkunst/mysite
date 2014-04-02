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
            min: Date.UTC(2003,  10, 1),
            max: Date.UTC(new Date().getFullYear(),  new Date().getMonth() + 1, 29)
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
                    info = {
                        'Studies': 'Mathematics and Master in Statistics at PUC',
                        'Scoring Analyst': 'at Corpbanca',
                        'Risk Analyst': 'at Equifax Chile',
                        'Data Scientist': 'at Foris'
                    }
                    return '<b>'+ this.series.name +'</b><br/>'+
                    info[this.series.name];
            }
        },
        series: [
            {
                name: 'Studies', lineWidth: 15, data: [ [Date.UTC(2004,  3, 1), 1 ], [Date.UTC(2009, 11, 01), 1 ], ]
            }, {
                name: 'Scoring Analyst', lineWidth: 15, data: [ [Date.UTC(2010, 8, 1), 2 ], [Date.UTC(2011,  2, 1), 2 ], ]
            }, {
                name: 'Risk Analyst', lineWidth: 15, data: [ [Date.UTC(2011,  2, 1), 3 ], [Date.UTC(2013,  1, 1), 3], ]
            }, {
                name: 'Data Scientist', lineWidth: 15, data: [ [Date.UTC(2013,  1, 1), 4], [Date.UTC(new Date().getFullYear(),  new Date().getMonth(), 1), 4], ]
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
            name: 'Statistics software/lenguaje',
            data: [ ['R', 95], ['SAS', 2], ['STATA', 1], ['SPSS', 1], ]
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

    var fill = d3.scale.category20();

    var width = parseInt($("#container3").css("width"))
    var height = parseInt($("#container3").css("height"))

    d3.layout.cloud().size([width, height])
        .words([
            "Statistics", "R", "D3js", "Javascript", "Modelling", "Visualization", "Group",
            "Github", "Python", "Django"].map(function(d) {
                return {text: d, size: 25 + Math.random() * 20};
            }))
        .padding(5)
        .rotate(function() { return Math.floor(Math.random() * 120) + 1 - 60; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw)
        .start();

    function draw(words) {
        d3.select("#container3").append("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(150,150)")
            .selectAll("text")
                .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
        }
});