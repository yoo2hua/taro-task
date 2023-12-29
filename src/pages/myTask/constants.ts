import enummapping from 'enummapping'

export const myTaskTypeEnum = enummapping({
  undertaken: { code: 0, label: '我承接的' },
  published: { code: 1, label: '我发布的' },
})

export const sortEnum = enummapping({
  time: { code: 0, label: '时间排序' },
  point: { code: 1, label: '积分排序' },
})

