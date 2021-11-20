import request from '@/utils/request'

export default{
    savesubject(subject){
        return request({
           url: `/subject/addsubject`,
            method: 'post',
            data: subject
          })
    },
    getSubjectList(){
        return request({
           url: `/subject/subjectlist`,
            method: 'get'
          })
    },
}