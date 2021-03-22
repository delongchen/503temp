import { MaxMin } from "@/util/MaxMin";

/**
 *
 * @param {string[]} temps
 */
function parseOne({json: temps}) {
  const MM = new MaxMin()
  const oneTemp = temps.map((tempRaw, index) => {
    const tempStr = tempRaw.split('^', 2),
      time = +tempStr[0],
      temp = +tempStr[1]

    MM.all(temp)
    return [time, temp, index]
  })

  return {
    ...MM.mm(),
    temp: oneTemp
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
    const {max, min, temp} = i
    state.lineData[0] = temp
    MM.min(min)
    MM.max(max)
  }

  state.max = MM.MAX
  state.min = MM.MIN
  state.xLen = Math.max(...(parsed.map(it => it.temp.length)))
}
