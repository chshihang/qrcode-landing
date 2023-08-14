package com.mengyunzhi.qrcodeLanding.repository.specs;

import com.mengyunzhi.qrcodeLanding.entity.Landing;
import org.springframework.data.jpa.domain.Specification;

public class LandingSpec {
  public static Specification<Landing> containName(String name) {
    if (name == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) ->
      criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
  }
}
