import request from '@/utils/request'

export default{
    addVideo(video,courseId){
        return request({
            url:`video/addvideo/${courseId}`,
            method: 'post',
            data: video
        })
    },
    deleteVideo(id){
        return request({
            url:`video/delete/${id}`,
            method: 'delete',
           
        })
    },
    getVideo(videoId){
        return request({
           url: `/video/getvideo/${videoId}`,
            method: 'get'
          })
    },
    updateVideo(eduVideo,videoId){
        return request({
           url: `/video/update/${videoId}`,
            method: 'post',
            data:eduVideo
          })
    },
    deleteAliyunvod(id) {
        return request({
            url: `/videoupload/removeAlyVideo/${id}`,
            method: 'delete'
          })
    }
 
}