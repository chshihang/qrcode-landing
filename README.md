# qrcode-landing

二维码落地转发

## 打包上线

直接建立tag将会自动打包上线到CD集成测试系统，在打包过程中支持重置相关容器：

比如：tag名称为：`V1.0.0#resetdb#resetweb#resetapi`将重置`db web api`三个容器。

## 开发环境

### Angular

- Angular CLI: 15.2.8

- Node: 18.16.0

- Package Manager: npm 9.5.1

#### 前台启动

- 安装对应node版本

- npm install

- ng s --host=0.0.0.0 （如果使用了nginx）

### Springboot

- Java 8

- Mysql: 5.7

- Maven

#### 后台启动：

- 配置数据库
  
  - 确保拥有docker环境
  
  - docker 文件夹内打开终端输入docker compose up -d

- 安装依赖包
  
  - IDEA右侧点击Maven => qrcodeLanding => Lifecircle => install
  
  - 或者控制台输入 mvn install

- 启动
  
  - 查看application.yml文件，确保spring.profiles.active配置为dev
  
  - 终端内输入mvn spring-boot:run运行

### 前后台对接

- 启动 nginx

- 确保前后台启动（Angular根模块[AppModule]启用ApiProModule，Springboot配置dev生效）

- 打开浏览器访问 http://localhost:8015

- 登录
  
  - username：13920618851
  
  - password： yunzhi
