package com.mengyunzhi.qrcodeLanding.service;

import com.mengyunzhi.qrcodeLanding.entity.Landing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LandingService {

  Page<Landing> page(Pageable pageable, String name, String key);

  Landing save(Landing landing);

  Boolean existsByKey(String key, Long landingId);

  String getUrlByKey(String key);
}
