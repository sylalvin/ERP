import request from '@/utils/request'

// 查询采购列表
export function listOrder(query) {
  return request({
    url: '/purchase/order/list',
    method: 'get',
    params: query
  })
}

// 查询采购详细
export function getOrder(keyid) {
  return request({
    url: '/purchase/order/' + keyid,
    method: 'get'
  })
}

// 新增采购
export function addOrder(data) {
  return request({
    url: '/purchase/order',
    method: 'post',
    data: data
  })
}

// 修改采购
export function updateOrder(data) {
  return request({
    url: '/purchase/order',
    method: 'put',
    data: data
  })
}

// 删除采购
export function delOrder(keyid) {
  return request({
    url: '/purchase/order/' + keyid,
    method: 'delete'
  })
}

// 导出采购
export function exportOrder(query) {
  return request({
    url: '/purchase/order/export',
    method: 'get',
    params: query
  })
}