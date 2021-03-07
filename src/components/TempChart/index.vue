<template>
  <p>{{ height }}</p>
  <p>{{ chartHeight }}</p>
  <p>{{ chartWidth }}</p>
</template>

<script>
import { computed } from 'vue'

const def = v => ({ default() {return v}})

export default {
  name: "TempChart",
  props: {
    width: def(500)
  },
  setup(props) {
    const margin = { left: 20, bottom: 20, right: 60, top: 10 },
      height = computed(() => props.width * .5),
      chartWidth = computed(() => props.width - margin.left - margin.right),
      chartHeight = computed(() => height.value - margin.top - margin.bottom)

    return {
      height,
      chartWidth,
      chartHeight
    }
  }
}
</script>

<style scoped>

</style>