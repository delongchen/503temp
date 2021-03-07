<template>
  <svg :width="width" :height="height">
    <g :transform="translateX">

    </g>
  </svg>
</template>

<script>
import { translateX, makeChartInfo } from "@/util/defChart";
import { onMounted } from 'vue'

// import { scaleUtc } from 'd3-scale'
// import { select } from 'd3-selection'

const def = v => ({ default() {return v}})

export default {
  name: "TempChart",
  props: {
    width: def(500)
  },
  setup(props) {
    const { height } = makeChartInfo(props)

    const renderChart = () => {
    }

    onMounted(() => {
      renderChart()
    })

    return {
      height,
      translateX
    }
  }
}
</script>

<style scoped>

</style>
