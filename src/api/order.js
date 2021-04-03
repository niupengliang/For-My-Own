/**
 * 所有订单模块相关请求
 */
// 引入工具函数
import req from '@/utils/request'

// 获取订单列表
export const getOrderList = (params) => {
    return req.get('/order/list', params)
}

// 获取订单详情
export const getOrderDetail = (params) => {
    return req.get('/order/detail', params)
}

// 获取首页报表数据
export const getOrderData = () => {
    return req.get('/order/totaldata',)
}

// 获取订单报表数据
export const getOrderTotal = (params) => {
    return req.get('/order/ordertotal', params)
}