<template>
  <svg
    :width="width"
    :height="height"
    v-show="lineData.length"
  >
    <g :transform="translateX" id="g">
      <g id="xAxis" :transform="`translate(0, ${chartHeight})`"></g>
      <g id="yAxis"></g>
      <data-path
        v-for="(v, k) in lineData"
        :key="`line-${k}`"
        :line-name="v"
      />
    </g>
  </svg>
</template>

<script>
/* vue about */
import {
  reactive,
  toRefs,
  computed,
  watchEffect,
  provide,
  readonly
} from 'vue'
/* this package */
import {translateX, makeChartInfo} from "@/util/defChart";

import DataPath from "@/components/TempChart/DataPath";
/* d3 about */
import {scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {select} from 'd3-selection'

const def = v => ({default: () => v})

export default {
  name: "TempChart",
  components: { DataPath },
  props: {
    width: def(500)
  },
  setup(props) {
    const {height, chartHeight} = makeChartInfo(props),
      state = reactive({
        lineData: ['a'],
        max: 40,
        min: -10,
        xLen: 500
      })

    const xScale = computed(() => scaleLinear()
      .domain([0, state.xLen])
      .range([0, props.width])
    )

    const yScale = computed(() => scaleLinear()
        .domain([state.min - 1, state.max + 1])
        .range([chartHeight.value, 0])
    )

    provide('x', readonly(xScale))
    provide('y', readonly(yScale))

    const xAxisGenerator = computed(() => axisBottom(xScale.value))
    const yAxisGenerator = computed(() => axisLeft(yScale.value))

    const renderAxis = () => {
      select('#xAxis').call(xAxisGenerator.value)
      select('#yAxis').call(yAxisGenerator.value)
    }

    const renderChart = () => {
      renderAxis()
    }

    watchEffect(() => {
      renderChart()
    })

    return {
      ...toRefs(state),
      height,
      translateX,
      chartHeight,
    }
  }
}
</script>

<style scoped>

</style>
