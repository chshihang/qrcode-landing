import {AbstractControl, ValidationErrors} from "@angular/forms";
import {Observable, of} from "rxjs";
import {LandingService} from "../../service/landing.service";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CommonValidator {
  static landingService: LandingService;

  constructor(private landingService: LandingService) {
    CommonValidator.landingService = landingService;
  }
  /**
   * Line.key异步验证器
   * @return (control: 传递职位的值)
   */
  landingUniqueKey(landingId?: number): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const key = control.value;
      return CommonValidator.landingService.existsByKey(key, landingId)
        .pipe(map(data => {
          return data ? {uniqueKey: data} : null;
        }));
    };
  }

  public static httpFormatCheck(control: AbstractControl): ValidationErrors | null {
    const result = new RegExp('^http(s)?://[a-zA-Z0-9.-]+(:\\d+)?(/[\\S]*)?$')
      .exec(control.value);
    return !result ? { httpFormatCheck: '地址校验失败' } : null;
  }
}
