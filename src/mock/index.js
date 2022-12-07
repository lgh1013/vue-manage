import { login, getInfo, logout } from '@/mock/user'
import { getUserTable } from './table'
const Mock = require('mockjs')

Mock.setup({
  timeout: '200-600'
})

Mock.mock(/\/user\/login/, 'post', login)
Mock.mock(/\/user\/getInfo/, 'get', getInfo)
Mock.mock(/\/user\/logout/, 'post', logout)
Mock.mock(/\/table\/getUserTable/, 'get', getUserTable)
