package com.mengyunzhi.qrcodeLanding.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;


@SpringBootTest
@ActiveProfiles("demo")
class UserRepositoryTest {
  @Autowired
  UserRepository userRepository;

  @Test
  void count() {
    this.userRepository.count();
  }
}