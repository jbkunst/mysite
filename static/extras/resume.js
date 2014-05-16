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
                        "Studies": "Mathematics and Master in Statistics at PUC",
                        "Scoring Analyst": "at Corpbanca",
                        "Risk Analyst": "at Equifax Chile",
                        "Data Scientist": "at Foris"
                    }
                    date_format = Highcharts.dateFormat('%Y - %B', new Date(this.x))
                    return "<b>"+this.series.name+"</b><br/><em>"+date_format+"</em><br/>"+info[this.series.name];
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

// Force Layout
    var width = parseInt($("#container4").css("width"))
    var height = parseInt($("#container4").css("height"))
    // paths in jb-custom-font.dev.svg
    var nodes = [
        {
            name: "Github",
            color: "#FFFFFF",
            url: "https://github.com/jbkunst/",
            path: "M 166.96,168.748c0-0.681-0.779-1.231-1.739-1.231c-0.961,0-1.739,0.551-1.739,1.231 c0,0.683, 0.778,1.234, 1.739,1.234C 166.181,169.982, 166.96,169.431, 166.96,168.748z M 169.361,165.933 c-1.123,0-2.034-0.647-2.034-1.442c0-0.797, 0.911-1.443, 2.034-1.443c 1.122,0, 2.032,0.646, 2.032,1.443 C 171.394,165.285, 170.483,165.933, 169.361,165.933z M 179.201,156.432c-1.387,0-2.512-0.799-2.512-1.782 c0-0.984, 1.125-1.78, 2.512-1.78c 1.386,0, 2.511,0.796, 2.511,1.78C 181.712,155.633, 180.587,156.432, 179.201,156.432z M 156.761,175.996 c-0.737,0-1.335-0.424-1.335-0.947c0-0.521, 0.598-0.945, 1.335-0.945s 1.335,0.424, 1.335,0.945 C 158.096,175.572, 157.498,175.996, 156.761,175.996z M 160.961,173.342c-0.819,0-1.484-0.472-1.484-1.053 c0-0.58, 0.665-1.051, 1.484-1.051c 0.817,0, 1.482,0.471, 1.482,1.051C 162.443,172.87, 161.778,173.342, 160.961,173.342z M 173.921,161.203c-1.248,0-2.26-0.719-2.26-1.604c0-0.887, 1.012-1.604, 2.26-1.604s 2.261,0.717, 2.261,1.604 C 176.182,160.484, 175.169,161.203, 173.921,161.203z M 462,224c0-113.771-92.229-206-206-206S 50,110.229, 50,224S 142.229,430, 256,430 S 462,337.771, 462,224z M 355.902,213.146c 0.604,1.361, 1.202,2.729, 1.719,4.166c 16.121,1.293, 32.729,1.166, 49.435-0.457l 0.265,2.75 c-16.484,1.6-32.881,1.742-48.808,0.526c 2.56,8.17, 3.909,17.398, 3.812,27.893c-0.21,22.294-7.644,39.658-19.326,54.068 c 2.243,13.573, 0.553,27.146-3.681,40.724c-16.694-1.367-31.719-6.834-45.097-16.333c-25.002,5.072-50.001,5.395-75.004,0 c-15.604,10.532-30.928,15.697-46.015,16.333c-4.472-14.951-5.161-29.688-1.38-44.177c-13.162-13.966-18.192-30.92-17.945-49.693 c 0.141-10.747, 1.796-20.31, 4.852-28.765c-15.694,1.151-31.825,0.997-48.049-0.575l 0.266-2.75 c 16.521,1.604, 32.947,1.736, 48.902,0.488c 0.586-1.42, 1.175-2.836, 1.848-4.188c-17.287,0.456-32.845-1.046-47.415-4.629l 0.657-2.68 c 14.788,3.634, 30.63,5.098, 48.317,4.502c 11.697-20.781, 34.215-32.992, 67.006-36.867c-7.618-6.188-11.714-13.486-12.769-21.745 c0,0-3.447,0-17.367,0c-23.324,0-29.683,29.739-53.841,26.806c 23.437-11.623, 18.756-48.773, 56.259-48.773 c 12.604,0, 15.283,0, 15.756,0l0-34.054 c 0.167-5.503-2.229-9.183-6.098-11.733c 13.431-1.355, 23.524,5.35, 23.524,13.574 c0,8.227,0,41.004,0,45.014s 4.199,4.32, 4.199,4.32l0-52.555 c 0.178-5.23-2.364-8.203-5.062-11.044 c 11.833-0.472, 22.963,1.892, 23.467,11.962c0,0,0,47.77,0,50.299c0,2.528, 4.145,2.591, 4.145,0c0-2.592,0-47.938,0-47.938 c 0.122-8.496, 7.46-15.384, 23.006-14.322c-4.159,3.348-5.436,6.731-5.436,11.628s0,51.971,0,51.971s 4.285,0.219, 4.285-4.32 c0-4.54,0-36.238,0-43.834c0-9.756, 11.711-13.781, 25.077-13.402c-4.379,3.28-7.343,7.192-7.361,12.424l0,52.715  c-0.452,7.748-3.603,15.053-9.779,21.858c 29.975,4.603, 51.579,16.567, 62.337,38.013c 17.745,0.609, 33.635-0.851, 48.461-4.496 l 0.658,2.68C 389.038,212.137, 373.352,213.637, 355.902,213.146z M 213.73,148.861c-1.54,0-2.79-0.889-2.79-1.981 s 1.25-1.979, 2.79-1.979c 1.541,0, 2.79,0.887, 2.79,1.979S 215.271,148.861, 213.73,148.861z M 204.521,149.040 c-1.541,0-2.789-0.888-2.789-1.981c0-1.092, 1.248-1.979, 2.789-1.979c 1.54,0, 2.79,0.887, 2.79,1.979 C 207.311,148.152, 206.061,149.040, 204.521,149.040z M 195.19,149.341c-1.54,0-2.79-0.888-2.79-1.981c0-1.092, 1.25-1.979, 2.79-1.979 c 1.542,0, 2.79,0.887, 2.79,1.979C 197.98,148.453, 196.732,149.341, 195.19,149.341z M 186.342,151.951c-1.542,0-2.791-0.888-2.791-1.98 c0-1.094, 1.249-1.98, 2.791-1.98c 1.54,0, 2.789,0.887, 2.789,1.98C 189.131,151.063, 187.882,151.951, 186.342,151.951z"
        },
        {
            name: "Linkedin",
            color: "#0E76A8",
            url: "http://www.linkedin.com/in/joshuakunst",
            path: "M 256.417,430c-113.771,0-206-92.229-206-206s 92.229-206, 206-206s 206,92.229, 206,206 S 370.188,430, 256.417,430z M 201.456,124.408l-45.229,0 L 156.227,270.531 l 45.229,0 L 201.456,124.408 z M 178.626,289.667c-14.771,0-26.746,12.072-26.746,26.963 s 11.975,26.963, 26.746,26.963c 14.77,0, 26.745-12.072, 26.745-26.963S 193.396,289.667, 178.626,289.667z M 370.953,124.408l-45.010,0  c0,0,0,55.666,0,76.703s-7.991,32.781-24.626,32.781c-18.103,0-27.562-12.231-27.562-32.781c0-22.504,0-76.703,0-76.703l-43.38,0  L 230.375,270.531 l 43.38,0 l0-19.679 c0,0, 13.047,24.137, 44.032,24.137c 30.986,0, 53.165-18.918, 53.165-58.058 C 370.953,177.791, 370.953,124.408, 370.953,124.408z"
        },
        {
            name: "g+",
            color: "#DD1812",
            url: "https://plus.google.com/+JoshuaKunst/posts",
            path: "M 273.369,148.341c0-20.247-16.443-36.065-50.481-36.065c-26.625,0-45.852,16.854-45.852,37.1 c0,19.84, 22.562,36.957, 49.186,36.664C 255.762,186.039, 273.369,167.642, 273.369,148.341z M 462.417,223c0-113.771-92.229-206-206-206 s-206,92.229-206,206s 92.229,206, 206,206S 462.417,336.771, 462.417,223z M 296.303,150.695c0,18.691-6.979,30.903-28.096,46.725 c-21.417,15.619-26.65,24.443-6.208,40.248c 11.519,8.906, 19.591,20.778, 19.591,35.436c0,15.969-6.53,30.457-18.809,37.492l 17.404,0  l 14.816,15.551c0,0-55.854,0-66.303,0c-41.39,0-61.685-24.809-61.685-52.098c0-27.889, 19.132-49.854, 56.492-49.854  c-5.792-11.693-3.466-22.494, 6.011-30.217c-63.807,0-77.461-27.998-77.461-49.566c0-27.945, 32.123-44.559, 70.643-44.559 C 275.367,99.854, 296.303,127.766, 296.303,150.695z M 382.776,292.5l-30.589,0 l0,30.588 l-15.293,0 L 336.894,292.5 l-30.589,0 l0-15.294 l 30.589,0 l0-30.588  l 15.293,0 l0,30.588 l 30.589,0 L 382.776,292.5 z M 254.949,272.106c-3.083,23.466-18.371,42.719-36.234,43.256 c-17.869,0.532-29.854-17.427-26.767-40.899c 3.085-23.467, 20.067-39.859, 37.939-40.398 C 247.75,233.533, 258.031,248.637, 254.949,272.106z"
        },
        {
            name: "Twitter",
            color: "#00ACEE",
            url: "https://twitter.com/jbkunst",
            path: "M 256,430C 142.229,430, 50,337.771, 50,224s 92.229-206, 206-206s 206,92.229, 206,206S 369.771,430, 256,430z M 359.599,259.494c 3.021-67.199-47.096-142.124-135.802-142.124c-26.981,0-52.096,7.911-73.238,21.466 c 25.347-2.987, 50.646,4.044, 70.734,19.786c-20.907,0.386-38.554,14.198-44.632,33.181c 7.486-1.432, 14.851-1.013, 21.575,0.816 c-22.976,4.617-38.839,25.317-38.321,47.453c 6.44-3.58, 13.81-5.729, 21.642-5.977c-21.278,14.221-27.303,42.318-14.785,63.789 c 23.563-28.906, 58.77-47.928, 98.478-49.92c-6.969,29.886, 15.702,58.667, 46.542,58.667c 13.742,0, 26.16-5.802, 34.874-15.088 c 10.884,2.143, 21.108,6.119, 30.341,11.594c-3.567-11.157-11.144-20.521-21.008-26.433c 9.665,1.153, 18.874,3.722, 27.441,7.523 C 377.035,274.645, 368.935,266.229, 359.599,259.494z"
        },
        {
            name: "Stackoverflow",
            color: "#EF8236",
            url: "http://stackoverflow.com/users/829971/jbkunst",
            path: "M 256.417,430c-113.771,0-206-92.229-206-206s 92.229-206, 206-206s 206,92.229, 206,206 S 370.188,430, 256.417,430z M 226.209,290.183l 84.822-50.029l-10.686-18.114l-84.827,50.033L 226.209,290.183z M 203.517,241.659 l 95.099-25.563l-5.457-20.312l-95.104,25.566L 203.517,241.659z M 194.086,197.685l 98.060-9.035l-1.927-20.938l-98.063,9.025 L 194.086,197.685z M 289.766,161.683l 0.014-21.038l-98.481-0.045l-0.009,21.031L 289.766,161.683z M 323.241,107.348L 160.512,107.348 L 160.512,209.832  l 16.823,0 l0-85.982 l 129.168,0 l0,85.982 l 16.738,0 L 323.241,107.348 z M 314.453,243.040l-55.487,81.36l 17.38,11.849l 55.483-81.364L 314.453,243.040z M 335.597,256.163l-16.845,97.025l 20.725,3.597l 16.847-97.025L 335.597,256.163z"
        },
        {
            name: "LastFM",
            color: "#C3000D",
            url: "http://www.lastfm.com/user/jbkunst",
            path: "M 256.417,430c-113.771,0-206-92.229-206-206s 92.229-206, 206-206s 206,92.229, 206,206 S 370.188,430, 256.417,430z M 324.352,151.9c-51.436,0-69.275,23.19-78.787,52.029l-9.514,29.732 c-7.137,21.705-15.463,38.652-41.625,38.652c-18.139,0-36.572-13.082-36.572-49.651c0-28.543, 14.568-46.383, 35.086-46.383 c 23.188,0, 38.65,17.246, 38.65,17.246l 9.516-25.867c0,0-16.059-15.756-49.652-15.756c-41.625,0-64.816,24.377-64.816,69.572 c0,46.975, 23.191,74.625, 66.896,74.625c 39.543,0, 59.467-14.271, 71.951-52.923l 9.812-29.729c 7.137-21.707, 19.623-37.463, 49.65-37.463 c 20.219,0, 30.92,4.459, 30.92,15.459c0,8.623-5.051,14.866-20.215,18.436l-20.219,4.756c-24.676,5.945-34.488,18.73-34.488,38.948 c0,32.409, 26.164,42.517, 52.924,42.517c 30.326,0, 48.76-11, 51.137-37.758l-29.73-3.569c-1.191,12.785-8.92,18.138-23.191,18.138 c-13.084,0-21.111-5.948-21.111-16.057c0-8.918, 3.867-14.271, 16.947-17.244l 19.027-4.162c 25.57-5.947, 39.25-18.435, 39.25-42.517 C 386.197,163.197, 361.223,151.9, 324.352,151.9z"
        },
        {
            name: "RSS",
            color: "#EE802F",
            url: "http://jkunst.com/blog/rss/",
            path: "M 256,430C 142.229,430, 50,337.771, 50,224s 92.229-206, 206-206s 206,92.229, 206,206S 369.771,430, 256,430z M 189.203,123.408c-16.381,0-29.66,13.278-29.66,29.66c0,16.381, 13.279,29.658, 29.66,29.658s 29.659-13.277, 29.659-29.658 C 218.862,136.687, 205.584,123.408, 189.203,123.408z M 260.083,123.408c-0.567,55.189-45.352,99.971-100.54,100.539l0,43.939  c 79.544-0.568, 143.91-64.934, 144.479-144.479L 260.083,123.407 z M 334.513,123.408c-0.133,46.756-18.396,90.693-51.474,123.771 c-33.011,33.012-76.843,51.267-123.496,51.47l0,43.944 c 120.806-0.422, 218.637-98.345, 218.913-219.184L 334.513,123.409 z"
        },
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
        .style("fill", function(d) { return d.color })
        .attr("title", function(d) { return d.name })
        .attr("id", function(d) { return d.name + "_icon" })
        .on("mouseover", function(d){
            $(this).tooltipster({
                content: d.name,
                theme: "tooltipster-light",
                position: "bottom",
                offsetX: 21,
                offsetY: 42,
            })
            .tooltipster("show")
        })
        .on("mouseout", function(d){
            $(this).tooltipster("destroy")
        })
        .on("click", function(d){
            window.open(d.url,'_blank');
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