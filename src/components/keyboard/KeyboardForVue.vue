<template>
  <transition name="keyboard-fade" mode="out-in">
    <section class="keyboard" :style="{color: fontColor}" v-show="isShow">
      <div v-for="(line, $index) in keysData" :style="generatorLineStyle" class="keyboard__line" :key="$index">
        <span
          v-for="(key, $index) in line"
          @click="onKeyClick($event, key)"
          :style="getKeyStyle(key)"
          :class="getKeyClass(key)"
          :key="$index"
          class="keyboard__line__key"
        >
          {{key.text}}
        </span>
      </div>
    </section>
  </transition>
</template>

<script>
import modes from './modes.js'

export default {
  name: 'KeyboardForVue',
  props: {
    // input DOM 对象
    input: {
      type: HTMLInputElement
    },
    // 是否显示键盘
    isShow: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    // 键盘风格
    keyboardStyle: {
      type: String,
      default: 'normal'
    },
    fontColor: {
      type: String,
      default: '#fff'
    },
    // 键盘行高
    lineStyleHeight: {
      type: String,
      default: '60px'
    },
    // 键盘背景色
    keyStyleBgColor: {
      type: String,
      default: '#5b6878'
    }
  },
  data () {
    return {
      inputValue: '',
      // 光标位置
      cursorPosition: '',
      // 功能型按键方法映射关系
      funcKeyMap: {},
      regexp: /^{(\w+)}$/,
      // 是否所动大写字母
      isLockedCaps: false,
      layout: {},
      // 每个 mode 下的 layout 布局风格
      layoutKey: 'default'
    }
  },
  computed: {
    keysData () {
      let layoutData = modes[this.keyboardStyle]
      let layoutMeta = layoutData.meta
      // console.log('layoutData ', layoutData)
      return layoutData[this.layoutKey].map(lineItem => {
        return lineItem.split(' ').map(keyItem => {
          if (this.regexp.test(keyItem)) {
            let key = keyItem.replace(this.regexp, '$1')
            return layoutMeta[key]
          } else {
            return { text: keyItem, value: keyItem }
          }
        })
      })
    },
    // 生成键盘行样式
    generatorLineStyle () {
      return {
        lineHeight: this.lineStyleHeight
      }
    }
  },
  watch: {
    keyboardStyle (newStyle) {
    },
    input (inputDOM) {
      // console.log('inputDOM：', inputDOM)
      this.inputValue = inputDOM && inputDOM.value
    },
    inputValue (newValue) {
      // console.log('newValue: ', newValue)
      let curPos = this.cursorPosition !== '' ? this.cursorPosition : newValue.length
      this.input.value = newValue
      this.input.focus()
      this.input.selectionStart = curPos
      this.input.selectionEnd = curPos
      // 触发 input 事件
      this.input.dispatchEvent(new Event('input', { bubbles: true }))
      this.$emit('input', newValue)
    }
  },
  mounted () {
  },
  methods: {
    onKeyClick (event, key) {
      if (!this.input) return
      if (key.value) { // 普通型按键（更新 input value）
        this.updateInputValue(this.input.selectionStart, this.input.selectionEnd, key.value)
      } else if (key.layoutKey) { // 键盘布局更改型按键
        this.onHandleChangeLayout(key.layoutKey)
      } else if (key.funcName) { // 函数功能型按键
        this[key.funcName](this.input.selectionStart, this.input.selectionEnd)
      }
    },
    // 更新 input 值
    updateInputValue (start, end, keyValue) {
      // 根据 start, end 截取 input value 字符
      let leftStr = this.input.value.substring(0, start)
      let rightStr = this.input.value.substring(end)
      // console.log('num: ', start, end)
      // console.log('str: ', leftStr, rightStr)
      this.inputValue = `${leftStr}${keyValue}${rightStr}`
      this.cursorPosition = `${leftStr}${keyValue}`.length
      if (this.layoutKey !== 'default' && !this.isLockedCaps) {
        this.onHandleChangeLayout('default')
      }
    },
    // 删除操作
    onHandleBackspace (start, end) {
      if (start && start === end) {
        this.updateInputValue(start - 1, end, '')
      } else {
        this.updateInputValue(start, end, '')
      }
    },
    // 清空操作
    onHandleClear (start, end) {
      this.inputValue = ''
    },
    // close 操作
    onHandleClose () {
      this.$emit('update:is-show', false)
      this.$emit('on-close', this.inputValue)
    },
    // 切换键盘内容操作
    // 包含：shiftLeft && shiftRight && 锁定字母大写 操作
    onHandleChangeLayout (type) {
      if (type === 'caps') {
        this.isLockedCaps = !this.isLockedCaps
      } else {
        this.isLockedCaps = false
      }
      this.layoutKey = this.layoutKey === type ? 'default' : type
    },
    getKeyStyle (key) {
      let keyImg = key.img && require(`./icons/${key.img}`)
      return {
        flex: key.width || 1,
        backgroundImage: `url(${keyImg})`,
        backgroundColor: key.bgColor || this.keyStyleBgColor
      }
    },
    getKeyClass (key) {
      return key.img && ['keyboard__line__key--bgImage']
    }
  }
}
</script>

<style scoped>
/* 过渡效果 */
.keyboard-fade-enter-active, .keyboard-fade-leave-active {
  transition: opacity .3s ease;
}
.keyboard-fade-enter, .keyboard-fade-leave-to {
  opacity: 0;
}

.keyboard {
  font-size: 22px;
  /* 禁止选中文字 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.keyboard .keyboard__line {
  display: flex;
  margin: 10px 0;
  line-height: 60px;
}
.keyboard .keyboard__line .keyboard__line__key {
  cursor: pointer;
  box-shadow: inset -3px -3px 2px rgba(0, 0, 0, .25);
}
.keyboard .keyboard__line .keyboard__line__key:hover {

}
.keyboard .keyboard__line .keyboard__line__key:active {
  position: relative;
  top: 1px;
}
.keyboard .keyboard__line .keyboard__line__key--bgImage {
  background-size: auto 82%;
  background-position: center center;
  background-repeat: no-repeat;
}
.keyboard .keyboard__line__key + .keyboard__line__key {
  margin-left: 10px;
}
</style>
