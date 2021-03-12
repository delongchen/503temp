<template>
  <path
    :d="d"
    :style="{
      fill: 'none',
      stroke: '#2c3e50',
      strokeWidth: 1,
      strokeLinejoin: 'round'
    }"
  />
</template>

<script>
import { computed } from 'vue'
import { line } from 'd3-shape'

const def = v => ({default: () => v})

export default {
  name: "DataPath",
  props: {
    x: { required: true },
    y: { required: true },
    lineData: def([]),
    cyl: def(6)
  },
  setup(props) {
    const dataToShow = computed(() => {
      const cyl = props.cyl
      const li = props.lineData

      return new Array(Math.floor(props.lineData.length / cyl))
        .fill(null)
        .map((_, index) => li[index * cyl])
    })

    const d = computed(() => {
      return (line()
        .x(d => props.x(d[2]))
        .y(d => props.y(d[1]))
      )(dataToShow.value)
    })

    return {
      d
    }
  }
}
</script>

<style scoped>

</style>
