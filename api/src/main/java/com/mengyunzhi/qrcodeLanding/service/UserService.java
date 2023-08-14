package com.mengyunzhi.qrcodeLanding.service;

import com.mengyunzhi.qrcodeLanding.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
  User me();

  Optional<User> getCurrentLoginUser();

  User getByUsername(String name);
}
