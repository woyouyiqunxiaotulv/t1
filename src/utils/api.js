import axios from "axios";
import { Message } from 'element-ui';
import router from '../router'


axios.interceptors.request.use(config =>{
    //如果存在token，请求携带这个token
    if(window.sessionStorage.getItem('tokenStr')){
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr')
    }
    return config;
},error =>{
    console.log(error);
}
)

//axios响应的拦截器（interceptors）
axios.interceptors.response.use(success=>{
    //成功调到后端接口 但是业务逻辑错误（执行了不该执行的操作）
    if(success.status&&success.status == 200){
        //data是后端返回的一个json对象code message object
        if(success.data.code == 500||success.data.code == 401||success.data.code == 403){
            Message.error({message:success.data.message});
            retuen;
        }
        //判断返回的data中的message有没有信息
        if(success.data.message){
            Message.success({message:success.data.message});
        }

    }
    return success.data;
},
    //连接口都访问失败
    error => {
        if(error.response.code == 504||error.response.code == 404){
            Message.error({message:'服务器被吃了！！！'});
        }else if(error.response.code == 403){
            Message.error({message:'权限不足，请联系管理员'});
        }else if(error.response.code == 401){
            Message.error({message:'尚未登录，请登录'});
            //替换页面
            router.replace('/');
        }else{
            if(error.replace.data.message){
                Message.error({message:error.response.data.message});

            }else{
                Message.error({message:'未知错误'});
            }
        }
        return;
    }
)


let base = '';
//传送json格式的一个post请求
export const postRequest = (url,params) => {
    return axios({
        method:'post',
        url:'${base}${url}',
        data:params
    })
}

//传送json的put请求
export const putRequest = (url,params) =>{
    return axios({
        method:'post',
        url:'${base}${url}',
        data:params

    })
}

//传送json的get请求
export const getRequest = (url,params) =>{
    return axios({
        method:'get',
        url:'${base}${url}',
        data:params

    })
}

//传送json的put请求
export const deleteRequest = (url,params) =>{
    return axios({
        method:'delete',
        url:'${base}${url}',
        data:params

    })
}