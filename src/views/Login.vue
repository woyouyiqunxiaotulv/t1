<template>
    <div>
        <el-form :rules="rules" 
                v-loading="loading"
                element-loading-text="正在登录。。。"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"  auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input type="text"  auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 250px;margin-right:5px"></el-input>
                <img :src="captchaUrl" @click="updateCaptcha" >
            </el-form-item>
            <el-checkbox v-model="checked" class="loginRemeber">记住我</el-checkbox>
            <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>


    export default{
        name: "Login",
        data(){
            return{
                //验证码接口 确保验证码及时刷新
                captchaUrl:'/captcha?time='+new Date(),
                loginForm:{
                    username:'admin',
                    password:'123',
                    code:''
                },
                loading:false,
                checked:true,
                rules:{
                    // blur:失去焦点触发；message:不填的话的提示信息
                    username:[{required:true,message:'请输入用户名',trigger:'blur'}],
                    password:[{required:true,message:'请输入密码',trigger:'blur'}],
                    code:[{required:true,message:'请输入验证码',trigger:'blur'}]
                }
            }
        },
        methods:{
            updateCaptcha(){
                this.captchaUrl = '/captcha?time='+new Date();
            },
            submitLogin(){
                // validate 表单验证
                this.$refs.loginForm.validate((valid) => {
                    if(valid){
                        this.loading = false;
                        //登录成功后跳转
                        //this.是因为postRequest已经是全局的 不用导入 直接引用
                        this.postRequest('/login',this.loginForm).then(resp =>{
                            //把resp的内容转换为json格式
                            // alert(JSON.stringify(resp));
                            if(resp){
                                const tokenStr = resp.obj.tokenHead+resp.obj.token;
                                //把获取的token存入sessionStorage中便于请求拦截器使用
                                window.sessionStorage.setItem('tokenStr',tokenStr);
                                //跳转到home页面
                                this.$router.replace('/home');
                            }
                        })

                    }else{
                        this.$message.error('错了噢，这是一条错误消息');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle{
        margin: 8px auto 25px auto;
        text-align: center;
    }

    .loginRemeber{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }

    .el-form-item__content{
        display: flex;
        align-items: center;
    }

</style>
