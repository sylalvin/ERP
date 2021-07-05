import request from '@/utils/request'

// 查询供应商采购价列表
export function listPrice(query) {
  return request({
    url: '/basic/supplierPrice/list',
    method: 'get',
    params: query
  })
}

// 查询供应商采购价详细
export function getPrice(fid) {
  return request({
    url: '/basic/supplierPrice/' + fid,
    method: 'get'
  })
}

// 新增供应商采购价
export function addPrice(data) {
  return request({
    url: '/basic/supplierPrice',
    method: 'post',
    data: data
  })
}

// 修改供应商采购价
export function updatePrice(data) {
  return request({
    url: '/basic/supplierPrice',
    method: 'put',
    data: data
  })
}

// 删除供应商采购价
export function delPrice(fid) {
  return request({
    url: '/basic/supplierPrice/' + fid,
    method: 'delete'
  })
}

// 导出供应商采购价
export function exportPrice(query) {
  return request({
    url: '/basic/supplierPrice/export',
    method: 'get',
    params: query
  })
}