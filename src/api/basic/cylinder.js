import request from '@/utils/request'

// 查询钢瓶档案列表
export function listCylinder(query) {
  return request({
    url: '/basic/cylinder/list',
    method: 'get',
    params: query
  })
}

// 查询钢瓶档案详细
export function getCylinder(fcode) {
  return request({
    url: '/basic/cylinder/' + fcode,
    method: 'get'
  })
}

// 新增钢瓶档案
export function addCylinder(data) {
  return request({
    url: '/basic/cylinder',
    method: 'post',
    data: data
  })
}

// 修改钢瓶档案
export function updateCylinder(data) {
  return request({
    url: '/basic/cylinder',
    method: 'put',
    data: data
  })
}

// 删除钢瓶档案
export function delCylinder(fcode) {
  return request({
    url: '/basic/cylinder/' + fcode,
    method: 'delete'
  })
}

// 导出钢瓶档案
export function exportCylinder(query) {
  return request({
    url: '/basic/cylinder/export',
    method: 'get',
    params: query
  })
}