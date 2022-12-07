import request from '@/untils/request'

export function getUserTable() {
  return request({
    url: '/table/getUserTable',
    method: 'get'
  })
}
