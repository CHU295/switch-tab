# 简介
通过自定义按键，以达到控制页面表格等元素切换的功能

## 使用
1. 使用前须先添加事件：`addKeydownEvent`、`removeKeydownEvent`  
- addKeydownEvent 注册监听事件，在页面加载完成或你需要的地方添加此事件
- removeKeydownEvent 卸载事件，在页面销毁时或你需要的地方添加此事件

2. 在需要使用的元素父标签添加类或id

2. 使用`setUpKey`函数自定义配置  
`setUpKey({mainBodyElName: '#id'})`
```
{
  mainBodyElName: '',  // 主体元素类名，必填，如：'#id' '.myForm'
  preBtnKey: 'ArrowUp',// 上一个按钮，默认方向键 ↑ ，非必填
  nextBtnKey: 'ArrowDown', // 上一个按钮，默认方向键 ↓ ，非必填
  callbackFucForMe: null, // 回调函数，切换完成后触发，可通过此处配置自定义事件
}
```
