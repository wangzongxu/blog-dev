# 后台管理系统

个人总结内容管理系统（CMS）的心得。

来到某云计算公司长期以来做的一直是管理系统控制台，，从jquery到vue，颇有心得。

## 菜单树
- 关于菜单树，是每个管理系统必有的，作为导航性质的，非常重要的部分，整理好DOM结构，方便多级目录的展开和收起，如果使用vue，react等组件化框架，把菜单树但独立出来即可。
- 关于图标，一般放在菜单树每一项文字的前边，对于现在浏览器，我们使用的是svg，相对于图片而言，即使放大再多，也不会是真。但是有时候有一点问题，在chrome中，如果页面中的svg过多，可能造成页面解析闪烁，解决方法也比较简单：在加载页面时将svg用js拼接字符串动态插入就好。

## 面包屑
- 不知道这个名字怎么起的，所谓‘面包屑’就是页面左上角的当前位置，这里非常简单，点击每一步骤都可以进行跳转就可以了，最好的交互是如果当前是表单页面，当用户点击的时候，进行一下确认提示，防止误点导致填写的东西丢失。
<img src="https://wangzongxu.github.io/img-cache/blog/bread.png" width="200" alt="bread" align="center"/>

## 列表全选和分页
- 之前项目使用的jq来做，比较头疼的地方就是这里，因为通常在一个列表管理页面，每一条数据要有删除放入复选框，问题是当用户切换页码之后再次回到原来页数，我们如果不做特殊处理，之前选中复选框选中态会被清除，这样并不利于交互，而如果我们在逻辑处理，实践中证明虽然问题是小，但是导致的代码量增加的不少，而且可维护性和性能降低。权衡之下我们采用了这种分页结构：
<img src="https://wangzongxu.github.io/img-cache/blog/page.png" width="400" alt="page" align="center"/>
如此之来，用户如果想要选择更多数据，只要切换当夜显示的条数即可，算是一个交互与程序复杂度的这种点吧。
- 如果项目使用的MVVM框架，则无需考虑以上问题。交互与性能兼并。

## 分步创建和编辑
创建和编辑功能也是管理系统中不可缺失的一部分，复杂度很高，其中包括：表单验证，编辑回填，文字转义等多重问题，以下图为例：
<img src="https://wangzongxu.github.io/img-cache/blog/step.png" width="400" alt="step" align="center"/>
- 按常理来我们将这三步骤分成三个页面来做。因为这样方便代码维护，可读性也比较高，于是我们这么做了，完成之后发现一个问题：用户在这三步中是可以任意来回切换的，切换之后再回来仍然需要显示之前填写的东西。但是我们做的是三个页面，如果要保存用户的数据，还要用本地存储，过程十分繁琐。
- 如果不想考虑上一个问题，我们可以从刚开始吧这三步骤放到一个页面里，用户点击上下步骤的时候，保留当期步骤，让其他步骤隐藏即可。我们发现即使切换步骤，也不会丢失之前数据，但是试想一下，三个页面的逻辑都放在一个页面中，无论加载速度，可读性和维护性都不敢直视，上千行代码也没的说。
- 其实这里还是建议使用vue，感觉真的是为做这种系统而生的，他有个动态组件功能，允许我们把这个三个步骤单独为三个组件，当用户切换步骤的时候，我们只是控制的组件的展示，还可以将切换出取的其他步骤保存在缓存中，使得用户再次回来这个步骤，之前的数据仍然不变。这样即保证的代码的质量，也保证的用户的体验。

## 弹窗
弹窗作为用户获得信息的重要途径，当然需要认真设计一下：
- 将弹窗基本分为三类，确认弹窗（confirm），提示弹窗（alert/toast），操作弹窗。
- 操作弹窗即一些用提供给用户管理的大型弹窗，也可以叫做一个小的‘轻页面’，比如用户要在一个管理组里添加成员，点击添加按钮，页面跳出一个弹窗，里边展示着可以添加的每个。
- 由于操作弹窗的功能各异，样式也就不用。所以我们一般把确认和提示弹窗做成通用封装到一个全局工具包中，方便随时操作，而操作弹窗则依照实际情况而定。
- 关于弹窗，不论大小，有一点比较好的体验：当弹窗展示的过程中，我们将页面的宽高都设为100%，即禁止屏幕滚动，防止在弹窗在展示时页面可以滚动，最重要的是如果我们的操作弹窗非常高，以至于超出屏幕高度，这时候肯定要进行滚动展示，当弹窗内出现滚动条时，如果同时页面也有滚动条，这会导致页面不仅看起来非常丑，而且操作上很奇怪。如果我们将页面全屏防止滚动就可以去掉页面滚动条，只保留弹窗内滚动条，这样一个小小的细节使得不论看起来和操作上都比较完美。

