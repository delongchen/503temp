<template>
  <h1>{{ temp[0].format('MMMM Do YYYY, h:mm:ss a') }} {{ temp[1] }}℃</h1>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import moment from 'moment'

export default {
  name: "TempNow",
  setup() {
    const tempText = ref('')

    function getNow() {
      setInterval(() => {
        fetch('http://5.cdl.pub:11451/new')
          .then(result => result.json())
          .then((now) => {
            tempText.value = now.now
          })
      }, 1000)
    }

    const temp = computed(() => {
      const t = tempText.value.split('^')
      return [moment(+t[0]), +t[1]]
    });

    onMounted(getNow)

    return {
      temp
    }
  }
}
</script>

<style scoped>

</style>
