---
title: 你不知道的JSON.stringify
categories:
- JS
tags:
- JS
---
我们都知道stringify可以将json转为字符串，但是它还有这样的功能：

<!-- more -->

我们以参数来看它的用法：

### 开始：

JSON.stringify(value [replacer] [flag])

```js
  var obj={a:'AA',b:'BB',c:'CC'}
  var arr=['a','b','d']
```
> 下边均以此为例

#### value：是必填字段。将要转换的目标对象、数组

```js
console.log(
  JSON.stringify(obj)
)
//"{"a":"AA","b":"BB","c":"CC"}"
console.log(
  JSON.stringify(arr)
)
//"["a","b","d"]"
```

#### replacer：可选字段，可以是Function或者Array

- 是函数的时候，用来更改JSON.stringify的默认行为,函数接受两个参数key和value，是json的每一个键值对，我们可以通过处理然后return

```js
//目标是对象的时候
function upperCase(key, value) {
  console.log(key,value);
  if(Object.prototype.toString.call(value)=="[object Object]"){
    return value
  }
  return value.toString().toUpperCase();
}
console.log(
  JSON.stringify(obj,upperCase)
)
// '' {a: "AA", b: "BB", c: "CC"} 第一次的键值对是空和对象本身
// a AA                           第二次为第一项键值对
// b BB                           ...
// c CC                           ...
// "{"a":"AA","b":"BB","c":"CC"}" 执行结果


//目标是数组的时候
function upperCase(key, value) {
  console.log(key,value);
  if(Object.prototype.toString.call(value)=="[object Array]"){
    return value
  }
  return value.toString().toUpperCase();
}
console.log(
  JSON.stringify(arr,upperCase)
)
// '' ["a", "b", "d"]     第一次的键值对是空和数组本身
// 0 a                    第二次为第一项索引和值
// 1 b                    ...
// 2 d                    ...
// ["A","B","D"]          执行结果
```
- 是数组的时候，代表指定需要转成字符串的属性。
```js
console.log(
  JSON.stringify(obj,arr)
)
//"{"a":"AA","b":"BB"}"
//只转换了arr里指定的a和b，由于obj里没有d，所以被忽略

//相当于执行了此方法：
function picking(obj,arr){
  var _obj={};
  for (var i = 0; i < arr.length; i++) {
    var key=arr[i];
    if(typeof obj[key] !== 'undefined' && !(obj[key] instanceof Function)){
      _obj[key]=obj[key]
    }
  }
  return JSON.stringify(_obj)
}
picking(obj,arr)
```

- 如果第一个和第二个参数都是数组或者都是对象的话，会忽略第二个参数。

#### flag：可选字段，作为分隔符

- 可以是数字，表示每行缩进几个字符：

```js
JSON.stringify(obj,false,5)

// "{
//      "a": "AA",
//      "b": "BB",
//      "c": "CC"
// }"
```

- 可以是字符串，表示每个键值对的分隔符：

```js
JSON.stringify(obj,false,'$$$')

// "{
// $$$"a": "AA",
// $$$"b": "BB",
// $$$"c": "CC"
// }"

//也可以放转义字符，例如'\n'
JSON.stringify(obj,false,'\n')

// "{
//
// "a": "AA",
//
// "b": "BB",
//
// "c": "CC"
// }"
```
