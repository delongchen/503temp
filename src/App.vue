<template>
  <div id="app">
    <p @click="handle">hello</p>
    <temp :width="w"/>
  </div>
</template>

<script>
import Temp from '@/components/TempChart'
import { reactive, toRefs, onMounted } from 'vue'

export default {
  name: 'App',
  components: {
    Temp
  },
  setup() {
    const state = reactive({
      w: 500,
    })

    const handle = () => {
      state.w += 100
    }

    onMounted(() => {
      state.w = document.getElementById('app').offsetWidth
    })

    return {
      ...toRefs(state),
      handle
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
