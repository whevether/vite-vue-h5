/* cSpell:disable */

import { defineFakeRoute } from "vite-plugin-fake-server/client"
import { faker } from '@faker-js/faker';
const count = 1000
const createListData = () => {
  return {
    id: faker.string.uuid,
    timestamp: faker.date.birthdate(),
    LastEditTime: faker.date.birthdate(),
    updateTime: faker.date.birthdate(),
    author: faker.internet.userName,
    title: faker.finance.accountName(),
    content: faker.word.words(),
    type: faker.number.int({min:0, max: 6}),
    image: faker.image.urlPicsumPhotos(),
    importance: faker.number.int({min: 1,max: 1000}),
    money: faker.number.float({min: 1, max: 1000}).toFixed(2)
  }
}
const List = faker.helpers.multiple(createListData,{
  count: 1000
})
// 获取列表
export default defineFakeRoute({
  url: '/api/list',
  type: 'get',
  timeout: 0,
  response: ({ query }: any) => {
    const { importance, type, title, page = 1, pageSize = 20, sort } = query
    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })
    if (sort === '-id') {
      mockList = mockList.reverse()
    }
    const pageList = mockList.filter(
      (item, index) => index < pageSize * page && index >= pageSize * (page - 1)
    )
    return {
      code: 200,
      success: true,
      data: { result: pageList, total: mockList.length }
    }
  }
})