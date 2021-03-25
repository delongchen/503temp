const baseUrl = 'http://5.cdl.pub:11451'
export const piName = () => ['temp0']

const apis = {
  all: '/all',
  new: '/new'
}

export function fetchOne(name) {
  return fetch(baseUrl + apis.all + `/${name}`)
    .then(result => result.json())
    .then(json => ({ name, json }))
}

export const allData = () => {
  const w = []
  const ps = piName()
    .map(fetchOne)
    .reduce((pre, cur) => {
      return pre
        .then(() => cur)
        .then(data => { w.push(data) })
    }, Promise.resolve())

  return ps.then(() => w)
}
