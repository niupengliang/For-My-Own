/**
 * 所有商品模块相关请求
 */
// 引入工具函数
import req from '@/utils/request'

// 获取商品分类列表
export const getCateList = (params) => {
    return req.get('/goods/catelist', params)
}

// 修改分类
export const editCate = (params) => {
    return req.post('/goods/editcate', params)
}

// 添加商品
export const addGoods = (params) => {
    return req.post('/goods/add', params)
}

// 查询所有分类名称
export const getCateNames = () => {
    return req.get('/goods/categories')
}



