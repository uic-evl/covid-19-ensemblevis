import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { USmapComponent } from './usmap/usmap.component';
import { CalenderPlotComponent } from './calender-plot/calender-plot.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { MapCalenderLegendComponent } from './map-calender-legend/map-calender-legend.component';

@NgModule({
  declarations: [
    AppComponent,
    USmapComponent,
    CalenderPlotComponent,
    ScatterPlotComponent,
    MapCalenderLegendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
