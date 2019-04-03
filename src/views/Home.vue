<template>
  <div class="home">
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
    <keyboard-for-vue :input="input" :is-show.sync="isShow" :keyboardStyle="keyboardStyle" @on-close="handleClosed"></keyboard-for-vue>
  </div>
</template>

<script>

export default {
  name: 'home',
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

<style scoped>
.home p {
  margin: 0;
  padding: 0;
}
.home p {
  height: 40px;
  line-height: 40px;
}
</style>
