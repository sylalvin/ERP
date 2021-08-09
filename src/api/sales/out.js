import request from '@/utils/request'

// 查询出仓单列表
export function listOut(query) {
  return request({
    url: '/sales/plan/list',
    method: 'get',
    params: query
  })
}

// 查询出仓单详细
export function getOut(keyid) {
  return request({
    url: '/sales/plan/' + keyid,
    method: 'get'
  })
}

// 新增出仓单
export function addOut(data) {
  return request({
    url: '/sales/plan',
    method: 'post',
    data: data
  })
}

// 修改出仓单
export function updateOut(data) {
  return request({
    url: '/sales/plan',
    method: 'put',
    data: data
  })
}

// 删除出仓单
export function delOut(keyid) {
  return request({
    url: '/sales/plan/' + keyid,
    method: 'delete'
  })
}

// 导出出仓单
export function exportOut(query) {
  return request({
    url: '/sales/plan/export',
    method: 'get',
    params: query
  })
}