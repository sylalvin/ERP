import request from '@/utils/request'

// 查询客户档案列表
export function listCustomer(query) {
  return request({
    url: '/basic/customer/list',
    method: 'get',
    params: query
  })
}

// 查询客户档案详细
export function getCustomer(fcode) {
  return request({
    url: '/basic/customer/' + fcode,
    method: 'get'
  })
}

// 新增客户档案
export function addCustomer(data) {
  return request({
    url: '/basic/customer',
    method: 'post',
    data: data
  })
}

// 修改客户档案
export function updateCustomer(data) {
  return request({
    url: '/basic/customer',
    method: 'put',
    data: data
  })
}

// 删除客户档案
export function delCustomer(fcode) {
  return request({
    url: '/basic/customer/' + fcode,
    method: 'delete'
  })
}

// 导出客户档案
export function exportCustomer(query) {
  return request({
    url: '/basic/customer/export',
    method: 'get',
    params: query
  })
}