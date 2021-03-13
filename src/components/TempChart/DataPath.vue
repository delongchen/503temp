<template>
  <path
    :d="d"
    :style="{
      fill: 'none',
    }"
    class="data-line"
  />
  <g @mouseover="pointsHandler">
    <g
      v-for="(v, k) in dataToShow"
      :key="`p-${k}`"
      :transform="`translate(${x(v[2])}, ${y(v[1])})`"
      class="data-point"
    >
      <circle
        r="4"
        :id="`pc-${k}`"
      />
      <text :dx="0" :dy="5" v-show="ifShow(v[2])">{{ v }}</text>
    </g>
  </g>
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
    lineData: def([]),
    cyl: def(30)
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

    const pcId = ref(0)
    const ifShow = id => pcId.value === id

    function pointsHandler(ev) {
      const target = ev.target
      const t_id = target.id.split('-')
      const t = t_id[0]
      if (t === 'pc') pcId.value = +t_id[1]
      console.log(t_id)
    }

    return {
      d,
      dataToShow,
      pointsHandler,
      pcId,
      ifShow
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
}
</style>
