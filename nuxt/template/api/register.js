import request from '@/utils/request'

export default {
   
  sendCode(email,nickname) {
    return request({
      url: `/eduuser/emailcode/${email}/${nickname}`,
      method: 'get'
    })
  },
  registerMember(formItem) {
    return request({
      url: `/eduuser/register`,
      method: 'post',
      data: formItem
    })
  }

}