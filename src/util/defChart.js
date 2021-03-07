import {computed} from "vue";


const margin = { left: 20, bottom: 20, right: 60, top: 10 },
  translateX = `translate(${margin.left}, ${margin.top})`,
  translateY = chartHeight => `translate(0, ${chartHeight})`

const makeChartInfo = props => {
    const height = computed(() => props.width * .5),
      {left, bottom, right, top} = margin,
      chartWidth = computed(() => props.width - (left + right)),
      chartHeight = computed(() => height.value - (top + bottom))

  return {
    height,
    chartHeight,
    chartWidth
  }
}

export {
  makeChartInfo,
  margin,
  translateX,
  translateY
}
