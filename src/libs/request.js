import axios from 'axios';
import Qs from 'qs';
import router from '../router';

axios.defaults.baseURL = window.hkConfig.baseUrl;
axios.defaults.withCredentials = true;
// 全局拦截器
const service = axios.create({
    withCredentials: true // 请求时带上cookie
    // timeout: 5000
});
// 添加请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前
        // 判断参数类型如果是FormData就不格式化
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data;boundary=' + new Date().getTime();
        }else{
            config.data = Qs.stringify(config.data);
        }
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
        console.log(response)
        // 响应数据
        if (response.status === 200) {
            if (response.data.code === 0) {
                return response.data;
            } else if (response.data.code === 1) {
                window.vue.$message.error(response.data.msg);
                return Promise.reject(response);
            }
        } else {
            return Promise.reject();
        }
    },
    error => {
        // 响应错误
        // console.log(error)
        if (error.toString().indexOf('Request failed with status code 401') !== -1) {
            // window.vue.$message.error('请重新登录！');
            // router.push('/login');
            window.vue.$confirm('登录超时，需要重新登录，是否立即跳转登录页?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                router.push('/login');
            }).catch(() => {
                window.vue.$message({
                    type: 'info',
                    message: '请及时重新登录'
                });
            });
        } else if (error.toString().indexOf('Request failed with status code 403') !== -1) {
            window.vue.$message.error('没有访问权限');
        } else {
            window.vue.$message.error('请求服务器时出错\n' + error);
        }
        return Promise.reject(error);
    }
);

export default service;
