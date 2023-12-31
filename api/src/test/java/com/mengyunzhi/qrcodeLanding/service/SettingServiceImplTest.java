package com.mengyunzhi.qrcodeLanding.service;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("demo")
class SettingServiceImplTest {
  Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  SettingServiceImpl settingServiceImpl;
  @Test
  void checkHttpUrl() {
    String url1 = "http://www.example.com:80/path/to/resource?query=parameters#fragment";
    String url2 = "https://www.example.com/path/to/resource";
    String url3 = "ftp://ftp.example.com/files";
    String url4 = "http:// ";

    assertTrue(this.settingServiceImpl.checkHttpUrl(url1));
    assertTrue(this.settingServiceImpl.checkHttpUrl(url2));
    assertFalse(this.settingServiceImpl.checkHttpUrl(url3));
    assertFalse(this.settingServiceImpl.checkHttpUrl(url4));
  }
}