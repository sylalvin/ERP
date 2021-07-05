import request from '@/utils/request'

// 查询业务字典数值列表
export function listItem(query) {
  return request({
    url: '/system/businessDictItem/list',
    method: 'get',
    params: query
  })
}

// 查询业务字典数值详细
export function getItem(fid) {
  return request({
    url: '/system/businessDictItem/' + fid,
    method: 'get'
  })
}

// 新增业务字典数值
export function addItem(data) {
  return request({
    url: '/system/businessDictItem',
    method: 'post',
    data: data
  })
}

// 修改业务字典数值
export function updateItem(data) {
  return request({
    url: '/system/businessDictItem',
    method: 'put',
    data: data
  })
}

// 删除业务字典数值
export function delItem(fid) {
  return request({
    url: '/system/businessDictItem/' + fid,
    method: 'delete'
  })
}

// 导出业务字典数值
export function exportItem(query) {
  return request({
    url: '/system/businessDictItem/export',
    method: 'get',
    params: query
  })
}