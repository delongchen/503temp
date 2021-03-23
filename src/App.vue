<template>
  <div id="app">
    <temp-now/>
    <temp-chart :width="w"/>
  </div>
</template>

<script>
import TempChart from '@/components/TempChart'
import TempNow from '@/components/TempNow'

import { reactive, toRefs, onMounted } from 'vue'

export default {
  name: 'App',
  components: {
    TempChart,
    TempNow
  },
  setup() {
    const state = reactive({
      w: 500,
    })

    onMounted(() => {
      state.w = document.getElementById('app').offsetWidth * 0.9
      document.getElementById('app')
        .addEventListener('contextmenu', (ev) => {
          ev.preventDefault()
        })
    })

    return {
      ...toRefs(state),
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
