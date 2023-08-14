package com.mengyunzhi.qrcodeLanding.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LandingRepositoryTest {

  @Autowired
  LandingRepository landingRepository;


  @Test
  void count() {
    this.landingRepository.count();
  }

}