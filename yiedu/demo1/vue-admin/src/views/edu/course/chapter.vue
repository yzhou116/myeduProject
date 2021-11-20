<template>
<div class="app-container">
    <h2 style="text-align: center;">Publish New Course</h2>

   <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
  <el-step title="Edit CourseInfo"></el-step>
  <el-step title="Edit Chapter"></el-step>
  <el-step title="Publish"></el-step>
</el-steps>
<el-button type="text" @click="openChapterDialog()">Add Chapter</el-button>

 <ul class="chanpterList">
        <li
            v-for="chapter in chapterVideoList"
            :key="chapter.id">
            <p>
                {{ chapter.title }}

                <span class="acts">
                    <el-button style="" type="text" @click="openVideo(chapter.id)">Add Video</el-button>
                    <el-button style="" type="text" @click="openEditChatper(chapter.id)">Edit</el-button>
                    <el-button type="text" @click="removeChapter(chapter.id)">Delete</el-button>
                </span>
            </p>

            <!-- Video -->
            <ul class="chanpterList videoList">
                <li
                    v-for="video in chapter.children"
                    :key="video.id">
                    <p>{{ video.title }}

                <span class="acts">
                    
                    <el-button style="" type="text" @click="openupdateVideo(video.id)">Edit</el-button>
                    <el-button type="text" @click="removeVideo(video.id)">Delete</el-button>
                </span>
                    </p>
                </li>
            </ul>
        </li>
    </ul>

      <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
        <el-form :model="chapter" label-width="120px">
            <el-form-item label="Chapter Title">
                <el-input v-model="chapter.title"/>
            </el-form-item>
            <el-form-item label="Chapter Sort">
                <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChapterFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="saveOrUpdate()">Submit</el-button>
        </div>
    </el-dialog>


    <el-dialog :visible.sync="dialogVideoFormVisible" title="Add Video">
  <el-form :model="video" label-width="120px">
    <el-form-item label="Video Title">
      <el-input v-model="video.title"/>
    </el-form-item>
    <el-form-item label="Video Sort">
      <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
    </el-form-item>
    <el-form-item label="Open Source">
      <el-radio-group v-model="video.isFree">
        <el-radio :label="true">Private</el-radio>
        <el-radio :label="false">Public</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Upload Video">
      <!-- TODO -->
            <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/videoupload/uploadtoali'"
            :limit="1"
            class="upload-demo">
        <el-button size="small" type="primary">Upload Video</el-button>
        <el-tooltip placement="right-end">
            <div slot="content">Max Size 1G，<br>
                Support 3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM </div>
            <i class="el-icon-question"/>
        </el-tooltip>
        </el-upload>



    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVideoFormVisible = false">Cancel</el-button>
    <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">Submit</el-button>
  </div>
</el-dialog>
<el-form label-width="120px">

    <el-form-item>
        <el-button   @click="previous()">Pre step</el-button>
       <el-button :disabled="saveBtnDisabled" type="primary"  @click="next()">Next step</el-button>
    </el-form-item>
