import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as $ from 'jquery';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent implements OnInit {

  constructor() { }

  public ScatterPlot( population:any, models:any, week:any, container:any): void {
    var margin = {top: 20, right: 10, bottom: 22, left: 5};
    var width1:any = $(container).width();
    var width:any = width1 - margin.left - margin.right-15;
    var height1:any = $(container).height();
    var height:any =  height1 - margin.top - margin.bottom;

    var data = []
    for(var county in models["COVIDhub-ensemble"]){
    	data.push({"CountyID": county, "population": population[county], "value": models["COVIDhub-ensemble"][county][week].diff, "normalized":
    		models["COVIDhub-ensemble"][county][week].diff/population[county]})
    }
    var FilteredData = []
    FilteredData = data.filter(function(d) {return ! isNaN(d.value);})

    let maxPopulation:any = d3.max(Object.values(population))
    let minPopulation:any = d3.min(Object.values(population))

    var xScale = d3.scaleLog().range([0, width]).domain([minPopulation, maxPopulation]); // value -> display
    var xAxis = d3.axisBottom(xScale).ticks(10);
    
    var yMax:any = d3.max(FilteredData, d => d.normalized)
    var yMin:any = d3.min(FilteredData, d => d.normalized)

    var yScale = d3.scaleLinear().range([height, 0]).domain([yMin, yMax]); // value -> display
    var yAxis = d3.axisLeft(yScale).ticks(10);

    var ScatterPlot = d3.select(container)
        .append("svg")
        .attr("width", width1)
        .attr("height", height1)
        .attr("class", "ScatterPlotClass")
        .append("g")
        .attr("transform", "translate(37,-2)");

    var tooltipScatterlot = d3.select("#tooltip_ScatterPlot")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var x_axis = ScatterPlot.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", 25)
        .style("text-anchor", "end")
        .text("Populationn");

    var axis = width-520;
    var y_axis = ScatterPlot.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0)
            .attr("y", 15)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Normalized v");


    var circles = ScatterPlot.selectAll("circle")
            .data(FilteredData)
            .enter().append("circle")
            .attr("class", "point")
            .attr("id", function(d){
              return "point_" + week;
            })
            .attr("cx", d=> xScale(d.population))
            .attr("cy", d=> yScale(d.normalized))
            .attr("r", 3)
            .attr("fill", "#4393c3")
            .attr("stroke", "black")
            .on("mouseover", function(event, d) {
              tooltipScatterlot.transition()
                     .duration(200)
                     .style("opacity", .9);
                   tooltipScatterlot.html("County: " + d.CountyID + "<br/>" +
                              "Population: "  + d.population + "<br/>" +
                              "Normalized Error:"  + d.normalized + "<br/>")
                     .style("left", (event.pageX + 5) + "px")
                     .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(event, d) {
                tooltipScatterlot.transition()
                     .duration(500)
                     .style("opacity", 0);
              })

              //console.log(circles.data())

    var WeekName = ScatterPlot.append("g")
              .attr("width",40)
              .attr("height",70)
              .attr("class","text cancer-legend-heading")
              .append('text')
              .attr("x","75%")
              .attr("y","82%")
              .attr("font-size",'15px')
              .text('Week:' +" "+ week);


    var brush = d3.brush()
              .on("brush", selectpoint)
              .on("end", Selectcounty);
    ScatterPlot.append("g")
              .call(brush);


    function selectpoint(event:any, d:any)
    {
      if (event.selection != null) {

                // revert circles to initial style
          circles.attr("class", "point");
          d3.selectAll(".county")
              .style('stroke', '#636363')
              .style('stroke-width', "1px");

          var brush_coords = event.selection;
          //console.log(brush_coords)

          // style brushed circles
          var co:any = circles.filter(function (){

              var cx:any = d3.select(this).attr("cx"),
              cy:any = d3.select(this).attr("cy");

              //console.log("cx is: " + cx, "cy is: " + cy)

              return isBrushed(brush_coords, cx, cy);
          })
          co.attr("class", "brushed");
          //console.log(co.data())
      }
    }

    function isBrushed(brush_coords:any, cx:any, cy:any) {

      var x0 = brush_coords[0][0],
          x1 = brush_coords[1][0],
          y0 = brush_coords[0][1],
          y1 = brush_coords[1][1];

       return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
 }

    function Selectcounty(event:any, d:any){
      //console.log("Hi")
      // disregard brushes w/o selections  
      // ref: http://bl.ocks.org/mbostock/6232537
      if (!event.selection) {
        //console.log("check event")
        return;
      }

      // programmed clearing of brush after mouse-up
      // ref: https://github.com/d3/d3-brush/issues/10
      //d3.select(this).call(brush.move, null);

      var d_brushed =  d3.selectAll(".brushed").data();
      console.log(d_brushed)

      // populate table if one or more elements is brushed
        if (d_brushed.length > 0) {
            d3.selectAll(".county")
          .style('stroke', '#636363')
            .style('stroke-width', "1px");
            d_brushed.forEach(d_row => HighlightMap(d_row))
        } else {
            d3.selectAll(".county")
          .style('stroke', '#636363')
            .style('stroke-width', "1px");
        }
    }

    function HighlightMap(d_row:any) {
      d3.select("#path_"+Number(d_row.CountyID))
      .style('stroke', 'red')
        .style('stroke-width', "3px");
    }


  

  }

  ngOnInit(): void {
  }

}
