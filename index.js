let globalOptions = {
  mainBodyElName: '',  // 主体元素类名，必填，如：'#id' '.myForm'
  preBtnKey: 'ArrowUp',// 上一个按钮 ，非必填，默认方向键 ↑
  nextBtnKey: 'ArrowDown', // 上一个按钮 ，非必填，默认方向键 ↓
  matchingEl: ['input'], // 匹配元素，非必填，默认input标签，接受数组格式
  callbackFucForMe: null, // 回调函数，非必填，切换完成后触发，可通过此处配置自定义事件
}

// 属性设置
function setUpKey(options) {
  Object.keys(options).forEach((i, index) => {
    globalOptions[i] = options[i]
  })
}

// 添加keydown监听事件
function addKeydownEvent() {
  window.addEventListener("keydown", keyTabs, false);
}

// 卸载keydown监听事件
function removeKeydownEvent() {
  window.addEventListener("keydown", keyTabs, false);
}

/**
 * 主体函数
 * tabChangeType 控制切换方向，true：往上；false：往下
 * currrentEl    当前选中元素
 * indexs        当前选中元素下标
 * allInputEl    符合条件的所有元素
 */
function keyTabs(event) {
  let tabChangeType = true;
  if (event.key === globalOptions.nextBtnKey) {
    tabChangeType = true;
  } else if (event.key === globalOptions.preBtnKey) {
    tabChangeType = false;
  } else {
    return false;
  }
  let indexs = 0,
    allInputEl = document.querySelector(globalOptions.mainBodyElName).querySelectorAll(globalOptions.matchingEl.join(','));
  let currrentEl = document.activeElement;
  // 某些操作会导致元素失焦，目标变成document.body，此时设置下标为0
  if (currrentEl == document.body) {
    indexs = 0;
  } else {
    allInputEl.forEach((i, index) => {
      if (currrentEl == i) {
        indexs = index;
      }
    });
  }
  // 切换处理
  // 当前为最后一个并且往下切换，回到第一个
  // 当前为第一个并且往上切换，回到最后一个
  if (tabChangeType && indexs == allInputEl.length - 1) {
    indexs = 0;
  } else if (!tabChangeType && indexs == 0) {
    indexs = allInputEl.length - 1;
  } else {
    indexs = indexs + (tabChangeType ? 1 : -1);
    indexs = indexs >= 0 ? indexs : 0
  }
  allInputEl[indexs].focus();

  if (Object.prototype.toString.call(globalOptions.callbackFucForMe) == '[object Function]') {
    globalOptions.callbackFucForMe()
  }
}

const tabSwtich = {
  addKeydownEvent: addKeydownEvent,
  removeKeydownEvent: removeKeydownEvent,
  keyTabs: keyTabs,
  setUpKey: setUpKey
}

export default tabSwtich