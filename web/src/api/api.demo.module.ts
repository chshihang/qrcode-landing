import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MockApiInterceptor} from "@yunzhi/ng-mock-api";
import {LandingApi} from "./landing-api";
import {SystemApi} from "./system-api";
import {UserApi} from "./user-api";


/**
 * 用于脱离后台跑demo
 */
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true, useClass: MockApiInterceptor.forRoot([
        LandingApi,
        SystemApi,
        UserApi
      ])
    }
  ]
})
export class ApiDemoModule {
}
