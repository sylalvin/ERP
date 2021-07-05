import request from '@/utils/request'

// 查询入库列表
export function listStockin(query) {
  return request({
    url: '/purchase/stockin/list',
    method: 'get',
    params: query
  })
}

// 查询入库详细
export function getStockin(keyid) {
  return request({
    url: '/purchase/stockin/' + keyid,
    method: 'get'
  })
}

// 新增入库
export function addStockin(data) {
  return request({
    url: '/purchase/stockin',
    method: 'post',
    data: data
  })
}

// 修改入库
export function updateStockin(data) {
  return request({
    url: '/purchase/stockin',
    method: 'put',
    data: data
  })
}

// 删除入库
export function delStockin(keyid) {
  return request({
    url: '/purchase/stockin/' + keyid,
    method: 'delete'
  })
}

// 导出入库
export function exportStockin(query) {
  return request({
    url: '/purchase/stockin/export',
    method: 'get',
    params: query
  })
}