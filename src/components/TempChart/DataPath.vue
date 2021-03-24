<template>
  <path :d="d" class="data-line"/>
</template>

<script>
import { computed, ref } from 'vue'
import { line } from 'd3-shape'
import { injectN } from "@/util/vueAbout";

const def = v => ({default: () => v})

export default {
  name: "DataPath",
  props: {
    lineName: def(''),
  },
  setup(props) {
    console.log(props.lineName)
    const paths = ref([]),
        lineData = ref([]),
        cyl = ref(30),
        { x, y } = injectN(['x', 'y'])

    const dataToShow = computed(() => {
      return new Array(Math.floor(lineData.value.length / cyl.value))
        .fill(null)
        .map((_, index) => lineData.value[index * cyl.value])
    })

    const d = computed(() => {
      return (line()
        .x(d => x(d[2]))
        .y(d => y(d[1]))
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
