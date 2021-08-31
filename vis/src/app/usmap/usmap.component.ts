import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { HierarchyPointNode } from "d3";
import { FeatureCollection } from 'geojson';
//import { GeometryCollection } from 'geojson';
import * as topojson from "topojson";
//declare var $: any;
import * as $ from 'jquery';
import { CalenderPlotComponent } from '../calender-plot/calender-plot.component';


@Component({
  providers:[ CalenderPlotComponent ],
  selector: 'app-usmap',
  templateUrl: './usmap.component.html',
  styleUrls: ['./usmap.component.css']
})
export class USmapComponent implements OnInit {

  constructor() { }

  public drawMap(county: any, models:any): void {
	let calenderPlot = new CalenderPlotComponent();

    var countyData = (topojson.feature(county, county.objects.counties) as unknown as FeatureCollection).features

    var AvgCheck:any = [];
    var ModelsData = models;

    var width:any = $("#map-layer").width();
    //console.log(width);
    var height:any = $("#map-layer").height();
    //console.log(height)
    var center = [-87.623177, 41.881832];
    var scale = 140;
    var tooltip = d3.select("#tooltip-map")
                    .attr("class", "tooltip")
                    .style("opacity", 1);
    var path = d3.geoPath();

    var svg = d3.select(".map")
          .append("svg")
          .attr("width", width)
        	.attr("height", height);

      svg.append('g')
        	.selectAll('path')
        	.data(countyData)
        	.enter().append('path')
          .attr("id", (item) =>{
        		return "path_" + Number(item["id"])
        	})
          .attr('d', path)
        	.attr('vector-effect', 'non-scaling-stroke')
        	.attr('class', 'county')
        	.attr('stroke', 'black')
          //.attr('fill', 'teal')
          .attr('fill', (item)=>{
            var CountyID = Number(item["id"]);
            for (const [key, value] of Object.entries(models["COVIDhub-ensemble"])) {
              if(Number(key)==CountyID){
                var p:any = value
        				//console.log(p)
        				var sumValue = 0
        				var avgValue = 0
        				var index:any = 0
        				var NanVal = 0
						var AltofDiff;

                for (const [key, value] of Object.entries(p)){
                  var diffValue:any = value
        					if(diffValue["diff"]=="NaN")
        					{
								AltofDiff = 0;
        						NanVal = NanVal + 1;
        					}
							else{
								AltofDiff = diffValue["diff"];
							}
        					sumValue = sumValue+AltofDiff;
        					index = key
        					//console.log(sumValue)
        		}
                index = index - NanVal;
        				avgValue = sumValue/index;
        				AvgCheck.push(avgValue)
        				//console.log(d3.min(AvgCheck), CountyID)
        				// if(avgValue<=-1000)
        				// {
						// 	//console.log("I am <= -1300: "+avgValue)
        				// 	return "#67001f";
        				// }
        				if(avgValue<=-500)
        				{
							//console.log("I am <= -1000: "+avgValue)
        					return "#b2182b";
        				}
        				else if(avgValue>-500 && avgValue<=-200)
        				{
							//console.log("I am <= -500: "+avgValue)
        					return "#d6604d";
        				}
        				else if(avgValue>-200 && avgValue<=-150)
        				{
							//console.log("I am <= -200: "+avgValue)
        					return "#f4a582";
        				}
        				else if(avgValue>-150 && avgValue<=-100)
        				{
							//console.log("I am <= -150: "+avgValue)
        					return "#fddbc7";
        				}
        				else if(avgValue>-100 && avgValue<=0)
        				{
							//console.log("I am <= -100: "+avgValue)
        					return "#f7f7f7";
        				}
        				else if(avgValue>0 && avgValue<=100)
        				{
							//console.log("I am <= -0: "+avgValue)
        					return "#d1e5f0";
        				}
        				else if(avgValue>100 && avgValue<=150)
        				{
							//console.log("I am <= 100: "+avgValue)
        					return "#92c5de";
        				}
        				else if(avgValue>150 && avgValue<=200)
        				{
							//console.log("I am <= 200: "+avgValue)
        					return "#4393c3";
        				}
        				else if(avgValue>200 && avgValue<=500)
        				{
							//console.log("I am <= 300: "+avgValue)
        					return "#2166ac";
        				}
        				else if(avgValue>500)
        				{
							//console.log("I am > 100: "+avgValue)
        					return "#053061";
        				}
              }
            }
             return "teal"
          })
          .attr('data-fips', (item:any) => {
            return item["id"];
          })
          .attr('data-Avg', (item) => {
    			  var CountyID = Number(item["id"]);
    			  for (const [key, value] of Object.entries(models["COVIDhub-ensemble"])) {
        			  if(Number(key)==CountyID){
        				var p:any = value
        				//console.log(key, value)
        				var sumValue = 0
        				var avgValue = 0
        				//index = 0
        				for (const [key, value] of Object.entries(p)){
                  var val:any = value
        					sumValue = sumValue+val["value"]
        					//index = key
        					//console.log(sumValue)
        				}
        				avgValue = sumValue/50;
        				return avgValue
        			}
        				//console.log(value.length)
				    }
            return -5;
			    })
          .on('mouseover', (event:any, d:any) => {
            tooltip.transition()
                  .duration(200)
                  .style("opacity",0.9);
            tooltip.html("County ID: \n" + d.id)  
                  .style("left",`${d3.pointer(event)[0]}px`)   
                  .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", (event:any, d:any) => {
            tooltip.transition()
                  .duration(200)
                  .style("opacity", 0);

          })
          .on('click', (event:any, d:any) => {
            d3.selectAll(".county")
          		.style('stroke', '#000000')
                .style('stroke-width', "1px");

            d3.selectAll(".clicked1")
                    .classed("clicked1", false)
                    .style('stroke', '#000000')
                    .style('stroke-width', "1px");

           	 d3.select(event.currentTarget)
                    .classed("clicked1", true)
                    .style('stroke', 'red')
                    .style('stroke-width', "3px");

			var countySelect = d.id;
			calenderPlot.CalenderPlot( models, countySelect);
			
          })
      
          
  }

  ngOnInit(): void {
  }

}
