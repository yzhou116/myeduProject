import request from '@/utils/request'

export default {

  getCourseList(page,size,searchObj) {
    return request({
      url: `/course/listcoursefront/${page}/${size}`,
      method: 'post',
      data: searchObj
    })
  },

  getAllSubject() {
    return request({
      url: '/subject/subjectlist',
      method: 'get'
    })
  },

  getCourseInfo(id) {
    return request({
      url: '/eduservice/coursefront/getFrontCourseInfo/'+id,
      method: 'get'
    })
  }
}
