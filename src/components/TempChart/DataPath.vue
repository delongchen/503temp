<template>
  <path
    :d="d"
    class="data-line"
    @mousemove="move"
    @mouseleave="mouseAddr.show = false"
    @mouseenter="mouseAddr.show = true"
  />
  <circle r="4" :cx="last.cx" :cy="last.cy" fill="red"/>
  <text
    :x="mouseAddr.x"
    :y="mouseAddr.y"
    v-show="mouseAddr.show"
  >{{ mouseAddr }}
  </text>
</template>

<script>
import {computed, ref, reactive} from 'vue'
import {line} from 'd3-shape'
import {injectN} from "@/util/vueAbout";

const def = v => ({default: () => v})

export default {
  name: "DataPath",
  props: {
    lineData: def([]),
  },
  setup(props) {
    const paths = ref([]),
      cyl = ref(60),
      {x, y} = injectN(['x', 'y']),
      mouseAddr = reactive({
        x: 0,
        y: 0,
        show: false
      })

    const dataToShow = computed(() => {
      return new Array(Math.floor(props.lineData.length / cyl.value))
        .fill(null)
        .map((_, index) => props.lineData[index * cyl.value])
    })

    const d = computed(() => {
      return (line()
          .x(d => x.value(d[0]))
          .y(d => y.value(d[1]))
      )(dataToShow.value)
    })

    const path = computed(() => {
      return paths.value.join('')
    })

    const last = computed(() => {
      const p = props.lineData[0]
      return {
        cx: x.value(p[0]),
        cy: y.value(p[1])
      }
    })

    function move(ev) {
      console.log(ev)
      mouseAddr.x = ev.x
      mouseAddr.y = ev.y
    }

    return {
      d,
      dataToShow,
      path,
      last,
      move,
      mouseAddr,
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
