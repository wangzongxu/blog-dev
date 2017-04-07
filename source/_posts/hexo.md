---
title: hexo
categories:
- 博客
tags:
- 博客
---
Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。
<!--more-->
### 安装

安装 Hexo 相当简单。然而在安装前，您必须检查电脑中是否已安装下列应用程序：
 - [node](http://nodejs.org/)
 - [git](http://git-scm.com/)

安装hexo

```bash
npm install -g hexo-cli
```
> node版本5.0或更高导致报错，但不影响hexo的正常使用

### 建站
安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。

```bash
hexo init <folder>
cd <folder>
npm install
```

新建完成后，指定文件夹的目录如下：

```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

### \_config.yml

网站的 配置 信息，您可以在此配置大部分的参数。

### package.json

应用程序的信息。EJS, Stylus 和 Markdown renderer 已默认安装，您可以自由移除。

```json
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": ""
  },
  "dependencies": {
    "hexo": "^3.0.0",
    "hexo-generator-archive": "^0.1.0",
    "hexo-generator-category": "^0.1.0",
    "hexo-generator-index": "^0.1.0",
    "hexo-generator-tag": "^0.1.0",
    "hexo-renderer-ejs": "^0.1.0",
    "hexo-renderer-stylus": "^0.2.0",
    "hexo-renderer-marked": "^0.2.4",
    "hexo-server": "^0.1.2"
  }
}
```
### scaffolds

模版 文件夹。当您新建文章时，Hexo 会根据 scaffold 来建立文件。
Hexo的模板是指在新建的markdown文件中默认填充的内容。例如，如果您修改scaffold/post.md中的Front-matter内容，那么每次新建一篇文章时都会包含这个修改。

### source

资源文件夹是存放用户资源的地方。除 \_posts 文件夹之外，开头命名为 _ (下划线)的文件 / 文件夹和隐藏的文件将会被忽略。Markdown 和 HTML 文件会被解析并放到 public 文件夹，而其他文件会被拷贝过去。

### themes

[主题](https://hexo.io/themes/) 文件夹。Hexo 会根据主题来生成静态页面。

1. 在themes文件夹下新建一个文件夹准备存放主题文件，例如命名为'simple'
2. 更改根目录下_config.yml文件中的theme字段的值为 simple（注意空格开头）
3. 选择喜欢的[主题](https://hexo.io/themes/)并下载解压到刚刚创建的simple文件夹下
4. 命令行执行 hexo server

### 一键部署到Github
1. 在自己github下新建一个仓库并命名为‘github用户名’+'.github.io'
2. 编辑根目录下的_config.yml,拖到最下方,找到deploy标签,然后更为如下配置,注意:你自己在修改时,需要将 xxxxx修改为自己的github用户名
```
deploy:
type: git
repository: https://github.com/xxxxx/xxxxx.github.io.git
branch: master
```
3. 安装插件：
```bash
npm install hexo-deployer-git –save
```
4. 编译
执行项目清理和静态网页生成
```bash
hexo clean
hexo generate
```
5. 部署
```bash
hexo deploy
```
6. 完成
去自己刚刚建立的github仓库查看是否成功部署

### 常用命令

``` bash
hexo init [blogName] #初始化博客
hexo version #hexo版本
hexo new "我的博客" ==hexo n "我的博客"#新建文章
hexo publish  == hexo p #发表草稿
hexo generate == hexo g #生成
hexo clean #清除缓存文件 (db.json) 和已生成的静态文件 (public)
hexo server == hexo s #启动服务预览
hexo deploy ==hexo d #部署
```

### 服务器

``` bash
hexo server #Hexo 会监视文件变动并自动更新，您无须重启服务器。
hexo server -s #静态模式
hexo server -p 5000 #更改端口
hexo server -i 192.168.1.1 #自定义 IP

hexo clean #清除缓存 网页正常情况下可以忽略此条命令
hexo g #生成静态网页
hexo d #开始部署
```

### 监视文件变动

``` bash
hexo generate #生成静态文件
hexo generate --watch #监视文件变动自动生成静态文件
```
