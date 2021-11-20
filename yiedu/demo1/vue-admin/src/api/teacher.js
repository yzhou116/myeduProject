import request from '@/utils/request'


export default{
    getTeacherList(page,size, teacherquery){
        return request({
           url: `/teacher/listByCondition/${page}/${size}`,
            method: 'post',
            data: teacherquery
          })
    },
    deleteTeacher(id){
        return request({
            url:`teacher/delete/${id}`,
            method: 'delete'
        })
    },
    addTeacher(teacher){
        return request({
            url:`teacher/addteacher`,
            method: 'post',
            data: teacher
        })
    },
    getTeacherInfo(id){
        return request({
            url:`teacher/getteacher/${id}`,
            method: 'get'
        })
    },
    updateTeacher(id,teacher){
        return request({
            url:`teacher/updateteacher/${id}`,
            method: 'post',
            data: teacher
        })
    }

}