## 字符转义
字符转义和我们做的项目相关，如果项目不允许用户输入特殊符号，我们做了输入限制，就不会有此问题。如果允许输入特殊字符（这里仍要防止XSS攻击），我们就要做相应处理。
- 我们的项目中，对于特殊字符，后台会一律转码，比如我们在填写表单的时候输入的是&，再次编辑的时候就变成了&amp;.
- 一般单独封装一个转义的函数，将已知的‘码’都预设在里边，传入被后台转义之后的，返回正常显示的特殊符号，函数比较简单，就不在此费口舌了。
- 需要注意的两个地方就是列表的数据和编辑某一项的时候，需要转义。

## 字符超长剪裁
对于列表中某一个字段可能过长，导致页面显示错乱
- 添加css字符剪裁
<img src="https://wangzongxu.github.io/img-cache/blog/ellipsis.png" width="200" alt="ellipsis" align="center"/>

- 添加title，让用户能够看到完整的文字。

## loading
关于loading，可以让用户知道操作的进行状态，没有它，用户点击了一个按钮以后，会认为没有反馈。
- 一般我们吧loading分为两种：列表loading 和 操作loading
- 列表loading就是当用户进入列表页面的时候，或者切换页码的时候，我们应该对用户友好提示‘加载中...’，如果加载成功的话，就隐藏该提示，如果加载失败，就显示错误信息。这里也有一点：列表加载错误的提示建议不使用弹窗形式，因为在加载过程中用户看得是这个列表，我们一般把列表loading就放在列表位置，当失败的时候将loading文字更改一下，用户一目了然,没必要在使用弹窗提示。
<img src="https://wangzongxu.github.io/img-cache/blog/list-loading.png" width="auto" alt="list-loading" align="center"/>
- 操作loading是当用户进行分步创建新的数据的时候，点击下一步的时候，此时一般我们都会进行和后台数据交互，反应可能会有延迟，这是需要给用户一个友好的loading，用意是告诉用户我们正在加载中，别着急。
<img src="https://wangzongxu.github.io/img-cache/blog/screen-loading1.png" width="400" alt="screen-loading1" align="center"/>

## 二次封装ajax
一般我们的接口数据返回格式会和后台约定好下边格式：

```json
{
  "code": 200,
  "msg": "执行成功",
  "data": {}
}
```

- code是返回状态，成功为200,注意这个不是网络状态码，只是与后台的约定。
- 依照以上数据，正常情况我们写ajax的时候，会这样写(jq为例)：

```js
$.ajax({
  url: 'xxx',
  success: function(data) { // 网络请求成功
    if (data.code === 200) { // 操作成功
      // do something ...
    } else { // 操作失败
      // do something ...
    }
  },
  error: function(e) { // 网络错误
    alert('网络错误，请重试');
  }
})
```

- 看得出，成功只有一种情况，而错误会有两种情况，即网络错误和后台返回的code不是200的操作错误，
如果每个数据请求都这么写，代码会很冗余，举例简单将其封装一下：

```js
function myAjax (obj) {
  $.ajax({
    url: obj.url,
    success: function(data) { // 网络请求成功
      if (data.code === 200) { // 操作成功
        // do something ...
      } else { // 操作失败
        obj.error(data.msg);
      }
    },
    error: function(e) { // 网络错误
      obj.error('网络错误，请重试');
    }
  })
}
```
- 如此一来，我们就可以少处理一个错误：

```js
myAjax({
  url: 'xxx',
  success: function(data) { // 成功
    // do something ...
  },
  error: function(e) { // 错误
    alert(e);
  }
})
```

## 表单验证
在用户创建信息的时候，通常我们会进行前端输入验证：
- 建议使用统一验证插件，方便团队中其他人维护的便捷性（vue的话建议[vee-validate](http://vee-validate.logaretm.com/)）
- 多人开发要统一错误提示方式和提示用语。

## 日历插件
列表中和表单中选择时间也是必不可少的
- 用了很多插件，发现无论拓展性，稳定性都不如心意，推荐一款：
- [My97 DatePicker](http://www.my97.net/index.asp)

## 连点问题
连点问题是个需要重视的问题，比如用户在创建信息的时候点击完成，用户连点了多次，会造成多次请求，可能导致最终的创建信息失败。
- 在loading中我们就处理过，在点击按钮的时候添加loading效果，其实稍加改动便可解决连点问题
- 给loading图添加一个大背景，让其全屏展示即可，应为此时的用户再也点不到按钮了，直到得到后台的反馈之后才可再次点击。
<img src="https://wangzongxu.github.io/img-cache/blog/screen-loading2.png" width="400" alt="screen-loading2" align="center"/>

(完)