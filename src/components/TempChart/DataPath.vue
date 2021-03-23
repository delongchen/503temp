<template>
  <path :d="d" class="data-line"/>
</template>

<script>
import { computed, ref } from 'vue'
import { line } from 'd3-shape'

const def = v => ({default: () => v})

export default {
  name: "DataPath",
  props: {
    x: { required: true },
    y: { required: true },
    lineName: def(''),
    cyl: def(30)
  },
  setup(props) {
    const paths = ref([]),
        lineData = ref([])

    const dataToShow = computed(() => {
      const cyl = props.cyl

      return new Array(Math.floor(lineData.value.length / cyl))
        .fill(null)
        .map((_, index) => lineData.value[index * cyl])
    })

    const d = computed(() => {
      return (line()
        .x(d => props.x(d[2]))
        .y(d => props.y(d[1]))
      )(dataToShow.value)
    })

    const path = computed(() => {
      return paths.value.join('')
    })

    return {
      d,
      dataToShow,
      path
    }
  }
}
</script>

<style scoped>
.data-line {
  fill: none;
  stroke: #2c3e50;
  stroke-width: 2;
  stroke-linejoin: round;
}

.data-point {
  display: none;
}
</style>
