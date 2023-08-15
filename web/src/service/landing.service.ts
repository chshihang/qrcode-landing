import {Injectable} from "@angular/core";
import {Landing} from "../entity/landing";
import {Page} from "@yunzhi/ng-common";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {config} from "../conf/config";
import {Assert, getDefaultWhenValueIsInValid, isNotNullOrUndefined} from "../common/utils";

@Injectable({
    providedIn: 'root'
})
export class LandingService {

  constructor(private httpClient: HttpClient) {
  }

  page(param: { size: number; name: string; page: number; key: string }): Observable<Page<Landing>> {
    Assert.isNumber(param.page, param.size, 'page or size not number');

    let params = new HttpParams()
      .append('page', getDefaultWhenValueIsInValid(param.page, 0))
      .append('size', getDefaultWhenValueIsInValid(param.size, config.size));
    if (isNotNullOrUndefined(param.name)) {
      params = params.append('name', param.name);
    }
    if (isNotNullOrUndefined(param.key)) {
      params = params.append('key', param.key);
    }
    return this.httpClient.get<Page<Landing>>('/landing/page', {params});
  }

  add(landing: {name: string, key: string, url: string}): Observable<Landing> {
    console.log('add', landing);
    Assert.isNotNullOrUndefined(landing.name, '值错误')
    Assert.isNotNullOrUndefined(landing.key, '值错误')
    Assert.isNotNullOrUndefined(landing.url, '值错误')
    return this.httpClient.post<Landing>('/landing', landing);
  }

  /**
   *  key查找
   *  @param key 查看key是否有相同的
   *  @param landingId 排除Id； 如果为空，使用默认值-1，代表无参数
   */
  existsByKey(key: string, landingId?: number): Observable<boolean> {
    let httpParams = new HttpParams().set('key', key);
    if (isNotNullOrUndefined(landingId)) {
      httpParams = httpParams.append('landingId', landingId)
    }
    return this.httpClient.get<boolean>(`/landing/existsByKey`, {params: httpParams});
  }

  getById(id: number): Observable<Landing> {
    Assert.isInteger(id, '类型错误');
    return this.httpClient.get<Landing>('/landing/' + id);
  }

  update(id: number, data: {name: string, key: string, url: string}): Observable<Landing> {
    Assert.isInteger(id, '类型错误');
    Assert.isNotNullOrUndefined(data.name, '数据错误')
    Assert.isNotNullOrUndefined(data.key, '数据错误')
    Assert.isNotNullOrUndefined(data.url, '数据错误')
    return this.httpClient.patch<Landing>('/landing/' + id, data);
  }

  deleteById(id: number): Observable<void> {
    Assert.isInteger(id, '类型错误');
    return this.httpClient.delete<void>('/landing/' + id);
  }
}
