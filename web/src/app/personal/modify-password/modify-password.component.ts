import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../service/common.service";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.css']
})
export class ModifyPasswordComponent implements OnInit {

  /**
   * 字段关键字
   */
  formKeys = {
    oldPassword: 'oldPassword',
    newPassword: 'newPassword',
    confirmNewPassword: 'confirmNewPassword',
  };

  modifyPasswordForms: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private commonService: CommonService,
              private router: Router) { }

  ngOnInit(): void {
    this.modifyPasswordForms = this.fb.group({
      [this.formKeys.oldPassword]: [null, {
        validators: [Validators.required],
        asyncValidators: [this.userService.oldPasswordValidator()],
        updateOn: 'blur'
      }],
      [this.formKeys.newPassword]:[null, [Validators.required, Validators.minLength(5)]],
      [this.formKeys.confirmNewPassword]:  [null, Validators.required]
    }, {validators: this.userService.confirmPasswordValidator},
    );
  }

  onSubmit(): void {
    this.submitting = true;
    this.userService.updatePassword(this.modifyPasswordForms.get(this.formKeys.newPassword).value,
      this.modifyPasswordForms.get(this.formKeys.oldPassword).value)
      .subscribe(() => {
        this.userService.logout()
          .subscribe(() => {
            }, () => {
            }, () => {
              this.commonService.success(() => {
                this.router.navigateByUrl('login').then();
              }, '请重新登录', '修改成功');
            });
      });
  }
}
