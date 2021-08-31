# COVID-19 EnsembleVis

![COVID-19 EnsembleVis](https://github.com/uic-evl/covid-19-ensemblevis/blob/master/covid-19-ensemblevis.png)

This repository contains the source code for COVID-19 EnsembleVis, a visual analytics system that allows the assessment of ensembles and individual models at the county level, by enabling users to effortlessly navigate through and compare ensemble members considering their space and time dimensions. This visual interface provides an overview summary of ensemble data to assess uncertainty, identifies spatiotemporal trends, i.e., how a group of members change over space and time, and visually identifies differences between two or more ensemble members.

The team includes:

* [Sanjana Srabanti](https://www.linkedin.com/in/sanjana-srabanti-3b958b12a/) (University of Illinois at Chicago)
* [G. Elisabeta (Liz) Marai](https://www.evl.uic.edu/marai/) (University of Illinois at Chicago)
* [Fabio Miranda](https://fmiranda.me) (University of Illinois at Chicago)


## Table of contents

* [Prerequisites](#prerequisites)
* [Pre-processing the data](#pre-processing-the-data)
* [Building the project](#building-the-project)

## Prerequisites

You will need to install [Node.js](https://nodejs.org/) and [Angular](https://angular.io/) to build the interface and [Jupyter](https://jupyter.org/) to preprocess the data. You can install all prerequisites by first installing  [Anaconda](https://www.anaconda.com/products/individual) (or [miniconda](https://docs.conda.io/en/latest/miniconda.html)) and running the following command:

```
conda install nodejs jupyter
```

## Pre-processing the data
COVID-19 EnsembleVis makes use of forecasts collected by the [COVID-19 Forecast Hub](https://covid19forecasthub.org/), a site that maintains up-to-data records for forecasts of COVID-19 cases, deaths and hospitalizations in the US. The data is hosted on their GitHub repository, so in order to pre-process the data, first clone the repository:

```
git clone https://github.com/reichlab/covid19-forecast-hub
```

Next, run our parser notebook inside the ``preprocessing`` folder. The notebook considers that the COVID-19 Forecast Hub repository was cloned at the same level of the COVID-19 EnsembleVis repository. In other words:

```
./
../
covid-19-ensemblevis/
covid19-forecast-hub/
```

The jupyter notebook `parser.ipynb` will save a json file (models.json) inside the folder `vis/src/assets/` containing the pre-processed data required by the interface.


## Building the project
The project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0. First install Angular CLI using `npm` (the default package manager for Node.js):

```
npm install –g @angular/cli
```

Next, run `ng build` to build the project and `ng serve` to create a server and serve the COVID-19 EnsembleVis application. The interface will be available at `http://localhost:4200/`.
