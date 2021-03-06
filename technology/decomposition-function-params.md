# ES6函数参数解构典型问题

函数参数解构的一个典型问题

### 首先对比两个例子

> 例子一

```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move();  // [0, 0]

```

> 例子二

```js
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

- 不能理解结果的话继续往下看^_^

### 从babel转码看解构原理
利用babel[在线转码](https://babeljs.io/repl/)方便学习解构的原理:

- 再次分析函数的参数

```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
```
- 我们将上边函数参数分为两部分，等号前边 {x = 0, y = 0} 称之为模式，等号后边 {} 是称之为默认参数，如果函数执行时没有传参，则会取默认参数。

> babel转码后的例子一

```js
function move() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // 如果没有传参，那么取默认值空对象{}
  var _ref$x = _ref.x;
  // 模式对参数进行解构：取参数的x值
  var x = _ref$x === undefined ? 0 : _ref$x;
  // 模式中的x有默认值，所以当被解构的参数中没有x，则取模式中的x值：0
  var _ref$y = _ref.y;
  // 模式对参数进行解构：取参数的y值
  var y = _ref$y === undefined ? 0 : _ref$y;
  // 模式中的y有默认值，所以当被解构的参数中没有y，则取模式中的y值：0
  return [x, y];
}

move({ x: 3, y: 8 });
// 传递了参数 { x: 3, y: 8 } 则模式对该参数进行解构，结果为：[3, 8]
move({ x: 3 });
// 传递了参数 { x: 3 } 则模式对该参数进行解构，解构过程中x成功取值:3，由于参数中没有y，所以y值取值失败，失败后取模式中的y默认值0，所以结果为：[3, 0]
move({});
// 传递了参数空对象{} 则模式对该空对象进行解构，由于该参数中xy都没有，所以都取模式中xy默认值0，最后结果为[0, 0]
move();
// 没有传递参数，则取默认参数空对象 {}，模式对默认参数进行解构，和上边一样，参数中xy都没有，所以都取模式中xy默认值0，最后结果为[0, 0]

```

> babel转码后的例子二

```js
function move() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };
  // 如果没有传参，那么取默认值：{ x: 0, y: 0 }
  var x = _ref2.x;
  // 模式对参数进行解构：取参数的x值
  var y = _ref2.y;
  // 模式对参数进行解构：取参数的y值

  return [x, y];
}

move({ x: 3, y: 8 });
// 传递了参数 { x: 3, y: 8 } 则模式对该参数进行解构，结果为：[3, 8]
move({ x: 3 });
// 传递了参数 { x: 3 }，模式对该参数进行解构，解构过程中x成功取值:3，由于参数中没有y，所以y值取值失败，此时模式中也没有指定y的默认值，所以结果为：[3, undefined]
move({});
// 传递了参数空对象 {}，模式对参数空对象进行解构，xy皆取值失败，模式中xy也并没有默认值，所以最后结果为：[undefined, undefined]
move();
// 没有传递参数，则取默认参数{ x: 0, y: 0 }，模式对默认参数进行解构，x取值0，取值0，所以结果为[0, 0]
```

### 总结
当一个函数执行时要看该函数在定义过程中是否有默认参数，模式中是否有默认值：
首先根据是否传参和是否有默认参数来确定参数是谁，然后将模式对参数进行解构。
结构过程中如果解构失败要根据模式中是否指定了默认值来确定最后取值。
逻辑比较乱，多多练习，慢慢体会。

- 取值过程
```
if (有默认参数) {
    if (执行时传参了) {
        将模式对参数解构
         if (解构成功) {
             最终取值成功解构的值
         } else {
             if (模式中制定了默认值) {
                最终取模式中默认值
             } else {
                取值undefined
            }
         }
     } else {
        将模式对默认参数解构
        if (解构成功) {
            最终取值成功解构的值
        } else {
            if (模式中制定了默认值) {
                最终取模式中默认值
            } else {
                取值undefined
            }
        }
    }
} else {
    if (执行时传参了) {
       最终以执行传递的参数为准
    } else {
       最终参数为undefined
    }
}
```
(完)