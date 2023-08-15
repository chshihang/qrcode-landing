import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {Assert} from "../../common/utils";
import {filter, first} from 'rxjs/operators';
import {CommonService} from '../../service/common.service';
import {User} from "../../entity/user";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  user = new User();
  isShowQrCode = false;
  qrCodeSrc: string;

  constructor(private userService: UserService,
              private location: Location,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.userService.getCurrentLoginUser$()
      .pipe(filter(v => v !== null && v !== undefined))
      .subscribe((data:User) => {
        this.setUser(data);
      });
  }

  setUser(user: User): void {
    Assert.isNotNullOrUndefined(user.name, 'name must be exit');
    Assert.isNotNullOrUndefined(user.username, 'username must be exit');
    this.user = user;
  }
}
