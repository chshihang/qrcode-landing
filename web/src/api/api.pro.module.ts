import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiPrefixAndMergeMapInterceptor} from "../interceptor/api-prefix-and-merge-map.interceptor";
import {environment} from "../environments/environment";


@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixAndMergeMapInterceptor.forRoot({api: environment.apiUrl}),
      multi: true
    }
  ]
})
export class ApiProModule {
}
