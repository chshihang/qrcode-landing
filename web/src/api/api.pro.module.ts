import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiPrefixAndMergeMapInterceptor} from "../interceptor/api-prefix-and-merge-map.interceptor";
import {environment} from "../environments/environment";
import {XAuthTokenInterceptor} from "../interceptor/x-auth-token.interceptor";
import {Prevent401Popup} from "../interceptor/prevent-401-popup";


@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixAndMergeMapInterceptor.forRoot({api: environment.apiUrl}),
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XAuthTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Prevent401Popup,
      multi: true
    }
  ]
})
export class ApiProModule {
}
