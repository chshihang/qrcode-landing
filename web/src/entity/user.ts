/**
 * 用户
 */
import {Assert} from '../common/utils';
import {WeChatUser} from './we-chat-user';

export class User {
  id: number | undefined;
  name: string | undefined;
  username: string | undefined;
  password: string | undefined;
  constructor(data = {} as {
    id?: number
    name?: string,
    username?: string,
    password?: string,
  }) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
  }

  getName(): string {
    Assert.isDefined(this.name, '不满足获取name的前提条件');
    return this.name!;
  }

  getPhone(): string {
    Assert.isDefined(this.username, '不满足获取username的前提条件');
    return this.username!;
  }

  getPassword(): string {
    Assert.isDefined(this.password, '不满足获取password的前提条件');
    return this.password!;
  }

}
