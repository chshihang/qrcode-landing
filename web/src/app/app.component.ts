import {Component, Injector, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CommonService} from "../service/common.service";
import {HttpErrorInterceptor} from "../interceptor/http-error.interceptor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web';

  constructor(private router: Router,
              private injector: Injector,
              private commonService: CommonService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    const httpInterceptors = this.injector.get(HTTP_INTERCEPTORS);
    httpInterceptors.forEach(httpInterceptor => {
      if (httpInterceptor instanceof HttpErrorInterceptor) {
        httpInterceptor.error = (url, message) => {
          this.commonService.error(() => {
          }, url, message);
        };
        httpInterceptor.goToLoginPath = () => {
          if (this.router && this.router.url && !this.router.url.startsWith(`/login`)) {
            this.router.navigateByUrl('/login').then();
          }
        }
      }
    })


    if (this.router && this.router.url && !this.router.url.startsWith(`/login`)) {
      this.userService.initCurrentLoginUser(() => {
      }).subscribe({
          error: () =>
            this.router.navigateByUrl('/login').then()
        });
    }
  }
}
