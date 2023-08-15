import {ApiInjector, MockApiInterface} from "@yunzhi/ng-mock-api";
import {User} from "../entity/user";
import {RequestOptions} from "@yunzhi/ng-mock-api/lib/mock-api.types";
import {UrlMatcher} from "@angular/router";

export class UserApi implements MockApiInterface{
  getOne(): User {
    return {
      id: 1,
      name: '张三',
      username: 'zhangsan',
      password: 'yunzhi',
    } as User;
  }
  getInjectors(): ApiInjector[] {
    return [
      {
        url: 'user/login',
        method: 'GET',
        description: '用户登录',
        result: () => {
          return this.getOne();
        }
      },
      {
        url: 'user/me',
        method: 'GET',
        description: '请求个人信息',
        result: () => {
          return this.getOne()
        }
      },
      {
        url: 'user/checkPasswordIsRight',
        method: 'POST',
        description: '校验原密码',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
          console.log('options', options, options.body);
          return options.body.password !== 'yunzhi';
        }
      },
      {
        url: 'user/updatePassword',
        method: 'PUT',
        description: '更新密码',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
        }
      },
      {
        url: 'user/logout',
        method: 'GET',
        description: '登出',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
        }
      }
    ];
  }

}
