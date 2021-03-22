<template>
  <p>{{ mo }}</p>
  <svg
    :width="width"
    :height="height"
    v-show="lineData.length"
    @mousemove="handle"
  >
    <g :transform="translateX" id="g">
      <g id="xAxis" :transform="`translate(0, ${chartHeight})`"></g>
      <g id="yAxis"></g>
      <data-path
        v-for="(v, k) in lineData"
        :key="`line-${k}`"
        :x="xScale"
        :y="yScale"
        :line-data="v"
      />
    </g>
  </svg>
</template>

<script>
/* vue about */
import {reactive, toRefs, computed, watchEffect} from 'vue'
/* this package */
import {translateX, makeChartInfo} from "@/util/defChart";
import {parseTempData} from "@/util/temp";
import {allTempData} from '@/api'

import DataPath from "@/components/TempChart/DataPath";
/* d3 about */
import {scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {select} from 'd3-selection'

const def = v => ({default: () => v})

export default {
  name: "TempChart",
  components: {DataPath},
  props: {
    width: def(500)
  },
  setup(props) {
    const {height, chartHeight} = makeChartInfo(props),
      state = reactive({
        lineData: [],
        max: 40,
        min: -10,
        xLen: 500
      }),
      mo = reactive({
        x: 0,
        y: 0
      })

    const xScale = computed(() => scaleLinear()
      .domain([0, state.xLen])
      .range([0, props.width])
    )

    const yScale = computed(() => {
      return scaleLinear()
        .domain([state.min - 1, state.max + 1])
        .range([chartHeight.value, 0])
      }
    )

    const xAxisGenerator = computed(() => axisBottom(xScale.value))
    const yAxisGenerator = computed(() => axisLeft(yScale.value))

    const renderAxis = () => {
      select('#xAxis').call(xAxisGenerator.value)
      select('#yAxis').call(yAxisGenerator.value)
    }

    const renderChart = () => {
      renderAxis()
    }

    const sleep = t => new Promise(resolve => {setTimeout(resolve, t)})
    const loop = async () => {
      const w = await allTempData()
      parseTempData(w, state)
      await sleep(60000)
    }
    (async () => { for (;;) await loop() })()

    watchEffect(() => {
      renderChart()
    })

    const handle = (ev) => {
      mo.x = ev.x
      mo.y = ev.y
    }

    return {
      ...toRefs(state),
      height,
      translateX,
      chartHeight,
      xScale,
      yScale,
      handle,
      mo
    }
  }
}
</script>

<style scoped>

</style>
