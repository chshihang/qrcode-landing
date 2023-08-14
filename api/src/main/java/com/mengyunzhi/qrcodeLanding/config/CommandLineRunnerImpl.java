package com.mengyunzhi.qrcodeLanding.config;

import com.mengyunzhi.qrcodeLanding.entity.User;
import com.mengyunzhi.qrcodeLanding.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


/**
 * 系统启动时添加系统管理员
 */
@Component
public class CommandLineRunnerImpl implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    UserRepository userRepository;
    public CommandLineRunnerImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        System.out.println("run is called");
        if (!this.userRepository.findByUsername("13920618851").isPresent()) {
            System.out.println("run is called2");
            User user = new User();
            //角色为系统管理员
            String password = "yunzhi";
            user.setUsername("13920618851");
            user.setPassword(password);
            this.userRepository.save(user);
        }
    }
}
