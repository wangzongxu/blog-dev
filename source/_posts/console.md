---
title: console.log打印漂亮的日志
categories:
- JS
tags:
- JS
---
打开百度、天猫控制台，你都会发现漂亮的图案，是怎么做的呢？
<!--more-->
#### 了解console方法

我们都知道console.log可以打印多个参数：
```js
console.log('A','B','C')
```

#### 占位符
在console.log输出的字符串中可以加入以下占位符，不同格式的数据必须使用对应格式的占位符，我们只需用到'%c'，其他的就暂且不谈；
>%s 字符串
%d 整数
%i 整数
%f 浮点数
%o 对象的链接
%c CSS格式字符串

#### 开始
- 如果第一个参数是格式字符串（使用了格式占位符），console.log方法将依次用后面的参数替换占位符，然后再进行输出，使用很简单：
```js
console.log('%cABC','color:red')
```
![ABC](https://wangzongxu.github.io/img-cache/console/console1.png)
在控制台查看效果，我们发现ABC变成了红色：%c对应第二个参数，这个参数是css字符串，可以包含多个属性，以分号隔开：
```js
console.log('%cABC','color:red;font-size:30px')
```
![ABC](https://wangzongxu.github.io/img-cache/console/console2.png)
此时我们发现字体变大了。

如果你想让‘ABC’有更多的风格，我们只需再加上几个'%c'和对应的参数即可：
```js
console.log('%cA%cB%cC','color:red','color:blue','color:green')
```
![ABC](https://wangzongxu.github.io/img-cache/console/console3.png)
每一个%c，只对从他后边的字符开始至下一个%c之前的位置起作用，第一个%c到第三个%c的样式，分别对应从第二个参数开始的'color:red','color:blue','color:green'，如果你想要更多的颜色，可以添加更多占位符。

#### 制作图案
这里以我平时使用图案的为例来看一下简单的制作过程：
![le](https://wangzongxu.github.io/img-cache/webchalk/webchalk.png)
1. 首先第一步比较重要，也是不容易的，因为需要排版，把组成图案的每一个字符对应准确
![le](https://wangzongxu.github.io/img-cache/console/console4.png)
这里我先声明一个准备输出的字符串图案，使用的单个字符是一个方块，大家也可以去网上找更多好看的字符尝试，记得在换行的位置加'\n'和该行结束位置的'\'，这个我就不多说了，拼接过字符串的童鞋都知道，当然，如果你使用ES6的模板字符串就不必考虑这么多了。

2. 添加占位符
![le](https://wangzongxu.github.io/img-cache/console/console5.png)
我们在每个需要更换颜色的开始位置增加了占位符，虽然看起来字符已经错位，但是并不影响正常输出。

3. 注意占位符的数量和顺序，编写console的样式参数并输出：
![le](https://wangzongxu.github.io/img-cache/console/console6.png)

#### 总结
其实非常简单，不过比较头疼的地方就是要选择插入占位符的位置和对准占位符和参数的位置，
不过推荐大家一款个人插件:web-chalk

#### webchalk
[web-chalk](https://github.com/wangzongxu/web-chalk.git)使用这款插件可以像html一样定义css样式，用法非常简单，不必为上述问题而头疼，链接里有用法简介。
