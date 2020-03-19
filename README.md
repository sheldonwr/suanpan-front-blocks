# SUANPAN Front Blocks

算盘后面板组件的前端页面block集合。

## 在项目中使用的方法

### 1. 在 `config/config.ts` 中添加配置

```javascript
export default = {
  ...,
  block: {
    defaultGitUrl: 'https://github.com/sheldonwr/suanpan-front-blocks',
  },
  ...
}
```

### 2. 在项目根目录执行

```javascript
umi block add blocks/xxxxx
```

此时在项目 src/pages 中会出现 xxxxx 文件夹，其中包含了指定组件的代码；

同时，由于 `Ant Design Pro` 默认下载的block都是页面级的，会在 `config/config.ts` 中配置好路由。

如果通过 `umi block add` 添加的组件不是页面级的，则在 `config/config.ts` 中去掉相应的路由配置。

如果想要在项目中运行，可能还会需要修改少量代码。

## 编写 `block` 的相关约定

### 以 `ParamSetting` 组件为例

`src` 文件夹下的文件结构，与算盘前端页面的工程结构相同，并且也提供了 `utils/request.ts` 等基础工具方法

为了最大化复用代码，在封装 `block` 时，将必要的 `models`、`services` 文件夹都放在 `block` 的 `src` 目录下

`block` 相应的 mock 数据放在 /mock 文件夹下。

### 注意事项

* 封装的 `block` 的目录下须包含 `package.json`，该文件会在执行 `umi block add` 命令的时候使用到，否则会报错

* `package.json` 中的 `name`，缺省会在引用 `block` 的项目 `src/pages` 文件夹下，创建与以 `name` 命名的文件夹来引入 `block`
