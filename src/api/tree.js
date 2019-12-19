import request from '@/utils/request'

export function getTree(query) {
  return request({
    url: '/tree/list',
    method: 'get',
    params: query
  })
}
