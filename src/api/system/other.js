import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

// 获取车辆列表
export function listVehicle(query) {
  return request({
    url: '/system/vehicle/list',
    method: 'get',
    params: query
  })
}
