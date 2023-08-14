import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {Assert} from "@yunzhi/utils";

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private systemUrlSubject = new ReplaySubject<string>(1);
  systemUrlObservable = this.systemUrlSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.initSystemUrl();
  }

  getSystemUrl(): Observable<string> {
    return this.systemUrlObservable;
  }

  setSystemUrl(url: string) {
    Assert.isString(url, '类型错误');
    this.systemUrlSubject.next(url);
  }

  updateSystemUrl(systemUrl: string): Observable<string> {
    return this.httpClient.patch<string>('/system', systemUrl);
  }

  private initSystemUrl() {
    this.httpClient.get<string>('/system/url')
      .subscribe(url => {
        this.setSystemUrl(url);
      })
  }
}