</el-form>
</div>
</template>
<script>
import chapter from '@/api/chapter'
import video from '@/api/video'
  export default {
    data() {
      return {
        saveVideoBtnDisabled:false,
          saveBtnDisabled:false,
          courseId:'',
          chapterVideoList:[],
          dialogChapterFormVisible:false,
          dialogVideoFormVisible:false,
          chapter:{
             title: '',
             sort: 0
          },
            video: {
                title: '',
                sort: 0,
                isFree: 0,
                videoSourceId: '',
                videoOriginalName:''
            },
            fileList: [],
            BASE_API: process.env.BASE_API 
   
      }
    },
    created(){
      //这个this.$route.params && this.$route.params.id可以拿到路由里面的id值从而在前端代码中取到
      if(this.$route.params && this.$route.params.id){
        this.courseId = this.$route.params.id
        console.log(this.courseId)
            this.getChapterVideo()
      }
   
    },

    methods: {
       handleVodRemove() {
            //调用接口的删除视频的方法
            video.deleteAliyunvod(this.video.videoSourceId)
                .then(response => {
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: 'Delete Successful!'
                    });
                    //把文件列表清空
                    this.fileList = []
                    //把video视频id和视频名称值清空
                    //上传视频id赋值
                    this.video.videoSourceId = ''
                    //上传视频名称赋值
                    this.video.videoOriginalName = ''
                })
        },
         beforeVodRemove(file,fileList) {
            return this.$confirm(`Do you want to delete ${ file.name }？`);
        },
        handleVodUploadSuccess(response, file, fileList) {
            //upload video then get videoId
            this.video.videoSourceId = response.data.videoId
            
            this.video.videoOriginalName = file.name
        },
         handleUploadExceed() {
            this.$message.warning('Please remove the first video')
        },

      removeVideo(videoId){
        video.deleteVideo(videoId)
        .then(response=>{
          this.$message({
                        type: 'success',
                        message: 'Delete!'
                    });
                    this.getChapterVideo()
        })
      },


      removeChapter(chapterId){
   this.$confirm('Do you want to delete it?', 'Message', {
                confirmButtonText: 'Submit',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {  
                chapter.deleteChapter(chapterId)
                    .then(response =>{
                   
                    this.$message({
                        type: 'success',
                        message: 'Delete!'
                    });
                 
                    this.getChapterVideo()
                })
            }) 
      },

      saveOrUpdateVideo(){
        if(!video.id){
         this.addVideo()
        }else{
          this.updateVideo()

        }
      },
      openVideo(chapterId){
          this.dialogVideoFormVisible = true,
          this.video.chapterId = chapterId

      },
      addVideo(){
      video.addVideo(this.video,this.courseId)
        .then(response=>{
          this.dialogVideoFormVisible = false
            this.$message({
            type: 'success',
            message: 'Save Video Completed'
            });
            this.video={}
              this.fileList = []
            this.getChapterVideo()
        })
      },
      openEditChatper(chapterId){
        this.dialogChapterFormVisible= true
        chapter.getChapter(chapterId)
        .then(response=>{
         this.chapter = response.data.chapter
        })

      },
      addChapter(){
         chapter.addChapter(this.chapter, this.courseId)
        .then(response=>{
          this.dialogChapterFormVisible = false
            this.$message({
            type: 'success',
            message: 'Save Chapter Completed'
            });
            this.getChapterVideo()
        })
      },
      openupdateVideo(videoId){
        this.dialogVideoFormVisible = true
        video.getVideo(videoId)
        .then(response=>{
          this.video = response.data.video
        })
      },
      updateVideo(){
        video.updateVideo(this.video,this.video.id)
        .then(response=>{
            this.dialogVideoFormVisible = false
            this.$message({
            type: 'success',
            message: 'Update Video Completed'
            });
            this.getChapterVideo()
        })
      },



      updateChapter(){
        this.courseId = this.$route.params.id
    chapter.updateChapter(this.chapter,this.courseId)
    .then(response=>{
        this.dialogChapterFormVisible = false
            this.$message({
            type: 'success',
            message: 'Update Chapter Completed'
            });
            this.getChapterVideo()
    })

    
      },

      saveOrUpdate(){
        if(!this.chapter.id){
          this.addChapter()
        }else{
          this.updateChapter()
        }
      },



      getChapterVideo(){
        chapter.getChapterVideo(this.courseId )
        .then(response=>{
        this.chapterVideoList = response.data.list
        })

      },
      openChapterDialog(){
        this.dialogChapterFormVisible = true
        this.chapter.title = ''
        this.chapter.sort = 0
      },



        next(){
            this.$router.push({path:'/course/publish/'+ this.courseId})
        },
          previous(){
             this.$router.push({path:'/course/info/'+ this.courseId})

        }
    
    }
  }
</script>
<style scoped>
.chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
/*   float: left; */
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
   /*  float: right; */
    font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
/*   float: left; */
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>