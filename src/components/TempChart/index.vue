<template>
  <svg
    :width="width"
    :height="height"
    v-show="lines.length"
  >
    <g :transform="translateX" id="g">
      <g id="xAxis" :transform="`translate(0, ${chartHeight})`"></g>
      <g id="yAxis"></g>
      <data-path
        v-for="(v, k) in lines"
        :key="`line-${k}`"
        :line-data="v"
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
import { parseTempData } from "@/util/temp";
import { allData } from "@/api";

import DataPath from "@/components/TempChart/DataPath";
/* d3 about */
import {scaleLinear, scaleTime} from 'd3-scale'
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
        lines: [],
        max: 40,
        min: -10,
        xLen: 500,
        startTime: 0
      })

    const xScale = computed(() => scaleTime()
      .domain([Date.now(), state.startTime])
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

    allData().then(w => {
      parseTempData(w, state)
    })

    watchEffect(renderAxis)

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
