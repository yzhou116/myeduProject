import request from '@/utils/request'


export default{
    getChapterVideo(courseId){
        return request({
           url: `/chapter/getchaptervideo/${courseId}`,
            method: 'get'
          })
    },
    addChapter(eduChapter, courseId){
        return request({
           url: `/chapter/addchapter/${courseId}`,
            method: 'post',
            data: eduChapter
          })
    },
    getChapter(chapterId){
        return request({
           url: `/chapter/getchapter/${chapterId}`,
            method: 'get'
          })
    },
    updateChapter(eduChapter,courseId){
        return request({
           url: `/chapter/updatechapter/${courseId}`,
            method: 'post',
            data:eduChapter
          })
    },
    deleteChapter(chapterId){
        return request({
           url: `/chapter/delete/${chapterId}`,
            method: 'delete',
         
          })
    },
}