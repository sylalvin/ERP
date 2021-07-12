import request from '@/utils/request'

// 查询配件档案列表
export function listAccessories(query) {
  return request({
    url: '/basic/accessories/list',
    method: 'get',
    params: query
  })
}

// 查询配件档案详细
export function getAccessories(fcode) {
  return request({
    url: '/basic/accessories/' + fcode,
    method: 'get'
  })
}

// 新增配件档案
export function addAccessories(data) {
  return request({
    url: '/basic/accessories',
    method: 'post',
    data: data
  })
}

// 修改配件档案
export function updateAccessories(data) {
  return request({
    url: '/basic/accessories',
    method: 'put',
    data: data
  })
}

// 删除配件档案
export function delAccessories(fcode) {
  return request({
    url: '/basic/accessories/' + fcode,
    method: 'delete'
  })
}

// 导出配件档案
export function exportAccessories(query) {
  return request({
    url: '/basic/accessories/export',
    method: 'get',
    params: query
  })
}