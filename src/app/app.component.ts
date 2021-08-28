import { Component } from '@angular/core';
import * as d3 from 'd3';
// import * as d3Queue from 'd3-queue';
declare var $: any;
import { USmapComponent } from './usmap/usmap.component';
import { CalenderPlotComponent } from './calender-plot/calender-plot.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';

@Component({
  providers:[USmapComponent, CalenderPlotComponent, ScatterPlotComponent ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'covid-project-angular';

  public test(){
    let myapp = new USmapComponent();
    let calenderPlot = new CalenderPlotComponent();
    let scatterPlot = new ScatterPlotComponent();
    console.log("Hi from test")
    //d3.json("/assets/counties.json").then(data => myapp.drawMap(data));
    //myapp.drawMap();

    Promise.all([
      d3.json("/assets/counties.json"),
      d3.json("/assets/models2.json"),
      d3.json("/assets/population.json"),
    ]).then(function(files) {
      myapp.drawMap(files[0], files[1])
      calenderPlot.CalenderPlot(files[1], "007")
      scatterPlot.ScatterPlot(files[2], files[1], 36, "#ScatterPlot1")
      scatterPlot.ScatterPlot(files[2], files[1], 37, "#ScatterPlot2")
      scatterPlot.ScatterPlot(files[2], files[1], 38, "#ScatterPlot3")
      scatterPlot.ScatterPlot(files[2], files[1], 39, "#ScatterPlot4")
      scatterPlot.ScatterPlot(files[2], files[1], 40, "#ScatterPlot5")
      scatterPlot.ScatterPlot(files[2], files[1], 41, "#ScatterPlot6")
      scatterPlot.ScatterPlot(files[2], files[1], 42, "#ScatterPlot7")
      scatterPlot.ScatterPlot(files[2], files[1], 43, "#ScatterPlot8")
    }).catch(function(err) {
      // handle error here
    })
  }
  ngOnInit(): void {
    this.test()
  }

}
