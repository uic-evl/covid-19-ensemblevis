import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { rgb } from 'd3';
import * as $ from 'jquery';

@Component({
  selector: 'app-calender-plot',
  templateUrl: './calender-plot.component.html',
  styleUrls: ['./calender-plot.component.css']
})
export class CalenderPlotComponent implements OnInit {

  constructor() { }


  public CalenderPlot( models:any, countySelect:any): void {
    d3.selectAll('.Calender').remove()
    d3.selectAll('.x axis').remove()
	  d3.selectAll('.y axis').remove()

    var margin = {top: 5, right: 2, bottom: 5, left: 5};
    var width1:any = $("#CalenderPlot").width();
    var width:any = width1- margin.left - margin.right;
    var height1:any = $("#CalenderPlot").height();
    var height:any = height1 - margin.top - margin.bottom;

    var itemSize = 12,
    cellSize = itemSize - 1;


    var Calenderdata = [];

    if(countySelect=="007"){
    	for (var week:any=0; week<=65; week++)
		  {
			  for(model in models){
				  var s = 0
				  var k = 0
          var county1;
				  for(county in models[model]){
					  //console.log(county, week, models[0][model][county][week].diff)
					  if(!isNaN(models[model][county][week].diff)){
						  s = s + models[model][county][week].diff;
					  }
					  k = k+1;
					  var b:any = s/k;
					  if(b==0){
						  b = "NaN"
					  }
            county1 = county;
				  }
				  Calenderdata.push({"model": model, "county": county1, "week": week, "error": b})
			  }
		  }
    }
    else{
    	   for(var model in models){
    			for(var county in models[model]){
    				for(var week1 in models[model][county]){
    					Calenderdata.push({"model": model, "county": county, "week": week1, "error": models[model][county][week1].diff})
    				}
    			}
    		}
    }
    //console.log(Calenderdata)
    var x_elements:any = new Set(Calenderdata.map(function( item ) { return item.week; } )).values(),
        y_elements:any = new Set(Calenderdata.map(function( item ) { return item.model; } )).values();
        
        //console.log(y_elements.size())

    const xScale:any = d3.scaleBand()
        .domain(x_elements)
        .range([0, 66 * itemSize]);

    var xAxis = d3.axisTop(xScale)
        .tickFormat(function (d:any) {
            return d;
        })

    const yScale:any = d3.scaleBand()
        .domain(y_elements)
        .range([0, 36 * itemSize]);

    var yAxis = d3.axisLeft(yScale)
        .tickFormat(function (d:any) {
            return d;
        })

    for(var NaNVal in Calenderdata){
          //console.log(typeof Calenderdata[NaNVal].error)
          if(isNaN(Calenderdata[NaNVal].error)){
            Calenderdata[NaNVal].error = 100000;
          }
    }

    var CalenderPlot = d3.select("#CalenderPlot")
        .append("svg")
        .attr("width", width1)
        .attr("height", height1)
        .attr("class", "Calender")
        .append("g")
        .attr("transform", "translate(180,45)");

    CalenderPlot.append("text")
        .attr("y", -40)
        .attr("x", "30%")
        .attr("dy", ".40em")
        .style("text-anchor", "start")
        .style("font" ,"12px sans-serif")
        .text("Weeks");

    if(countySelect!="007"){
      CalenderPlot.append("text")
                  .attr("y", 450)
                  .attr("x", "25%")
                  .attr("dy", ".40em")
                  .style("text-anchor", "start")
                  .style("font" ,"18px sans-serif")
                  .text("County: " + countySelect);
    }

    // var colorScale = d3.scaleThreshold()
    //     	.domain([-1300, -1000, -500, -200, -150, -100, 0, 100, 500, 1500, 100000])
    //       .range(["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061", "#999999"]);
    //     	.range([rgb(103, 0, 31), rgb(178, 24, 43), rgb(214, 96, 77), rgb(244, 165, 130), 
    //         rgb(253, 219, 199), rgb(209, 229, 240), rgb(146, 197, 222), rgb(67, 147, 195), 
    //         rgb(33, 102, 172), rgb(5, 48, 97), rgb(153, 153, 153)]);

    var tooltipClenderPlot = d3.select("#tooltipClenderPlot")
            .attr("class", "tooltip")
            .style("opacity", 0);

    var newData = []
    if(countySelect != "007"){
        for(var j in Calenderdata){
            if(Number(Calenderdata[j].county)==Number(countySelect)){
                //console.log(Calenderdata[j])
                newData.push(Calenderdata[j])
                
            }
        }
        
    }
    else{
        newData = Calenderdata;
    }

    //console.log(newData)

    var cells = CalenderPlot.selectAll('rect')
        	.data(newData)
        	.enter().append('g').append('rect')
        	.attr('class', 'cell')
        	.attr('width', cellSize)
        	.attr('height', cellSize)
        	.attr('y', function(d) {  return yScale(d.model); })
        	.attr('x', function(d) { return xScale(d.week); })
        	.attr('fill', function(d) { 
            if(d.error<=-1000){return "#67001f"}
            else if(d.error>-1000 && d.error<=-500){return "#b2182b"}
            else if(d.error>-500 && d.error<=-200){return "#d6604d"}
            else if(d.error>-200 && d.error<=-150){return "#f4a582"}
            else if(d.error>-150 && d.error<=-100){return "#fddbc7"}
            else if(d.error>-100 && d.error<=0){return "#f7f7f7"}
            else if(d.error>0 && d.error<=100){return "#d1e5f0"}
            else if(d.error>100 && d.error<=150){return "#92c5de"}
            else if(d.error>150 && d.error<=200){return "#4393c3"}
            else if(d.error>200 && d.error<=500){return "#2166ac"}
            else if(d.error==100000){return "#999999"}
            else{return "#053061";};
           })
        	.attr('stroke', 'black')
        	.attr('stroke-width', '0.3px')
        	.on("mouseover", function(event:any, d:any) {
        		if(d.error==100000)
        		{
        			var errorVal = "No Information";
        		}
        		else{
        			errorVal = d.error;
        		}
        		tooltipClenderPlot.transition()
                   .duration(200)
                   .style("opacity", .9);
                 tooltipClenderPlot.html("Model name: " + d.model + "<br/>" +
                            "Error: "  + errorVal + "<br/>" +
                            "Week: "  + d.week + "<br/>")
                   .style("left", (event.pageX + 5) + "px")
                   .style("top", (event.pageY - 28) + "px");
        	})
        	.on("mouseout", function(event:any, d:any) {
              tooltipClenderPlot.transition()
                   .duration(500)
                   .style("opacity", 0);
          	});

        	CalenderPlot.append("g")
        		.attr("class", "y axis")
        		.call(yAxis)
        		.selectAll('text')
        		.attr('font-weight', 'normal');

    		CalenderPlot.append("g")
        		.attr("class", "x axis")
        		.call(xAxis)
        		.selectAll('text')
        		.attr('font-weight', 'normal')
        		.style("text-anchor", "start")
        		.attr("dx", ".8em")
        		.attr("dy", ".5em")
        		.attr("transform", function (d) {
            		return "rotate(-65)";
        		});





  }

  ngOnInit(): void {
  }

}
