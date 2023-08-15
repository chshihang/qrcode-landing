package com.mengyunzhi.qrcodeLanding.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("demo")
class SettingRepositoryTest {

  @Autowired
  SettingRepository settingRepository;


  @Test
  void count() {
    this.settingRepository.count();
  }

}