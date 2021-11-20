import request from '@/utils/request'

export default {
    
  submitLoginUser(userInfo) {
    return request({
      url: `/eduuser/login`,
      method: 'post',
      data: userInfo
    })
  },


  getLoginUserInfo() {
    return request({
      url: `/eduuser/getuserinfo`,
      method: 'get'
    })
  }

}