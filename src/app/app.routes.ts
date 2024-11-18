import { Routes } from '@angular/router';
import {Step1Component} from "./step1/step1.component";
import {Step2Component} from "./step2/step2.component";
import {inject} from "@angular/core";
import {ConfiguratorService} from "./configurator.service";
import {Step3Component} from "./step3/step3.component";

export const routes: Routes = [
  {path: 'step1', component: Step1Component},
  {path: 'step2', component: Step2Component, canActivate: [() => inject(ConfiguratorService).step2Ready()]},
  {path: 'step3', component: Step3Component, canActivate: [() => inject(ConfiguratorService).step3Ready()]}
];
