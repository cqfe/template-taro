# 移动端模板

## 项目简介

移动端模板，采用 TaroJs@4.x，VueJs@3.x，NutUi@4.x 开发。

## 开发规范

[前端开发规范](https://ones.cisdigital.cn/wiki/#/team/SKG3mSQb/space/A8ZckFsc/page/Jj69ks48)

## 开发启动方式

```bash
# 安装依赖
pnpm i
npm run dev:h5
```

## 生产构建方式

```bash
npm run build
```

## 版本注意事项

- @tarojs/xxx 必须保证统一版本号
- webpack：最高为@5.91.0，tarojs@4.20.0适配问题
- sass：最高版本为@1.77.0，NutUI内部使用大量@import，高版本无法隐藏警告

## 部署环境信息

| 环境      | 服务器地址   | 端口 | 访问域名             |
| --------- | ------------ | ---- | -------------------- |
| 测试环境  | xx.xx.xx.xx  | 9922 | http://dev.xxx.com/  |

## 备注信息
