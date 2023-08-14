package com.mengyunzhi.qrcodeLanding.controller;


import com.mengyunzhi.qrcodeLanding.entity.Landing;
import com.mengyunzhi.qrcodeLanding.service.LandingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Landing")
public class LandingController {

  private final LandingService landingService;
  @Autowired
  LandingController(LandingService landingService) {
    this.landingService = landingService;
  }

  /**
   * 请求分页数据
   */
  @GetMapping("page")
  Page<Landing> page(
    @RequestParam(value = "name", required = false) String name,
    @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
    Pageable pageable) {
    return this.landingService.page(pageable, name);
  }

  /**
   * 添加
   */
  @PostMapping("add")
  Landing save(@RequestBody Landing landing) {
    return this.landingService.save(landing);
  }

  /**
   * key 唯一性验证
   * @param key 保证key唯一
   * @param landingId 不对此id对应实体校验
   * @return 是否唯一 唯一 true; 不唯一 false
   */
  @GetMapping("existsByKey/{landingId}")
  Boolean existsByKey(@PathVariable Long landingId, @RequestParam String key) {
    return this.landingService.existsByKey(key, landingId);
  }

}
