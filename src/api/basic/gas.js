import request from '@/utils/request'

// 查询气体档案列表
export function listGas(query) {
  return request({
    url: '/basic/gas/list',
    method: 'get',
    params: query
  })
}

// 查询气体档案详细
export function getGas(fcode) {
  return request({
    url: '/basic/gas/' + fcode,
    method: 'get'
  })
}

// 新增气体档案
export function addGas(data) {
  return request({
    url: '/basic/gas',
    method: 'post',
    data: data
  })
}

// 修改气体档案
export function updateGas(data) {
  return request({
    url: '/basic/gas',
    method: 'put',
    data: data
  })
}

// 删除气体档案
export function delGas(fcode) {
  return request({
    url: '/basic/gas/' + fcode,
    method: 'delete'
  })
}

// 导出气体档案
export function exportGas(query) {
  return request({
    url: '/basic/gas/export',
    method: 'get',
    params: query
  })
}