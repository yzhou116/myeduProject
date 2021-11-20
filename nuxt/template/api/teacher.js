import request from '@/utils/request'

export default {
    //查询前两条banner数据
  getListteacher(page,size) {
    return request({
      url: `/teacher/listteacherbypage/${page}/${size}`,
      method: 'get'
    })
  },
  getteacherandcourse(teacherId) {
    return request({
      url: `/teacher/frontteacher/${teacherId}`,
      method: 'get'
    })
  }
}