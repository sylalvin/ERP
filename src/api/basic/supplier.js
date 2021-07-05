import request from '@/utils/request'

// 查询供应商列表
export function listSupplier(query) {
  return request({
    url: '/basic/supplier/list',
    method: 'get',
    params: query
  })
}

// 查询供应商详细
export function getSupplier(fcode) {
  return request({
    url: '/basic/supplier/' + fcode,
    method: 'get'
  })
}

// 新增供应商
export function addSupplier(data) {
  return request({
    url: '/basic/supplier',
    method: 'post',
    data: data
  })
}

// 修改供应商
export function updateSupplier(data) {
  return request({
    url: '/basic/supplier',
    method: 'put',
    data: data
  })
}

// 删除供应商
export function delSupplier(fcode) {
  return request({
    url: '/basic/supplier/' + fcode,
    method: 'delete'
  })
}

// 导出供应商
export function exportSupplier(query) {
  return request({
    url: '/basic/supplier/export',
    method: 'get',
    params: query
  })
}