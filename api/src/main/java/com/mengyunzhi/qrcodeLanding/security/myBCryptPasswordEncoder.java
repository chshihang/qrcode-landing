package com.mengyunzhi.qrcodeLanding.security;

import com.mengyunzhi.qrcodeLanding.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * 注意：其不能够声明为@Component组件出现，否则将触发DaoAuthenticationProvider的构造函数
 * 从而直接注册DelegatingPasswordEncoder校验器
 */
public class myBCryptPasswordEncoder extends BCryptPasswordEncoder {

    @Autowired
    @Lazy
    private UserService userService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    public myBCryptPasswordEncoder() {
        super();
    }


    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        if (rawPassword == null) {
            throw new IllegalArgumentException("rawPassword cannot be null");
        }
        return super.matches(rawPassword, encodedPassword);
    }
}
