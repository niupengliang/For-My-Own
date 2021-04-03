/**
 * 通用的ajax函数
 * created by 阿威 2020-08-24
 */

// 引入axios 和 qs
import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'; // 引入Message弹框组件

// 引入本地存储
import local from '@/utils/local'

// 默认请求api
axios.defaults.baseURL = 'http://172.16.17.254:5000'

// 请求拦截器
axios.interceptors.request.use(config => {
    let token = local.get('t_k') || ''

    if (token) {
        config.headers.Authorization = token;
    }

    return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
    // 拦截响应数据 统一处理
    if (response.data.hasOwnProperty('code') && response.data.hasOwnProperty('msg')) {
        let { code, msg } = response.data; // 取出code和msg
        if (code === 0) {  // 如果code等于0 统一弹出成功提示框
            Message({
                type: 'success',
                message: msg
            })
        } else if (code === 1) { // 如果等于1 统一弹出失败提示框
            Message.error(msg)
        }
    }

    return response;
})

// 通用的get请求 和 post请求
const req = {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            }).then(response => {
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, Qs.stringify(params)).then(response => {
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

// 暴露请求对象
export default req;
