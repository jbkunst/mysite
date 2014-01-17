﻿$(function () {
    $(document).ready(function() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
		
		function rnd_norm(){
			var theta, r, noise;
			theta = 2*3.1415*Math.random();
			r = Math.pow(-2*Math.log(Math.random()),0.5);
			norm = r*Math.cos(theta);
			return norm
		}
		
		var yi =  Math.random();
		var phi = -.8;

        var chart;
        chart = new Highcharts.Chart({
            chart: {  renderTo: 'container_m2', type: 'line', marginRight: 10, 
					events: {
						load: function() {
						// set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function() {
									yi = phi*yi + rnd_norm();
									var x = (new Date()).getTime(), // current time
									y = yi;
									series.addPoint([x, y], true, true);
								}, 500);
						}
					}
            },
			title: { text: 'AR(1) with φ = ' + phi, },
            xAxis: { type: 'datetime', tickPixelInterval: 150},
            yAxis: { title: { text: 'Value' }, min: -5, max: 5, plotLines: [{color: '#FF0000', width: 2, value: 0 }] },
            tooltip: { formatter: function() { return '<b>'+ this.series.name +'</b><br/>'+ Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+ Highcharts.numberFormat(this.y, 2);}            },
            legend: { enabled: false },
            exporting: { enabled: false },
			plotOptions: { line: { lineWidth: 1.5, marker: { enabled: false }, states: { hover: { marker: { enabled: true, symbol: 'circle', radius: 1, lineWidth: 1 } } } } },
            series: [{ name: 'Random data',
						data: (function() {
						// generate an array of random data
						var data = [],
							time = (new Date()).getTime(),
							i;
						for (i = -20; i <= 0; i++) {
							yi = phi*yi +  rnd_norm();
							data.push({ x: time + i * 500, y: yi });
						}
						return data;
					})()
            }]
        });
    });
    
});
