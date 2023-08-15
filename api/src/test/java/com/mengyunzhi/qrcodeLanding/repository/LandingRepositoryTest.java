package com.mengyunzhi.qrcodeLanding.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("demo")
class LandingRepositoryTest {

  @Autowired
  LandingRepository landingRepository;


  @Test
  void count() {
    this.landingRepository.count();
  }

}