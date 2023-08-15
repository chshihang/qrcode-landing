package com.mengyunzhi.qrcodeLanding.controller;

import com.mengyunzhi.qrcodeLanding.service.LandingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;


/**
 * 提供路由服务
 * 设置提供服务的服务器地址见application.yml 中 app.systemUrl
 */
@RestController
@RequestMapping("key")
public class KeyController {
  LandingService landingService;

  @Autowired
  KeyController(LandingService landingService) {
    this.landingService = landingService;
  }

  @GetMapping("{key}")
  void router(@PathVariable String key,
              HttpServletResponse httpServletResponse) {
    String url = this.landingService.getUrlByKey(key);
    httpServletResponse.setStatus(HttpStatus.MOVED_PERMANENTLY.value());
    httpServletResponse.setHeader(HttpHeaders.LOCATION, url);
  }
}
