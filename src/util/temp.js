import { MaxMin } from "@/util/MaxMin";

/**
 *
 * @param {string[]} temps
 */
function parseOne({json: temps}) {
  const MM = new MaxMin()
  const oneTemp = temps.map((tempRaw) => {
    const tempStr = tempRaw.split('^', 2),
      time = +tempStr[0],
      temp = +tempStr[1]

    MM.all(temp)
    return [time, temp]
  })

  return {
    ...MM.mm(),
    temp: oneTemp,
    startTime: oneTemp[oneTemp.length - 1][0]
  }
}

/**
 *
 * @param {Array<string[]>} data
 * @param state
 */
export function parseTempData(data, state) {
  const parsed = data.map(parseOne)
  const MM = new MaxMin()

  for (const i of parsed) {
    const {max, min, temp, startTime} = i
    state.lines.push(temp)
    MM.min(min)
    MM.max(max)
    console.log(startTime)
    state.startTime = startTime
  }

  state.max = MM.MAX
  state.min = MM.MIN
  state.xLen = Math.max(...(parsed.map(it => it.temp.length)))
}
