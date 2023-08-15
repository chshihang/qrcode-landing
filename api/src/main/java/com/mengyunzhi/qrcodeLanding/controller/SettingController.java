package com.mengyunzhi.qrcodeLanding.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mengyunzhi.qrcodeLanding.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("setting")
public class SettingController {
  SettingService settingService;
  @Autowired
  SettingController(SettingService settingService) {
    this.settingService = settingService;
  }

  /**
   * 获取系统url
   */
  @GetMapping("url")
  public String getSystemUrl() {
    return this.settingService.getSystemUrl();
  }

  @PatchMapping
  public String updateSystemUrl(@RequestBody SystemUrl systemUrl) {
    return this.settingService.updateSystemUrl(systemUrl.systemUrl);
  }

}

class SystemUrl {
  @JsonProperty("systemUrl")
  String systemUrl;
}
