package com.mengyunzhi.qrcodeLanding.service;

import com.mengyunzhi.qrcodeLanding.entity.Setting;
import com.mengyunzhi.qrcodeLanding.repository.SettingRepository;
import jdk.nashorn.internal.runtime.regexp.RegExp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class SettingServiceImpl implements SettingService {

  final String KEY_NAME = "systemUrl";
  SettingRepository settingRepository;
  @Autowired
  SettingServiceImpl(SettingRepository settingRepository) {
    this.settingRepository = settingRepository;
  }

  final Pattern httpFormatPattern = Pattern.compile("^http(s)?://[a-zA-Z0-9.-]+(:\\d+)?(/[\\S]*)?$");

  @Override
  public String getSystemUrl() {
    return this.settingRepository.findByKey(this.KEY_NAME).orElseThrow(EntityNotFoundException::new).getValue();
  }

  @Override
  public String setSystemUrl(String url) {
    Assert.notNull(url, "值错误");
    if (!this.checkHttpUrl(url)) {
      throw new RuntimeException("发生校验错误:" + url);
    }

    Setting setting;
    Optional<Setting> settingOptional = this.settingRepository.findByKey(this.KEY_NAME);
    setting = settingOptional.orElseGet(Setting::new);
    setting.setKey(this.KEY_NAME);
    setting.setValue(url);
    return this.settingRepository.save(setting).getValue();
  }

  boolean checkHttpUrl(String url) {
    Matcher matcher = httpFormatPattern.matcher(url);
    return matcher.matches();
  }

  @Override
  public String updateSystemUrl(String url) {
    return this.setSystemUrl(url);
  }
}
