import axios from 'axios';
import Qs from 'qs';
import router from '../router';

axios.defaults.baseURL = window.hkConfig.baseUrl;
axios.defaults.withCredentials = true;
//全局拦截器
const service = axios.create({
    withCredentials:true, // 请求时带上cookie
    // timeout: 5000
});
// 添加请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前
        config.data = Qs.stringify(config.data);
        return config;
    },
    error => {
        // 请求错误
        return Promise.reject(error);
    }
);
// 添加响应拦截器
service.interceptors.response.use(
    response => {
        // 响应数据
        if (response.status === 200) {
            if(response.data.code === 0){
                return response.data;
            }else if(response.data.code === 1){
                window.vue.$message.error("获取数据失败\n"+ response.data.msg);
                return Promise.reject(response);
            }
        }else {
            return Promise.reject();
        }
    },
    error => {
        // 响应错误
        // console.log(error)
        if(error.toString().indexOf('Request failed with status code 401') !== -1){
            window.vue.$message.error("请重新登录！");
            router.push('/login');
        }else if(error.toString().indexOf('Request failed with status code 403') !== -1){
            window.vue.$message.error("没有访问权限");
        }else{
            window.vue.$message.error("请求服务器时出错\n"+error);
        }
        return Promise.reject(error);
    }
);

export default service;
