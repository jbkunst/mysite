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

// Wordcloud
    var fill = d3.scale.category20();
    var width = parseInt($("#container3").css("width"))
    var height = parseInt($("#container3").css("height"))

    var words = [{text: "R", size: 25}, {text: "Statistics", size: 20}, {text: "D3JS", size: 25}, {text: "Javascript", size: 25},
        {text: "Python", size: 20}, {text: "Modelling", size: 20}, {text: "Visualization", size: 20}, {text: "Github", size: 20},
        {text: "Django", size: 20}, {text: "Arduino", size: 20}, {text: "Guitar", size: 20}, {text: "Music", size: 20},
        {text: "Programming", size: 20}, {text: "The smell of freshly-cut grass", size: 10},
        {text: "I don't like wordclouds", size: 10}, {text: "Predictions", size: 20}, {text: "Data", size: 25},
        {text: "Domotic", size: 20}, {text: "", size: 20}, {text: "", size: 20}, {text: "", size: 20},
        {text: "", size: 20}, {text: "", size: 20}, {text: "", size: 20}, {text: "", size: 20},
        {text: "", size: 20}, {text: "", size: 20}, {text: "", size: 20}, {text: "", size: 20},]

    d3.layout.cloud().size([width, height])
        .words(words)
        .padding(5)
        .rotate(function() { return Math.floor(Math.random() * 120) + 1 - 60; })
        //.rotate(function() { return ~~(Math.random() * 2) * 90; })
        //.rotate(function() { return 0; })
        .font("Open Sans")
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

// Force Layout
    var width = parseInt($("#container4").css("width"))
    var height = parseInt($("#container4").css("height"))
    var nodes = [
        {
            name: "Linkedin",
            color: "#0E76A8",
            ulr: "http://www.linkedin.com/in/joshuakunst",
            path: "M 256.417,430c-113.771,0-206-92.229-206-206s 92.229-206, 206-206s 206,92.229, 206,206 S 370.188,430, 256.417,430z M 201.456,124.408l-45.229,0 L 156.227,270.531 l 45.229,0 L 201.456,124.408 z M 178.626,289.667c-14.771,0-26.746,12.072-26.746,26.963 s 11.975,26.963, 26.746,26.963c 14.77,0, 26.745-12.072, 26.745-26.963S 193.396,289.667, 178.626,289.667z M 370.953,124.408l-45.010,0  c0,0,0,55.666,0,76.703s-7.991,32.781-24.626,32.781c-18.103,0-27.562-12.231-27.562-32.781c0-22.504,0-76.703,0-76.703l-43.38,0  L 230.375,270.531 l 43.38,0 l0-19.679 c0,0, 13.047,24.137, 44.032,24.137c 30.986,0, 53.165-18.918, 53.165-58.058 C 370.953,177.791, 370.953,124.408, 370.953,124.408z"},
        {
            name: "g+",
            color: "#DD1812",
            ulr: "https://plus.google.com/+JoshuaKunst/posts",
            path: "M 273.369,148.341c0-20.247-16.443-36.065-50.481-36.065c-26.625,0-45.852,16.854-45.852,37.1 c0,19.84, 22.562,36.957, 49.186,36.664C 255.762,186.039, 273.369,167.642, 273.369,148.341z M 462.417,223c0-113.771-92.229-206-206-206 s-206,92.229-206,206s 92.229,206, 206,206S 462.417,336.771, 462.417,223z M 296.303,150.695c0,18.691-6.979,30.903-28.096,46.725 c-21.417,15.619-26.65,24.443-6.208,40.248c 11.519,8.906, 19.591,20.778, 19.591,35.436c0,15.969-6.53,30.457-18.809,37.492l 17.404,0  l 14.816,15.551c0,0-55.854,0-66.303,0c-41.39,0-61.685-24.809-61.685-52.098c0-27.889, 19.132-49.854, 56.492-49.854  c-5.792-11.693-3.466-22.494, 6.011-30.217c-63.807,0-77.461-27.998-77.461-49.566c0-27.945, 32.123-44.559, 70.643-44.559 C 275.367,99.854, 296.303,127.766, 296.303,150.695z M 382.776,292.5l-30.589,0 l0,30.588 l-15.293,0 L 336.894,292.5 l-30.589,0 l0-15.294 l 30.589,0 l0-30.588  l 15.293,0 l0,30.588 l 30.589,0 L 382.776,292.5 z M 254.949,272.106c-3.083,23.466-18.371,42.719-36.234,43.256 c-17.869,0.532-29.854-17.427-26.767-40.899c 3.085-23.467, 20.067-39.859, 37.939-40.398 C 247.75,233.533, 258.031,248.637, 254.949,272.106z"},
    ];
    
    var svg = d3.select("#container4")
        .append("center")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var force = d3.layout.force()
        .gravity(.10)
        .distance(300)
        .charge(-180)
        .size([width, height]);

    force.nodes(nodes).start();

    var node = svg.selectAll(".node")
            .data(nodes)
        .enter().append("g")
            .attr("class", "node")
            .call(force.drag);

    node.append("path")
        .attr("d", function(d) { return d.path; })
        .attr("transform", "scale(-0.1, 0.1) rotate(-180 100 100)")
        .attr("class", function(d){ return d.class; })
        .style("fill", function(d) { return "white"; })
        .on("mouseover", function(d){
            d3.select(this).transition().style("fill", d.color)
        })
        .on("mouseout", function(d){
            d3.select(this).transition().style("fill", "white")
        })
        .on("click", function(d){
            // window.open(d.url,'_blank');
        });

    force.on("tick", function() {
        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});
    });

// Trip
    trip_texts = [
        "I haz some <b>codez</b> skills",
        "Visualization is the better way to <b>comunicate</b> something,<br> so I learn this topic every day",
        "Someone said digging into the <b>data</b>?",
        "I <b>enjoy</b> join data and new js libraries :)",
        "I studied statistics.<br>Actually I'm a statistician and developer at Foris",
        "My interests are all related to programming,<br>and predictive models",
        "I (<i class='fa fa-heart-o'></i>|try to do|like) a lot of things",
        "You can find me in various places!",
    ]

    var trip = new Trip([
        { sel : $("#codez"), content : trip_texts[0], position : "s", delay: 3000 },
        { sel : $("#stats"), content : trip_texts[1], position : "s", delay: 3000 },
        { sel : $("#data"), content : trip_texts[2], position : "s", delay: 3000 },
        { sel : $("#experiment"), content : trip_texts[3], position : "s", delay: 3000 },
        { sel : $("#experience"), content : trip_texts[4], position : "e", delay: 4000 },
        { sel : $("#interests"), content : trip_texts[5], position : "w", delay: 4000 },
        { sel : $("#hobby"), content : trip_texts[6], position : "e", delay: 4000 },
        { sel : $("#otherplaces"), content : trip_texts[7], position : "w", delay: 4000 },
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