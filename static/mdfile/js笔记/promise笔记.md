### Promise
> 描述: Promise 对象用于表示一个异步操作的最终完成 (或失败)及其结果值。promise对象用来等待创建这给予的结果状态，状态具有唯一不可变性。

### Promise 的状态
1. 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
2. 已兑现（fulfilled）: 意味着操作成功完成。
3. 已拒绝（rejected）: 意味着操作失败。  

### Promise模式和回调模式的区别
>1.控制权问题  
>> 以前的回调模式，把一个预先编辑好的事件函数，传入到等待函数中，如果当前函数是第三方api，这个api充满不确定性，api有可能回调传进去的事件函数调用多次，也有可能不进行调用，牵扯到了控制反转问题。  
>   
>2.是否是异步回调问题  
>> 如果我们传进的回调，调用者并不会异步回调从而导致页面等待事件过长。

### promise链式调用图
> 可以用 promise.then()，promise.catch() 和 promise.finally() 这些方法将进一步的操作与一个变为已敲定状态的 promise 关联起来。这些方法还会返回一个新生成的 promise 对象，这个对象可以被非强制性的用来做链式调用

![promise链式调用](http://192.168.144.210:3002/image/promise.png)    

```javascript
    const pr = Promise.resolve(123)
    pr.then(res => {
        return '456' + 123
    }).then(res => {
        console.log(res);
    })
```  

#### promise对于下面的代码，pr1 向"已敲定"（"settled"）

```js
  const pr1 = Promise.resolve(456)
    pr1.then(res => {
        console.log(res)
    })
    setTimeout(() => {
        pr1.then(res => {
            console.log(res)
        })
    })
```
