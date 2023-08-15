package com.mengyunzhi.qrcodeLanding.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.qrcodeLanding.entity.User;
import com.mengyunzhi.qrcodeLanding.service.UserService;
import com.mengyunzhi.qrcodeLanding.vo.VUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.ValidationException;
import java.security.Principal;

@RestController
@RequestMapping("user")
public class UserController {
  Logger logger = LoggerFactory.getLogger(this.getClass());
  UserService userService;
  HttpServletRequest request;

  @Autowired
  UserController(UserService userService,
                 HttpServletRequest request) {
    this.userService = userService;
    this.request = request;
  }

  /**
   * 校验密码是否正确
   *
   * @param vUser 带有密码的VUser
   * @return true 正确 false 不正确
   */
  @PostMapping("checkPasswordIsRight")
  public boolean checkPasswordIsRight(@RequestBody VUser vUser) {
    return this.userService.checkPasswordIsRight(vUser);
  }


  @GetMapping("me")
  public User getCurrentLoginUser(Principal principal) {
    return principal == null ? null : this.userService.getCurrentLoginUser().get();
  }

  @RequestMapping("login")
  public User login(Principal user) {
    return this.userService.getByUsername(user.getName());
  }

  @RequestMapping("logout")
  public void logout(HttpServletRequest request, HttpServletResponse response) {
    logger.info("用户注销");
    // 获取用户认证信息
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    // 存在认证信息，注销
    if (authentication != null) {
      new SecurityContextLogoutHandler().logout(request, response, authentication);
    }
  }

  /**
   * 修改密码
   *
   * @param vUser 带有新密码和旧密码VUser
   */
  @PutMapping("updatePassword")
  public void updatePassword(@RequestBody VUser vUser) throws ValidationException {
    this.userService.updatePassword(vUser);
  }

}
