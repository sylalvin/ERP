import request from '@/utils/request'

// 新建订单时，获取订单单据号
export function getBill(query) {
  return request({
    url: '/system/sequence/new',
    method: 'get',
    params: query
  })
}