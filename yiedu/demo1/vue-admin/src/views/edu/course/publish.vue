<template>

  <div class="app-container">

    <h2 style="text-align: center;">Publish New Course</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="Edit CourseInfo"/>
      <el-step title="Edit Chapter"/>
      <el-step title="Publish"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="publishCourse.cover">
      <div class="main">
        <h2>{{ publishCourse.title }}</h2>
        <p class="gray"><span>共{{ publishCourse.lessonNum }}Class</span></p>
        <p><span>Category{{ publishCourse.subjectLevelOne }} — {{ publishCourse.subjectLevelTwo }}</span></p>
        <p>Teacher:{{ publishCourse.teacherName }}</p>
        <h3 class="red">${{ publishCourse.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">Pre</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">Submit</el-button>
    </div>
  </div>
</template>
<script>
import course from '@/api/course'
  export default {
    data() {
      return {
          saveBtnDisabled:false,
          courseId:'',
          publishCourse:{}
   
      }
    },
    created(){
    if(this.$route.params && this.$route.params.id){
     this.courseId = this.$route.params.id
      this.getcoursePublishId()
 
    }  
    
    },

    methods: {
      getcoursePublishId(){
  course.getPublishCourseInfo(this.courseId)
  .then(response=>{
   this.publishCourse =  response.data.course

  })

      },
        publish() {
      course.getFinalPublish(this.courseId)
        .then(response => {
        
          this.$message({
              type: 'success',
              message: 'Published!'
          });

          this.$router.push({ path: '/course/list' })
        })
      
    },
        previous(){
             this.$router.push({path:'/course/chapter/'+ this.courseId})

        }
    
    }
  }
</script>
<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>