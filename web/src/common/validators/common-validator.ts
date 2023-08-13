import {AbstractControl, ValidationErrors} from "@angular/forms";
import {Observable, of} from "rxjs";
import {LandingService} from "../../service/landing.service";
import {map} from "rxjs/operators";

export class CommonValidator {
  static name_min_length = 2;
  static name_max_length = 25;
  static landingService: LandingService;

  constructor(private landingService: LandingService) {
    CommonValidator.landingService = landingService;
  }
  /**
   * Line.key异步验证器
   * @return (control: 传递职位的值)
   */
  // todo: 可能需要改成大写
  LandingUniqueKey(landingId: number): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const key = control.value;
      return CommonValidator.landingService.existsByKey(key, landingId)
        .pipe(map(data => {
          return data ? {uniqueKey: data} : null;
        }));
    };
  }
}
