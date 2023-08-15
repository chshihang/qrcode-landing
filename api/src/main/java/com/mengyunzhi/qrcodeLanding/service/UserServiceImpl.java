package com.mengyunzhi.qrcodeLanding.service;

import com.mengyunzhi.qrcodeLanding.entity.User;
import com.mengyunzhi.qrcodeLanding.repository.UserRepository;
import com.mengyunzhi.qrcodeLanding.security.myBCryptPasswordEncoder;
import com.mengyunzhi.qrcodeLanding.vo.VUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.xml.bind.ValidationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

  Logger logger = LoggerFactory.getLogger(this.getClass());
  UserRepository userRepository;
  private PasswordEncoder passwordEncoder;

  @Autowired
  UserServiceImpl(UserRepository userRepository,
                  PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }
  @Override
  public User me() {
    return null;
  }

  @Override
  public Optional<User> getCurrentLoginUser() {
    logger.debug("初始化用户");
    Optional<User> user = null;

    logger.debug("获取用户认证信息");
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    logger.debug("根据认证信息查询用户");
    if (authentication != null && authentication.isAuthenticated()) {
      user = userRepository.findByUsername(authentication.getName());
    }

    return user;
  }

  @Override
  public User getByUsername(String name) {
    return this.userRepository.findByUsername(name).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public void updatePassword(VUser vUser) throws ValidationException {
    logger.debug("获取当前用户");
    Optional<User> currentUser = this.getCurrentLoginUser();

    logger.debug("校验原密码是否正确");
    if (!this.checkPasswordIsRight(vUser)) {
      throw new ValidationException("原密码不正确");
    }

    logger.debug("更新密码");
    currentUser.get().setPassword(vUser.getNewPassword());
    this.userRepository.save(currentUser.get());
  }

  @Override
  public boolean checkPasswordIsRight(VUser vUser) {
    logger.debug("获取当前用户");
    Optional<User> user = this.getCurrentLoginUser();

    logger.debug("比较密码是否正确");
    return this.passwordEncoder.matches(vUser.getPassword(), user.get().getPassword());
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("用户不存在"));

    // 设置用户角色
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();

    return new org.springframework.security.core.userdetails.User(username, user.getPassword(), authorities);
  }

}
