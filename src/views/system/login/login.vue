<template>
    <div class="login-wrap">
        <img src="@/assets/img/1.png" class="tc animated up">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="userPhone">
                    <el-input v-model="param.userPhone" placeholder="手机号" autocomplete="off"
                              prefix-icon="el-icon-user">

                    </el-input>
                </el-form-item>
                <el-form-item prop="userPassword">
                    <el-input
                            class="iInput"
                            type="password"
                            prefix-icon="el-icon-lock"
                            autocomplete="off"
                            placeholder="密码"
                            v-model="param.userPassword"
                            @keyup.enter.native="submitForm()"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox style="color: white" v-model="param.isPwd">记住密码</el-checkbox>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data: function () {
        return {
            param: {
                userPhone: '',
                userPassword: '',
                isPwd: false
            },
            rules: {
                userPhone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                userPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    created: function () {
        // if (this.hk.data('isPwd')) {
        //     this.param.userPhone = this.hk.data('userPhone');
        //     this.param.userPassword = this.hk.data('userPassword');
        //     this.param.isPwd = this.hk.data('isPwd');
        // }
        const remember = this.hk.data('remember')['13296619668'];
        if (remember != null) {
            this.param = remember;
        }
    },
    methods: {
        ...mapActions('d2admin/account', [
            'login'
        ]),
        submitForm () {
            const that = this;
            this.$refs.login.validate((valid) => {
                if (valid) {
                    that.login(that.param);
                    // 发送 POST 请求
                    // this.axios.post('/public/login', that.param)
                    //     .then(function(r) {
                    //         if(r.code === 0) {
                    //             if (that.param.isPwd) {
                    //                 that.hk.data('remember',{
                    //                     key:that.param.userPhone,
                    //                     value : that.param
                    //                 });
                    //             } else {
                    //                 that.hk.data('remember',{
                    //                     key:that.param.userPhone,
                    //                     remove: true
                    //                 });
                    //             }
                    //             for(let menu of r.data){
                    //                 menu.icon = menu.menuIco;
                    //                 menu.index = menu.menuPath===''||menu.menuPath ==null?that.hk.getUuid():menu.menuPath;
                    //                 menu.title = menu.menuTitle;
                    //             }
                    //             console.log(r.data)
                    //             // 存用户菜单
                    //             that.hk.data('menu',{
                    //                 'key':that.param.userPhone,
                    //                 'value':that.hk.toTreeData(r.data,{
                    //                             id: 'menuCode', // id字段名
                    //                             parendId: 'menuSuperiorCode', // 父级id字段名
                    //                             name: 'title', // 名称的字段名
                    //                             rootId: '' // 顶层节点父级id
                    //                     })
                    //             });
                    //             // 设置当前登录用户
                    //             that.hk.data('activeUser',that.param)
                    //             that.$router.push('/home');
                    //         }
                    //         if (r.code === 1) {
                    //             that.$message.error(r.msg);
                    //         }
                    //     }).catch(function(e) {
                    //     console.log(e);
                    // });
                }
            });

            // this.$refs.login.validate(valid => {
            //     if (valid) {
            //         this.$message.success('登录成功');
            //         localStorage.setItem('ms_userPhone', this.param.userPhone);
            //         this.$router.push('/');
            //     } else {
            //         this.$message.error('请输入账号和密码');
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        }
    }
};
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../../assets/img/20.png);
        background-size: 100% 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        right: 10%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .tc {
        position: absolute;
        left: 10%;
        top: 50%;
        margin-top: -300px;
        width: 700px;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    /******** 图片动画效果 start ********/
    .animated {
        animation-duration: 10s; /*动画时间*/
        animation-fill-mode: both; /*播放后的状态*/
    }

    .animated {
        animation-iteration-count: infinite; /*动作循环的次数：infinite 无限循环*/
    }

    .animated {
        animation-duration: 15s; /*动画时间*/
    }

    .up {
        animation-name: upAnimation; /*动画的名称*/
        transform-origin: center bottom; /*设置动画旋转元素的基点为*/
        cursor: pointer;
    }

    @keyframes upAnimation {
        0%,
        80% {
            transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
            transform: translate3d(0, 0, 0);
        }
        40%,
        43% {
            transition-timing-function: cubic-bezier(0.755, 0.50, 0.855, 0.060);
            transform: translate3d(5px, -30px, 0);
        }
        70% {
            transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -15px, 0);
        }
        90% {
            transform: translate3d(0, -4px, 0);
        }
    }

    /******** 图片动画效果 end ********/
</style>
