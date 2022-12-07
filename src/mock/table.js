const Mock = require('mockjs')

const count = 100
let tableList = []

for (let i = 0; i < count; i++) {
  tableList.push(
    Mock.mock({
      id: Mock.mock('@increment(1)'),
      name: Mock.Random.cname(),
      'age|12-99': 1,
      sex: Mock.Random.integer(0, 1),
      brith: Mock.Random.date('MM-dd'),
      addr: Mock.mock('@county(true)')
    })
  )
}

export const getUserTable = () => {
  return tableList
}
