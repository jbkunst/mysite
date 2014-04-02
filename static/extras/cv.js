$(function () { 

    // Highcharts
    Highcharts.setOptions({
        chart: {
            backgroundColor:"#111111",
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
    });

    plot_options_timeline = {
        chart: {
            type: "line",
            renderTo: "container",
            zoomType: "x",
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
                    info = {
                        "Studies": "Mathematics and Master in Statistics at PUC",
                        "Scoring Analyst": "at Corpbanca",
                        "Risk Analyst": "at Equifax Chile",
                        "Data Scientist": "at Foris"
                    }
                    return "<b>"+ this.series.name +"</b><br/>" + info[this.series.name];
            }
        },
        series: [
            {
                name: "Studies", lineWidth: 15, data: [ [Date.UTC(2004,  3, 1), 1 ], [Date.UTC(2009, 11, 01), 1 ], ]
            }, {
                name: "Scoring Analyst", lineWidth: 15, data: [ [Date.UTC(2010, 8, 1), 2 ], [Date.UTC(2011,  2, 1), 2 ], ]
            }, {
                name: "Risk Analyst", lineWidth: 15, data: [ [Date.UTC(2011,  2, 1), 3 ], [Date.UTC(2013,  1, 1), 3], ]
            }, {
                name: "Data Scientist", lineWidth: 15, data: [ [Date.UTC(2013,  1, 1), 4], [Date.UTC(new Date().getFullYear(),  new Date().getMonth(), 1), 4], ]
            }
        ]
    }

    chart = new Highcharts.Chart(plot_options_timeline);

    plot_options_interest = {
        chart: {
            renderTo: "container2",
            type: "column"
        },
        plotOptions: {
            column: {
                colorByPoint: true
            }
        },
        xAxis: {
            categories: ['Statistics', 'Visualization', 'Programming']
                   },
        title: {
            text: ""
        },
        credits: {
            enabled: false,
        },
        tooltip: {
             formatter: function() {
                    info = {
                        "Statistics": "I grew up (and I'm growing) with statistics.<br>Read, process and show data!",
                        "Visualization": "Learning to tell stories.<br>Show and tell stories",
                        "Programming": "In general"
                    }
                    return "<b>"+  this.x +"</b><br/>" + info[this.x];
            },
            pointFormat: ""
        },
        series: [{
            data: [ 80, 70, 60]
        }]
    }

    chart = new Highcharts.Chart(plot_options_interest);

    // Trip
    trip_texts = [
        "asdas  asda sdas <br> asdasda sdas asda sdas d<br> asdasd asda",
        "wrtsda aa sae adfadfsdfsdfsdfas da s<br> asdasda sadfasaas sdf sdfsdf",
        "wrtsda aa sae adfadfsdfsdfsdf sdf sdfsdf <br> asdasd asdasd asda",
        "wrtsda aa sae adfadfsdfsdfsdfas da s<br> asdasda sadfasaas sdf sdfsdf",
    ]

    var trip = new Trip([
        { sel : $("#timelinediv"), content : trip_texts[0], position : "n", expose : false, delay: 5000 },
        { sel : $("#piediv"), content : trip_texts[1], position : "w", expose : false, delay: 5000 },
        { sel : $("#bardiv"), content : trip_texts[2], position : "s", expose : false, delay: 5000 },
        { sel : $("#linediv"), content : trip_texts[3], position : "w", expose : false, delay: 5000 },
      ], {
        tripTheme : "white",
        animation: "fadeIn",
        backToTopWhenEnded : true,
        onTripChange : function(i, tripData) {
            console.log(i)
            $(".item").css("opacity", .1)
            tripData.sel.css("opacity", 1)
        },
        onTripEnd : function() {
            $(".item").css("opacity", 1)
        },
      });

    $("#start-trip").on("click", function() {
        trip.start();
    });

    
    // Wordcloud
    var fill = d3.scale.category20();
    var width = parseInt($("#container3").css("width"))
    var height = parseInt($("#container3").css("height"))

    var words =  ["Statistics", "R", "D3js", "Javascript", "Modelling", "Visualization", "Group",
        "Github", "Python", "Django", "Arduino", "Guitar", "Music", "Programming",
        "The smell of freshly-cut grass"]

    words = words.map(function(d) { return {text: d, size: 15 + Math.random() * 10}; })

    d3.layout.cloud().size([width, height])
        .words(words)
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
                .attr("transform", "translate("+ width/2 +","+ height/2+")")
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