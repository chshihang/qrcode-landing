import {Injectable} from "@angular/core";
import {Landing} from "../entity/landing";
import {Page} from "@yunzhi/ng-common";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Assert, getDefaultWhenValueIsInValid, isNotNullOrUndefined} from "@yunzhi/utils";
import {config} from "../conf/config";

@Injectable({
    providedIn: 'root'
})
export class LandingService {

  constructor(private httpClient: HttpClient) {
  }
  page(param: { page: number, size: number, name?: string }): Observable<Page<Landing>> {
    Assert.isNumber(param.page, param.size, 'page or size not number');

    let params = new HttpParams()
      .append('page', getDefaultWhenValueIsInValid(param.page, 0))
      .append('size', getDefaultWhenValueIsInValid(param.size, config.size));
    if (isNotNullOrUndefined(param.name)) {
      params = params.append('name', param.name);
    }
    return this.httpClient.get<Page<Landing>>('/landing/page', {params});
  }
}
