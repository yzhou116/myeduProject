import request from '@/utils/request'
export default{
    addCourseInfo(courseInfo){
        return request({
           url: `/course/addcourse`,
            method: 'post',
            data: courseInfo
          })
    },
    getTeacherList(){
        return request({
           url: `/teacher/list`,
            method: 'get',
        
          })
    },
    getCourseById(id){
      return request({
         url: `/course/getbackcourseinfo/${id}`,
          method: 'get',
      
        })
  },
  getPublishCourseInfo(id){
    return request({
       url: `/course/publishcourse/${id}`,
        method: 'get'
      })
},
getFinalPublish(id){
  return request({
     url: `/course/finalpublish/${id}`,
      method: 'post'
    })
},
getCourseList(page,size, coursequery){
  return request({
     url: `/course/listcourse/${page}/${size}`,
      method: 'post',
      data: coursequery
    })
},
deleteCourse(id){
  return request({
      url:`course/delete/${id}`,
      method: 'delete'
  })
}

  
}