## virtual keyboard for vue

### 预览
[Demo Live](https://gauseen.github.io/keyboard-for-vue/#/)

### 特性
- 轻量、无其他依赖
- 支持电脑原生键盘和 `virtual keyboard` 同时使用
- 自定义布局、样式

### 使用
```sh
# 安装
yarn add @gauseen/keyboard-for-vue
# OR
npm i -S @gauseen/keyboard-for-vue
```

#### ESM 引入
```js
// main.js
import Vue from 'vue'
import KeyboardForVue from '@gauseen/keyboard-for-vue'

Vue.use(KeyboardForVue)
```

#### 浏览器脚本引入
```html
<link rel="stylesheet" href="https://unpkg.com/@gauseen/keyboard-for-vue/dist/keyboardForVue.css">

<script src="https://unpkg.com/@gauseen/keyboard-for-vue"></script>
```

#### Demo
```html
<template>
  <div class="demo">
    <form>
      <fieldset>
        <legend>keyboard for vue:</legend>
        Name: <input v-model="name" @focus="onFocus" autofocus type="text">
        <p>{{name}}</p>

        Email: <input v-model="email" @focus="onFocus" type="text"><br>
        <p>{{email}}</p>

        Money: <input v-model="money" @focus="onFocus" type="text"><br>
        <p>{{money}}</p>

        <div>
          Switch style:
          <input type="radio" id="normal" value="normal" v-model="keyboardStyle">
          <label for="normal">normal</label>
          <input type="radio" id="number" value="number" v-model="keyboardStyle">
          <label for="number">number</label> &nbsp;
          <button @click.prevent="handleClear"> Clear </button>
        </div>
      </fieldset>
    </form>
    <keyboard-for-vue
      :input="input"
      :is-show.sync="isShow"
      :keyboard-style="keyboardStyle"
      @on-close="handleClosed"
    >
    </keyboard-for-vue>
  </div>
</template>
```
```html
<script>
export default {
  name: 'Demo',
  data () {
    return {
      keyboardStyle: 'normal',
      isShow: false,
      input: null,
      name: 'gauseen',
      email: '',
      money: ''
    }
  },
  methods: {
    onFocus (e) {
      this.input = e.target
      this.isShow = true
    },
    handleClear (e) {
      this.name = ''
      this.email = ''
      this.money = ''
      this.isShow = false
    },
    handleClosed (value) {
      window.alert(value)
    }
  }
}
</script>
```


### 属性
| 属性 | 类型 | 说明 | 默认参数 | 可选值 | 必填？ |
|-------|-------|---------|-------|-------|-------|
| `input` | `HTMLInputElement` | 键盘将要输入的 `input DOM` 对象 | - | `input DOM` | 否 |
| `is-show.sync` | `Boolean` | 虚拟键盘是否显示 | `false` | `true、false` | 否 |
| `keyboard-style` | `String` | 虚拟键盘展示模式 | `normal` | `normal、number` | 否 |
| `font-color` | `String` | 键盘字体颜色 | `#fff` | - | 否 |
| `line-style-height` | `String` | 每个键的高度 | `60px` | - | 否 |
| `key-style-bg-color` | `String` | 每个键背景色 | `#5b6878` | - | 否 |

### 方法
| 方法 | 说明 | 回调参数 |
|-------|-------|---------|
| `on-close` | 键盘消失时回调 | `function(inputValue)` |