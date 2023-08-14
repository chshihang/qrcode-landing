package com.mengyunzhi.qrcodeLanding.repository;

import com.mengyunzhi.qrcodeLanding.entity.Landing;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;


public interface LandingRepository extends PagingAndSortingRepository<Landing, Long>, JpaSpecificationExecutor<Landing> {

  Optional<Landing> findByKey(String key);
}
