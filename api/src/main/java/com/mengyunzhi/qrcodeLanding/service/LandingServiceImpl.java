package com.mengyunzhi.qrcodeLanding.service;

import com.mengyunzhi.qrcodeLanding.entity.Landing;
import com.mengyunzhi.qrcodeLanding.repository.LandingRepository;
import com.mengyunzhi.qrcodeLanding.repository.specs.LandingSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LandingServiceImpl implements LandingService {

  LandingRepository landingRepository;

  @Autowired
  LandingServiceImpl(LandingRepository landingRepository) {
    this.landingRepository = landingRepository;
  }

  @Override
  public Page<Landing> page(Pageable pageable, String name, String key) {
    Specification<Landing> specification = LandingSpec.containName(name)
      .and(LandingSpec.containKey(key));
    return this.landingRepository.findAll(specification, pageable);
  }

  @Override
  public Landing save(Landing landing) {
    Landing newLanding = new Landing();
    newLanding.setName(landing.getName());
    newLanding.setKey(landing.getKey());
    newLanding.setUrl(landing.getUrl());
    return this.landingRepository.save(newLanding);
  }

  @Override
  public Boolean existsByKey(String key, Long landingId) {
    Optional<Landing> landingOptional = this.landingRepository.findByKey(key);
    if (landingOptional.isPresent()) {
      if (landingOptional.get().getId().equals(landingId)) {
        return false;
      }
      return true;
    }
    return false;
  }
}
