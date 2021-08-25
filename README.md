# COVID-19 EnsembleVis

![COVID-19 EnsembleVis](https://github.com/SanjanaSrabanti16/covid-project-angular/blob/master/src/assets/Images/Interface.PNG)


This repository contains the source code for COVID-19 EnsembleVis, a visual analytics system that allows the assessment of ensembles and individual models at the county level, by enabling users to effortlessly navigate through and compare ensemble members considering their space and time dimensions. This visual interface provides an overview summary of ensemble data to assess uncertainty, identifies spatiotemporal trends, i.e., how a group of members change over space and time, and visually identifies differences between two or more ensemble members.

The team includes:

* [Sanjana Srabanti](https://www.linkedin.com/in/sanjana-srabanti-3b958b12a/) (University of Illinois at Chicago)
* [Fabio Miranda](https://fmiranda.me) (University of Illinois at Chicago)
* [G. Elisabeta (Liz) Marai](https://www.evl.uic.edu/marai/) (University of Illinois at Chicago)


## Table of contents

* [Installation prerequisites](#installation-prerequisites)
    * [Angular](#Angular)
	* [D3.js](#D3.js)



## Installation Prerequisites

### Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

1. Development server

  Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

2.  Code scaffolding

  Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

3. Build

  Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

4. Running unit tests

  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

5. Running end-to-end tests

  Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

6. Further help

  To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
  

### D3.js

Install D3 and the D3 type definitions from npm. Type definitions will allow TypeScript to apply type hints to the external D3 code.

`npm install d3 && npm install @types/d3 --save-dev`
