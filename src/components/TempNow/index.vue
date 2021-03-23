<template>
  <h1>{{ temp[0].format('MMMM Do YYYY, h:mm:ss a') }} {{ temp[1] }}℃</h1>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import moment from 'moment'

export default {
  name: "TempNow",
  setup() {
    const tempText = ref('')
    const flushTemp = () => fetch('http://5.cdl.pub:11451/new')
      .then(result => result.json())
      .then((now) => {
        tempText.value = now.now
      })

    function getNow() { setInterval(flushTemp, 60000) }

    const temp = computed(() => {
      const [timestamp, t] = tempText.value.split('^')
      return [moment(+timestamp), +t]
    });

    onMounted(() => {
      flushTemp()
      getNow()
    })

    return {
      temp
    }
  }
}
</script>

<style scoped>

</style>
