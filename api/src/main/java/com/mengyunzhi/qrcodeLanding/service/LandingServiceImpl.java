package com.mengyunzhi.qrcodeLanding.service;

import com.mengyunzhi.qrcodeLanding.entity.Landing;
import com.mengyunzhi.qrcodeLanding.repository.LandingRepository;
import com.mengyunzhi.qrcodeLanding.repository.specs.LandingSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
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

  @Override
  public String getUrlByKey(String key) {
    Assert.notNull(key, "null值错误");
    return this.landingRepository.findByKey(key).orElseThrow(EntityNotFoundException::new).getUrl();
  }

  @Override
  public Landing getById(Long id) {
    Assert.notNull(id, "值错误");
    return this.landingRepository.findById(id).get();
  }

  @Override
  public Landing update(Long id, Landing landing) {
    Landing oldLanding = this.landingRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    oldLanding.setName(landing.getName());
    oldLanding.setKey(landing.getKey());
    oldLanding.setUrl(landing.getUrl());
    return this.landingRepository.save(oldLanding);
  }

  @Override
  public void deleteById(Long id) {
    this.landingRepository.deleteById(id);
  }
}
