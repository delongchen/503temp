<template>
  <div>
    <p @click="w += 100">hello</p>
    <temp :width="w"/>
  </div>
</template>

<script>
import Temp from '@/components/TempChart'
import {ref} from 'vue'

export default {
  name: 'App',
  components: {
    Temp
  },
  setup() {
    const w = ref(500)

    return { w }
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
