package com.mengyunzhi.qrcodeLanding.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.qrcodeLanding.entity.User;
import com.mengyunzhi.qrcodeLanding.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@RestController
@RequestMapping("user")
public class UserController {


  UserService userService;
  HttpServletRequest request;

  @Autowired
  UserController(UserService userService,
                 HttpServletRequest request) {
    this.userService = userService;
    this.request = request;
  }
  @GetMapping("me")
  public User getCurrentLoginUser(Principal principal) {
    return principal == null ? null : this.userService.getCurrentLoginUser().get();
  }

  @RequestMapping("login")
  public User login(Principal user) {
    return this.userService.getByUsername(user.getName());
  }

}
