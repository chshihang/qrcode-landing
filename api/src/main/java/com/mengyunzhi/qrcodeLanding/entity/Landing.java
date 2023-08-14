package com.mengyunzhi.qrcodeLanding.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Landing {

  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  private Long id;

  private String name;

  @Column(name = "key_", unique = true)
  private String key;
  private String url;

  @CreationTimestamp
  private Timestamp createTime = new Timestamp(System.currentTimeMillis());

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }
  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getId() {
    return id;
  }

  public Timestamp getCreateTime() {
    return createTime;
  }

  public void setCreateTime(Timestamp createTime) {
    this.createTime = createTime;
  }
}
