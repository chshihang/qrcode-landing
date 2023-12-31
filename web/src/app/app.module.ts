import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from "./part/layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import {ApiDemoModule} from "../api/api.demo.module";
import {ApiProModule} from "../api/api.pro.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    // ApiDemoModule
    ApiProModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
