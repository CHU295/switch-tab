<p align="center">
  <a href="https://www.npmjs.com/package/chu-switch-tab"><img src="https://img.shields.io/npm/dm/chu-switch-tab.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/chu-switch-tab"><img src="https://img.shields.io/npm/v/chu-switch-tab.svg?sanitize=true" alt="Version"></a>
</p>

# 简介
通过自定义按键，以达到控制页面表格等元素切换的功能；  

> ```npm i chu-switch-tab```

## 使用场景
在网页中，正常情况下是可以使用tab shift+tab切换例如input select button此类组件的选中聚焦等状态

但实际操作中可能觉得组合键太复杂，或者与数字键相隔甚远需要用上下左右等按键达到此类效果

所以诞生了此组件

## 实现原理
- 初始思路：按下其它键位的时候触发tab 的keydown事件，以直接达到目的

- 实际情景：在使用js模拟触发tab的 keydown事件时，实际并不能达到此种效果，模拟事件执行了但没有触发相应功能

- 实现思路：在经过思考后，采用了以下方法  
   在需要切换的元素父标签上增加id标识，然后通过js拿到下面所有符合的子元素；  
 添加监听事件，当设置的按键触发了keydown事件后，循环匹配定位到当前元素  
最后根据需要执行的方向去切换选中元素，利用focus事件即可

**因`KeyboardEvent`的`keycode`属性即将被遗弃**

**所以此代码中使用的是<label style="color:red">key</label>字段，下面附录有对象码表**

# 使用
1. 使用前须先添加事件：`addKeydownEvent`、`removeKeydownEvent`  
- addKeydownEvent 注册监听事件，在页面加载完成或你需要的地方添加此事件
- removeKeydownEvent 卸载事件，在页面销毁时或你需要的地方添加此事件

2. 在需要使用的元素父标签添加类或id

2. 使用`setUpKey`函数自定义配置  
`setUpKey({mainBodyElName: '#id'})`
```
{
  mainBodyElName: '',  // 主体元素类名，必填，如：'#id' '.myForm'
  preBtnKey: 'ArrowUp',// 上一个按钮 ，非必填，默认方向键 ↑，key值见附录
  nextBtnKey: 'ArrowDown', // 上一个按钮 ，非必填，默认方向键 ↓，key值见附录
  matchingEl: ['input'], // 匹配元素，非必填，默认input标签，接受数组格式
  callbackFucForMe: null, // 回调函数，非必填，切换完成后触发，可通过此处配置自定义事件
}
```

# 详细实例
在vue中使用  

1. 引入`import tabSwtich from 'path/index.js'`


2. 在需要的input标签外层元素添加class `class="myForm"`

3. 注册事件，添加配置  
 ```
mounted() {
  tabSwtich.addKeydownEvent();
  tabSwtich.setUpKey({
    mainBodyElName: '.myForm',  
    preBtnKey: 'ArrowUp',
    nextBtnKey: 'ArrowDown', 
    matchingEl: ['input'], 
    callbackFucForMe: ()=>{
      console.log('切换成功了！')
    }
  }) 
}
beforeDestroy() {
  tabSwtich.removeKeydownEvent()
}
```
react中只需要修改`mounted beforeDestroy`为对应生命周期即可  
原生中类似

# 注意点
1. 请不要在页面多次添加监听事件!
2. 若使用` + - < > `此类输入性按键切换，记得在输入框内过滤
3. select此类标签切换后需要关闭下拉框，可在回调事件`callbackFucForMe`中添加

---
> [github](https://github.com/CHU295/swtich-tab)  
>[npm](https://www.npmjs.com/package/chu-switch-tab)
----
# 附录


[KeyboardEvent KEY MDN地址](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key)

[key 键码表](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key/Key_Values)

> 若无法查询对应key值，可以使用keydown事件查看

![](https://user-gold-cdn.xitu.io/2020/3/20/170f6addc51747f8?w=810&h=609&f=png&s=54772)