# 一个关于Promise执行顺序的小例子

看下边这段代码并说出结果的输出顺序：

```js
new Promise(resolve => {
  resolve(1)
  Promise.resolve().then(() => console.log(2))
  console.log(4)
}).then(t => console.log(t))
console.log(3)
```

- 执行结果在下边，建议先猜测一下
> 该代码来自阮一峰的微博

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

- 执行结果：4，3，2，1

- 在new Promise的时候，内部代码会立即同步执行，所以先输出4；

- 此时内部的同步代码已经执行完成，开始执行外部的console.log(3)；

- 大家纠结的问题应该在1和2谁先输出，此时我们回过头来看resolve(1)和console.log(2)

- 需要注意的是由于resolve(1)是同步执行的，此时外层Promise并没有执行then方法，也就是说console.log
(t)此时并没有被推入任务队列；

- resolve(1)执行完以后，执行Promise.resolve(() => console.log(2))，这句代码的then方法在任务队列里放了一个console.log(2)，再次注意是这里的then率先在任务队列中放置了任务；

- 接下来才执行到外层Promise的then，这个时候把console.log(t)放入了任务队列；

- 所以我们先看到输出了2，然后输出的1

（完）
