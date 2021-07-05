import request from '@/utils/request'

// 查询业务字典列表
export function listDict(query) {
  return request({
    url: '/system/businessDict/list',
    method: 'get',
    params: query
  })
}

// 查询业务字典详细
export function getDict(fid) {
  return request({
    url: '/system/businessDict/' + fid,
    method: 'get'
  })
}

// 新增业务字典
export function addDict(data) {
  return request({
    url: '/system/businessDict',
    method: 'post',
    data: data
  })
}

// 修改业务字典
export function updateDict(data) {
  return request({
    url: '/system/businessDict',
    method: 'put',
    data: data
  })
}

// 删除业务字典
export function delDict(fid) {
  return request({
    url: '/system/businessDict/' + fid,
    method: 'delete'
  })
}

// 导出业务字典
export function exportDict(query) {
  return request({
    url: '/system/businessDict/export',
    method: 'get',
    params: query
  })
}