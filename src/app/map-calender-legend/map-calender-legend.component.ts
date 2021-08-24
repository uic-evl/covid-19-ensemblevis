import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as $ from 'jquery';

@Component({
  selector: 'app-map-calender-legend',
  templateUrl: './map-calender-legend.component.html',
  styleUrls: ['./map-calender-legend.component.css']
})
export class MapCalenderLegendComponent implements OnInit {

  constructor() { }

  private drawlgend():void{
    var width:any = $("#mapCalenderLegend").width();
    //console.log(width);
    var height:any = $("#mapCalenderLegend").height();
    //console.log(height)
    var legend = d3.select("#mapCalenderLegend")
          .append("svg")
          .attr("width", width)
        	.attr("height",height)


          legend.append('g')
          .attr("transform", "translate(10, 10)")
          .attr("class","text cancer-legend-heading")
          .append('text')
          .attr("x","5%")
          .attr("y","25%")
          .attr("font-size",'13px')
          .text('COVID-19 Average Error');

       var colorRange = ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061", "#999999"]
       var legendText = ['-1600', '-1300', '-1000', '-500', '-200', '-150', '-100', '0', '100', '200', '300', 'No Information']

      // var key = d3.select("#mapCalenderLegend")
          var key = legend.append("g")
          .attr("class","legend")
          .attr("transform", "translate(50, 350)");

          for(var i=0;i<12;i++){
            key.append("g:rect")
            .attr("y", i*30)
            .attr("height", 30)
            .attr("width", 18)
            .style("fill", colorRange[i])
            .style("opacity", "0.9");

            var line = i*30

            key.append("line")
              .attr("y", 32)
              .attr("x1", -30)
              .attr("x2", -12)
              .attr("stroke", "#000")
              .attr("transform", "translate(30, " + line + ")");

              key.append("text")
                .attr("y", (i* 30)+7)
                .attr("x", 30)
                .attr("dy", ".35em")
                .style("text-anchor", "start")
                .style("font" ,"12px sans-serif")
                .text(String(legendText[i]));
          }
  }

  ngOnInit(): void {
    this.drawlgend();
  }

}

