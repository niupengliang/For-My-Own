/**
 * 所有店铺模块相关请求
 */
// 引入工具函数
import req from '@/utils/request'

// 获取店铺详情
export const getShopInfo = () => {
    return req.get('/shop/info',)
}

// 保存店铺修改
export const editShop = (params) => {
    return req.post('/shop/edit', params)
}