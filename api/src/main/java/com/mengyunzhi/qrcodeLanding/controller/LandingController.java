package com.mengyunzhi.qrcodeLanding.controller;


import com.mengyunzhi.qrcodeLanding.entity.Landing;
import com.mengyunzhi.qrcodeLanding.service.LandingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Landing")
public class LandingController {

  private final LandingService landingService;
  @Autowired
  LandingController(LandingService landingService) {
    this.landingService = landingService;
  }


  @DeleteMapping("{id}")
  void deleteById(@PathVariable Long id) {
    this.landingService.deleteById(id);
  }

  /**
   * key 唯一性验证
   *
   * @param key       保证key唯一
   * @param landingId 不对此id对应实体校验
   * @return 是否唯一 唯一 true; 不唯一 false
   */
  @GetMapping("existsByKey")
  Boolean existsByKey(@RequestParam String key, @RequestParam(required = false) Long landingId) {
    return this.landingService.existsByKey(key, landingId);
  }

  @GetMapping("{id}")
  Landing getById(@PathVariable Long id) {
    return this.landingService.getById(id);
  }

  /**
   * 请求分页数据
   */
  @GetMapping("page")
  Page<Landing> page(
    @RequestParam(value = "name", required = false) String name,
    @RequestParam(value = "key", required = false) String key,
    @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
    Pageable pageable) {
    return this.landingService.page(pageable, name, key);
  }

  /**
   * 添加
   */
  @PostMapping
  Landing save(@RequestBody Landing landing) {
    return this.landingService.save(landing);
  }

  /**
   * 更新字段
   * @param landing [name, key, url]
   */
  @PatchMapping("{id}")
  Landing update(@PathVariable Long id,
                 @RequestBody Landing landing) {
    Assert.notNull(landing.getName(), "值错误");
    Assert.notNull(landing.getKey(), "值错误");
    Assert.notNull(landing.getUrl(), "值错误");
    return this.landingService.update(id, landing);
  }

}
