import {ApiInjector, MockApiInterface} from "@yunzhi/ng-mock-api";
import {User} from "../entity/user";

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
        description: '请求个人信息',
        result: () => {
          return true;
        }
      }
    ];
  }

}
