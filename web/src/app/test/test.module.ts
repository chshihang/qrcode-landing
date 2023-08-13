import { NgModule } from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';



@NgModule({
  declarations: [],
  imports: [
    RouterTestingModule,
    HttpClientTestingModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  exports: [
    RouterTestingModule,
    HttpClientTestingModule,
    ReactiveFormsModule
  ]
})
export class TestModule { }
