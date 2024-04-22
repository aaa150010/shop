import axios from 'axios'
import {ElMessage} from "element-plus";
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // baseURL: "http://ceshi13.dishait.cn"
    timeout:5000,
    baseURL: "/api"
})

// request拦截器
service.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['token'] = token
    }
    return config
}, error => {
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    if (res.data.code!==200){
        ElMessage({
            message: res.data.message,
            type: 'warning',
        })
    }
        return res.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default service;