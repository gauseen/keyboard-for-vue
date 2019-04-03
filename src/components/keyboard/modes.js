/** 键盘数据配置
 *
 * meta 对功能型按键的描述
 * 键名称应该和 {value} 里的 value 值保持一致
 * 值为 Object 类型，具体如下：
 * {
 *  text: String, 必填 // 页面显示的文本
 *  value: String, 非必填 //
 *  width: Number, 非必填, 默认: 1, // 对应功能型按钮宽度所占份数， flex 布局
 *  img: String, 非必填 // 按键的背景图片
 *  funcName: String, 非必填, 可选值: onHandleBackspace(回删) || onHandleClear(清空) || onHandleClose(关闭键盘), // 功能型按键函数名称
 *  layoutKey: String, 非必填, // 点击键盘更改布局，对应的布局名称
 *  bgColor: String, // 功能按键背景颜色
 * }
 *
 * default 每种模式的默认布局方式
 *
 * caps、shift ... 每种带 layoutKey 属性按键所对应的布局方式
 * {value} value 要与 mate 对象中的 key 值保持一致
 *
 **/

export default {
  normal: {
    meta: {
      backspace: { text: ' ', width: 2, img: 'backspace.svg', funcName: 'onHandleBackspace' },
      tab: { text: 'tab', value: '\t', width: 1.2 },
      caps: { text: 'CapsLock', width: 1.4, layoutKey: 'caps' },
      enter: { text: 'enter', value: '\r\n', width: 1.4, bgColor: '#e64d45' },
      shiftLeft: { text: 'shift', width: 1.6, layoutKey: 'shift' },
      shiftRight: { text: 'shift', width: 1.6, layoutKey: 'shift' },
      next: { text: 'next', width: 2.5, funcName: 'next' },
      space: { text: 'space', value: ' ', width: 10 },
      close: { text: 'close', width: 2.5, funcName: 'onHandleClose', bgColor: '#e64d45' }
    },
    default: [
      '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
      '{tab} q w e r t y u i o p [ ] \\',
      '{caps} a s d f g h j k l ; \' {enter}',
      '{shiftLeft} z x c v b n m , . / {shiftRight}',
      '{space} {close}'
    ],
    caps: [
      '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
      '{tab} Q W E R T Y U I O P [ ] \\',
      '{caps} A S D F G H J K L ; \' {enter}',
      '{shiftLeft} Z X C V B N M , . / {shiftRight}',
      '{space} {close}'
    ],
    shift: [
      '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
      '{tab} Q W E R T Y U I O P { } |',
      '{caps} A S D F G H J K L : \' {enter}',
      '{shiftLeft} Z X C V B N M < > ? {shiftRight}',
      '{space} {close}'
    ]
  },
  number: {
    meta: {
      backspace: { text: ' ', img: 'backspace.svg', funcName: 'onHandleBackspace' },
      ac: { text: 'AC', width: 2, funcName: 'onHandleClear' },
      close: { text: 'close', width: 2, funcName: 'onHandleClose', bgColor: '#e64d45' }
    },
    default: [
      '7 8 9 {ac}',
      '4 5 6 {backspace}',
      '1 2 3 -',
      '0 . {close}'
    ]
  }
}
