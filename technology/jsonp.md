# jsonp原理

介绍jsonp实现原理


### 网络请求
> 三要素:协议 域名 端口

- 什么是同域请求?
一个请求的url三要素与当前页面url的三要素相同的请求叫做同域请求

- 什么是跨域请求?
一个请求的url三要素与当前页面url的三要素只要有一个不同,那么这个请求就是跨域请求.
例如：http://www.baidu.com 和 http://tieba.baidu.com 的域名不一样，造成跨域

### 同源策略
它是一种浏览器厂商为了安全,强制添加的一种安全限制.
它限制了js在哪些地方(同域请求中)可以用,哪些地方(跨域请求中)不可以用.

### 如何安全绕过同源策略的限制?
平时可能注意过，当img、script、iframe标签的src引用地址是可以引用跨域资源的。比较img script iframe 这三个标签的特点：

- img的特点
1. 加载跨域资源时不受同源策略的限制
2. 会把加载过来的内容强制当成图片来显示.如果不是合法图片,则显示裂图.
- script的特点
1. 加载跨域资源时不受同源策略的限制
2. 会把加载过来的内容强制当成脚本来执行.如果返回的数据不是合法的脚本,则执行出错.
- iframe
1. 加载跨域资源时不受同源策略的限制
2. 数据可以成功加载进来,但是由于同源策略的限制无法获取里头的内容.
- 比较以上特点，我们可以利用script标签的这两个特点,来实现一个跨域请求.

### jsonp的原理:
1. 利用script标签实现跨域请求,<script src="http://www.abc.com?callback=functionName"></script>
2. server定义好的那个用来设置返回数据中执行函数的函数名的那个参数就叫callback;(参见示例中的jsonp参数)
3. callback后面跟的value(参见示例中的randomName方法的执行)必须是全局作用域下的一个函数
4. server返回的数据格式是固定的: functionName( /\*json data\*/ );

### 为什么叫jsonp?
1. 根据返回的数据格式来看：函数名 + json数据
即：functionName + json data
2. 用语言表达出来：函数名装入一个json数据
即：functionName append a json data
3. 更换主语：json数据填入到一个函数名内
即：json data padding a functionName
4. 缩句：json数据填入函数名
即：json padding functionName =>
5. 缩句（专注过程）：一个json填充的过程
即：json padding
6. 再缩句
即：jsonp

### jsonp的注意事项:
1. 因为jsonp是通过script的src属性去加载跨域资资源,所以jsonp请求全部都是get方法请求.
2. get系方法有的特点jsonp全有
3. 所有的jsonp接口必须含有一个callback,否则不是合法的jsonp接口.
4. 所有的jsonp接口必须按照格式返回 => functionName( /\*json data\*/ );

### jsonp为什么不是ajax?
1. 因为ajax是通过浏览器提供的操作http请求的API来实现的.
2. jsonp是通过script实现的.所以jsonp不是ajax.

### 示例

```js
// 处理模块化兼容：
;(function(name, factory) {
  if (typeof define === 'function') { // requireJs
    define(factory);
  } else if (typeof module === 'object' && module.exports) { // commonJs
    module.exports = factory();
  } else { // 不支持模块化，将jsonp方法放在window上
    this[name] = factory();
  }
})('jsonp', function() {
  // 定义一些需要的方法:
  var tools = {
    // 合并对象
    extends: function(target, mix) {
      for (var key in mix) {
        if (mix.hasOwnProperty(key)) {
          target[key] = mix[key]
        }
      }
    },
    // 格式化参数
    queryString:function(str, obj) {
      var params = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          params.push(key + '=' + obj[key])
        }
      }
      var fields = params.join('&');
      if (fields.length === 0)return str;
      if (str.indexOf('?') > -1){
        return str + fields
      } else {
        return str + '?' + fields
      }
    },
    // 类型判断
    type:function(target) {
      return /\[object\s(\w+)\]/.exec(
        Object.prototype.toString.call(target)
      )[1];
    },
    // 创建全局functionName随机名称
    randomName: function() {
      return 'jsonp' + Math.random().toString().substr(2,7);
    }
  }

  // 对外暴露接口
  return function (opt) {
    // 定义默认参数
    var fields = {
      url: '', // 接口地址
      data: {}, // 参数（问号传参）
      context: window, // success、error、complete三个函数的上下文环境
      jsonp: 'callback', // 与server端约定的jsonp参数名
      success: function() {}, // 成功的对调
      error: function() {}, // 失败的回调
      complete: function() {} // 执行完成的回调
    }
    // 将用户传入的参数与默认参数融合
    tools.extends(fields, opt);
    // 参数不正确进行报错
    if (!fields.url) throw new Error('url must be string');
    if (tools.type(fields.url) !== 'String' ||
        tools.type(fields.jsonp) !== 'String') throw new Error('url and jsonp must be string');
    if (tools.type(fields.data) !== 'Object') throw new Error('data must be object');
    if (tools.type(fields.success) !== 'Function' ||
        tools.type(fields.error) !== 'Function' ||
        tools.type(fields.complete) !== 'Function') throw new Error('success、error and complete must be function');
    // 生成随机全局functionName
    var tempName = tools.randomName();
    // 因为functionName也要序列化到url上，所以将functionName加入data参数中
    fields.data[fields.jsonp] = tempName;
    // 序列化生成新url
    var url = tools.queryString(fields.url, fields.data);
    // 根据functionName定义全局可执行函数
    window[tempName] = function(data) {
      // 该方法被调用后执行成功的回调并更改上下文环境
      fields.success.call(fields.context, data);
      // 执行完成
      complete(tempName);
    }
    // 创建script标签
    createScriptNode(url, tempName);
    // 这里根据url创建了一个script标签并插入body，将functionName作为其id，以后用来删除
    function createScriptNode(url, tempName){
      var script = document.createElement('script');
      script.id = tempName;
      // 异步加载，防阻塞
      script.async = true;
      script.src = url;
      // 处理错误
      script.onerror = function(err) {
          // 该方法被调用后执行失败的回调并更改上下文环境
        fields.error.call(fields.context, err);
        // 执行完成
        complete(tempName);
      };
      // 插入body
      document.body.appendChild(script);
    }
    // 根据functionName删除script标签
    function removeScriptNode(tempName) {
      var script = document.getElementById(tempName);
      document.body.removeChild(script);
    }
    // 执行完成
    function complete(tempName){
      // 删除全局可执行函数
      delete window[tempName];
      // 删除标签
      removeScriptNode(tempName);
      // 执行完成的回调
      fields.complete.call(fields.context);
    }
  }
})

```
