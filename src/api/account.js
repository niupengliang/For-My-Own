/**
 * 所有账号功能模块相关请求
 */
// 引入工具函数
import req from '@/utils/request'

// 登录
export const checkLogin = (params) => {
    return req.post('/users/checkLogin', params)
}

// 添加账号
export const addAcc = (params) => {
    return req.post('/users/add', params)
}

// 获取账号列表
export const getAccList = (params) => {
    return req.get('/users/list', params)
}

// 删除账号
export const delAcc = (params) => {
    return req.get('/users/del', params)
}

// 批量删除账号
export const batchDel = (params) => {
    return req.get('/users/batchdel', params)
}

// 修改账号
export const editAcc = (params) => {
    return req.post('/users/edit', params)
}

// 验证旧密码
export const validateOldPwd = (params) => {
    return req.get('/users/checkoldpwd', params)
}

// 修改密码
export const editPwd = (params) => {
    return req.post('/users/editpwd', params)
}

// 获取个人信息数据
export const getInfo = () => {
    return req.get('/users/info')
}

// 修改头像
export const editAvatar = (params) => {
    return req.get('/users/avataredit', params)
}