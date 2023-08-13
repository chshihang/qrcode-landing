import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import {LandingRoutingModule} from "./landing-routing.module";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";



@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    YzPageModule,
    YzSizeModule
  ]
})
export class LandingModule { }
