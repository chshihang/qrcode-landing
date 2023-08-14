package com.mengyunzhi.qrcodeLanding.repository;

import com.mengyunzhi.qrcodeLanding.entity.Setting;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface SettingRepository extends CrudRepository<Setting, Long>, JpaSpecificationExecutor<Setting> {
  Optional<Setting> findByKey(String keyName);

}
