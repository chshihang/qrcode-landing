package com.mengyunzhi.qrcodeLanding.config;

import com.mengyunzhi.qrcodeLanding.entity.User;
import com.mengyunzhi.qrcodeLanding.repository.UserRepository;
import com.mengyunzhi.qrcodeLanding.service.SettingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


/**
 * 系统启动时添加系统管理员
 */
@Component
public class CommandLineRunnerImpl implements CommandLineRunner {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Value("${app.systemUrl}")
  String systemUrl;

  UserRepository userRepository;
  SettingService settingService;

  public CommandLineRunnerImpl(UserRepository userRepository,
                               SettingService settingService) {
    this.userRepository = userRepository;
    this.settingService = settingService;
  }

  @Override
  public void run(String... args) {
    this.initUser();
    this.initSystemUrl();
  }

  private void initSystemUrl() {
    this.settingService.setSystemUrl(this.systemUrl);
  }

  private void initUser() {
    if (!this.userRepository.findByUsername("13920618851").isPresent()) {
      User user = new User();
      //角色为系统管理员
      String password = "yunzhi";
      user.setUsername("13920618851");
      user.setName("管理员");
      user.setPassword(password);
      this.userRepository.save(user);
    }
  }
}
