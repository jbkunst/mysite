$(function () { 

// Highcharts
    Highcharts.setOptions({
        chart: {
            backgroundColor:"#111111",
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
                        "Studies": "Mathematics degree at PUC",
                        "Studies": "Master in Statistics at PUC",
                        "Scoring Analyst": "at Corpbanca",
                        "Risk Analyst": "at Equifax Chile",
                        "Data Scientist": "at Foris"
                    }
                    date_format = Highcharts.dateFormat('%Y - %B', new Date(this.x))
                    return "<b>"+this.series.name+"</b><br/><em>"+date_format+"</em><br/>"+info[this.series.name];
            }
        },
        series: [
            { name: "Studies", lineWidth: 15, data: [ [Date.UTC(2004,  3, 1), 0 ], [Date.UTC(2007, 11, 01), 0 ], ] },
            { name: "Studies", lineWidth: 15, data: [ [Date.UTC(2008,  3, 1), 1 ], [Date.UTC(2009, 11, 01), 1 ], ] },
            { name: "Scoring Analyst", lineWidth: 15, data: [ [Date.UTC(2010, 8, 1), 2 ], [Date.UTC(2011,  2, 1), 2 ], ] },
            { name: "Risk Analyst", lineWidth: 15, data: [ [Date.UTC(2011,  2, 1), 3 ], [Date.UTC(2013,  1, 1), 3], ] },
            { name: "Data Scientist", lineWidth: 15, data: [ [Date.UTC(2013,  1, 1), 4], [Date.UTC(new Date().getFullYear(),  new Date().getMonth(), 1), 4], ] }
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

// Wordcloud
    var fill = d3.scale.category20();
    var width = parseInt($("#container3").css("width"))
    var height = parseInt($("#container3").css("height"))

    var words = [{text: "R", size: 25}, {text: "Statistics", size: 20}, {text: "D3JS", size: 25}, {text: "Javascript", size: 25},
        {text: "Python", size: 20}, {text: "Modelling", size: 20}, {text: "Visualization", size: 20}, {text: "Github", size: 20},
        {text: "Django", size: 20}, {text: "Arduino", size: 20}, {text: "Guitar", size: 20}, {text: "Music", size: 20},
        {text: "Programming", size: 20}, {text: "The smell of freshly-cut grass", size: 10},
        {text: "I don't like wordclouds", size: 10}, {text: "Predictions", size: 20}, {text: "Data", size: 25},
        {text: "Domotic", size: 20}, {text: "Shiny", size: 20}, {text: "dplyr", size: 20}, {text: "RStudio", size: 20},
        {text: "", size: 20}, {text: "", size: 20}, {text: "", size: 20}, {text: "", size: 20},
        {text: "", size: 20}, {text: "", size: 20}, {text: "", size: 20}, {text: "", size: 20},]

    d3.layout.cloud().size([width, height])
        .words(words)
        .padding(5)
        .rotate(function() { return Math.floor(Math.random() * 120) + 1 - 60; })
        //.rotate(function() { return ~~(Math.random() * 2) * 90; })
        //.rotate(function() { return 0; })
        .font("Lato")
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
            .style("font-family", 'Lato')
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
        }

// Trip
    trip_texts = [
        "I haz some <b>codez</b> skills",
        "Visualization is the better way to <b>comunicate</b> something,<br> so I learn this topic every day",
        "Someone said digging into the <b>data</b>?",
        "I enjoy <b>experiment</b> with data and js libraries",
        "I studied statistics.<br>Actually I'm a statistician and developer (a <i>DatArtist</i>) at Foris",
        "My interests are related to programming<br>and predictive models",
        "I (<i class='fa fa-heart-o'></i>|try to do|like) a lot of things",
        "You can find me in various places!",
    ]

    var trip = new Trip([
        { sel : $("#codez"), content : trip_texts[0], position : "s", delay: 3000 },
        { sel : $("#stats"), content : trip_texts[1], position : "s", delay: 3000 },
        { sel : $("#data"), content : trip_texts[2], position : "s", delay: 3000 },
        { sel : $("#experiment"), content : trip_texts[3], position : "s", delay: 3000 },
        { sel : $("#experience"), content : trip_texts[4], position : "n", delay: 4000 },
        { sel : $("#interests"), content : trip_texts[5], position : "n", delay: 4000 },
        { sel : $("#hobby"), content : trip_texts[6], position : "n", delay: 4000 },
        { sel : $("#container4"), content : trip_texts[7], position : "n", delay: 4000 },
      ], {
        tripTheme : "white",
        animation: "fadeIn",
        backToTopWhenEnded : true,
        onTripChange : function(i, tripData) {
            selectors = ["#experience", "#interests", "#hobby", "#otherplaces"];
            $('html,body').animate({ scrollTop: tripData.sel.offset().top - 100}, 'slow');
            if(_.contains(selectors, tripData.sel.selector)){
                $(".item").css("opacity", .1);
                tripData.sel.css("opacity", 1);
            } else {
                $(tripData.sel.selector + " > i").css("color", "white")
                _.each(selectors, function(d){
                    $(d).css("opacity", .1);
                })
            }
        },
        onTripEnd : function() {
            $(".item").css("opacity", 1)
        },
      });

    $("#start-trip").on("click", function() {
        trip.start();
    });

});