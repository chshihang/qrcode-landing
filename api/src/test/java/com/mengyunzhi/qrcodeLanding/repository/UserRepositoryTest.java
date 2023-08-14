package com.mengyunzhi.qrcodeLanding.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;



@SpringBootTest
class UserRepositoryTest {
  @Autowired
  UserRepository userRepository;

  @Test
  void count() {
    this.userRepository.count();
  }
}