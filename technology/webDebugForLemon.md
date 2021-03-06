# 移动端开发调试工具lemon

解决移动端开发调试困难的问题

## lemon
移动端web开发调试工具

![预览](https://wangzongxu.github.io/img-cache/lemon/lemon_demo.png)

### AJAX

![xhr](https://wangzongxu.github.io/img-cache/lemon/lemon_demo2.png)

### 功能一览

* 点击lemon按钮切换显示或隐藏工具面板
* Console面板会输出用户打印的日志
* Style面板可以可以查看当前页面每个元素渲染后的属性值
* Cookie面板用来查看当前cookie
* Storage面板用来查看当前localStorage和sessionStorage
* Xhr面板会输出所有AJAX请求和服务器端返回的数据详情
* Static面板可以查看当前页面静态资源[css,js]

### Demo

![demo](https://wangzongxu.github.io/img-cache/lemon/lemon.png)

### 通过npm安装

```html
npm install lemon_mobile
```
### 使用 

在你的页面所有js之前引用即可，最好放在body内的最顶端
**该js必须引用在其他脚本之前**

```html
<script src="lemon.js"></script>
```

### 意见和建议
欢迎提问题到[issues](https://github.com/wangzongxu/lemon/issues)