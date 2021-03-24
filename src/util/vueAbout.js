import { inject } from 'vue'

export function injectN(props=[]) {
  const result = {}

  for (const i of props) {
    result[i] = inject(i)
  }

  return result
}
