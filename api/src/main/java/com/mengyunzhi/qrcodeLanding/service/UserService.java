package com.mengyunzhi.qrcodeLanding.service;

import com.mengyunzhi.qrcodeLanding.entity.User;
import com.mengyunzhi.qrcodeLanding.vo.VUser;

import javax.xml.bind.ValidationException;
import java.util.List;
import java.util.Optional;

public interface UserService {

  /**
   * 校验密码是否正确
   *
   * @param vUser 带有密码的VUser
   * @return true 正确 false 不正确
   */
  boolean checkPasswordIsRight(VUser vUser);
  User me();

  Optional<User> getCurrentLoginUser();

  User getByUsername(String name);
  /**
   * 修改密码
   *
   * @param vUser 带有新密码和旧密码VUser
   */
  void updatePassword(VUser vUser) throws ValidationException;
}
