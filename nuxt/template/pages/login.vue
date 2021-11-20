<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">Login</a>
      <span>·</span>
      <a href="/register">Register</a>
    </div>

    <div class="sign-up-container">
      <form ref="userForm" :model="user">

     
          <div class="input-prepend restyle">
            <input type="text" placeholder="Email Or User Name" v-model="user.email"/>
            <i class="iconfont icon-phone" />
          </div>
       

    
          <div class="input-prepend">
            <input type="password" placeholder="Password" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
      

        <div class="btn">
          <input type="button" class="sign-in-button" value="Login" @click="submitLogin()">
        </div>
      </form>
    
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'
  import cookie from 'js-cookie'
   import loginApi from '@/api/login'
import {Message, Select, Option, Cascader} from 'element-ui';
 
  export default {
    layout: 'sign',

    data () {
      return {
        user:{
          email:'',
          password:''
        },
        loginInfo:{},
        test:{}
        
    
      }
    
    },
  
    methods: {
        submitLogin() {
      
        loginApi.submitLoginUser(this.user) 
           .then(response => {
        
             cookie.set('yiedu-user',response.data.data.token,{domain: 'localhost'})
             console.log('yizhou122   ' + cookie.get('yiedu-user'))
         //    this.test = cookie.get(cookie.get('yiedu-user'))
          window.location.href = "/";
        /*       loginApi.getLoginUserInfo()
                .then(response => {
            //      console.log(response.data.data.userInfo)
                  this.loginInfo = response.data.data.userInfo
            //       console.log(this.loginInfo)
                 
                  cookie.set('yiedu-user',this.loginInfo,{domain: 'localhost'})

              
               
                }) */
           })
      },


      checkPhone (rule, value, callback) {
        //debugger
        if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))) {
          return callback(new Error('Email is wrong'))
        }
        return callback()
      }
    }
  }
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;
  }
</style>