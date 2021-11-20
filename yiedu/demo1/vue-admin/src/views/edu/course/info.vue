<template>
<div class="app-container">
    <h2 style="text-align: center;">Publish New Course</h2>

   <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
  <el-step title="Edit CourseInfo"></el-step>
  <el-step title="Edit Chapter"></el-step>
  <el-step title="Publish"></el-step>
</el-steps>
<el-form label="120px">
    <el-form-item label="Course Title">
        <el-input v-model="courseInfo.title" placeholder="Course Title"></el-input>
    </el-form-item>
    <!-- 下面两个是course的选择器 -->
    
     <el-form-item label="Course Category">
        <el-select v-model="courseInfo.subjectParentId" 
        placeholder="Choose" @change="subjectOnLevelOneChange"
       >
          <el-option 
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

    <el-select v-model="courseInfo.subjectId" 
        placeholder="Level2"
       >
          <el-option 
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
    </el-form-item>



   <!-- 这个是teacher的选择器 -->


    <el-form-item label="Course Teacher">
        <el-select v-model="courseInfo.teacherId" 
        placeholder="Choose"
       >
          <el-option 
            v-for="teacher in teacherList"
            :key="teacher.teacherId"
            :label="teacher.teacherName"
            :value="teacher.teacherId"
          />
        </el-select>
    </el-form-item>
    <el-form-item label="Total Hour">
        <el-input-number v-model="courseInfo.lessonNum" controls-position="right"  :min="0" label="label"/>

    </el-form-item>
   <!--  <el-form-item label="Course Description">
        <el-input v-model="courseInfo.description" placeholder="Course Description"/>
    </el-form-item> -->
    <el-form-item label="Course Description">
        <tinymce :height="300" v-model="courseInfo.description"/>
    </el-form-item>


    <el-form-item label="Cover">
        <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :action="BASE_API + '/oss/upload'"
        class="avatar-uploader">
        <img :src="courseInfo.cover">
        
        </el-upload>
    </el-form-item>





<el-form-item label="Price">
    <el-input-number  :min="0" v-model="courseInfo.price" controls-position="right"/>
</el-form-item>
<el-form-item>
<el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">SaveNext</el-button>
</el-form-item>

</el-form>
</div>
</template>

<script>
import course from '@/api/course'
import subject from '@/api/subject'
import Tinymce from '@/components/Tinymce'
  export default {
    components:{Tinymce},
    data() {
      return {
          saveBtnDisabled:false,
          courseInfo:{
              title:'',
              subjectParentId:'',
              subjectId:'',
              teacherId:'',
              lessonNum:0,
              description:'',
              cover:'/static/arrow.png',
              price:0
          },
          courseId:'', 
          teacherList:[],
          subjectOneList:[],
        subjectTwoList:[],
        BASE_API: process.env.BASE_API

      }
    },
    created(){


    if(this.$route.params && this.$route.params.id){
        this.courseId = this.$route.params.id
        this.getCourseInfoById()
     
      }else{
        
    this.getTeacherList()
    this.getOneSubject()
      }
  

    },

    methods: {
        getCourseInfoById(){
            course.getCourseById(this.courseId)
            .then(response=>{
               this.courseInfo =  response.data.coursevo
                  subject.getSubjectList()
        .then(response=>{
           this.subjectOneList= response.data.list
           for(var i = 0; i < this.subjectOneList.length;i++){
               var oneSubject = this.subjectOneList[i]
               if(this.courseInfo.subjectParentId == oneSubject.id){
                   this.subjectTwoList = oneSubject.children
               }
           }
        })
        
            })
             this.getTeacherList()
        },
        handleAvatarSuccess(res, file){
         this.courseInfo.cover = res.data.url

        },
        beforeAvatarUpload(file){
            const isJpg = file.type ==='image/jpeg'
            const is2M = file.size /1024/1024 <2
            if(!isJpg){
                this.$message('Only support JPG')
            }if(!is2M){
                this.$message('Size should be less than 2M')
            }
            console.log(this.BASE_API + 'oss/upload')
            return isJpg && is2M


        },
        subjectOnLevelOneChange(value){
            this.subjectTwoList = []
           for(var i = 0; i < this.subjectOneList.length;i++){
               var subjectOne = this.subjectOneList[i]
               if(subjectOne.id === value){
                   this.subjectTwoList =subjectOne.children
                   /**
                    * 需要没次选择的时候把courseInfo.subjectId清空，否则会显示上一次
                    * 选择的对象
                    */
                   this.courseInfo.subjectId=''
               }
           }

        },
        getOneSubject(){
            subject.getSubjectList()
            .then(response=>{
               
              this.subjectOneList= response.data.list
            })
        },
        getTeacherList(){
            course.getTeacherList()
            .then(response=>{
               
               this.teacherList= response.data[0]
            })

        },
        saveOrUpdate(){
         if(this.$route.params && this.$route.params.id){
       
          this.$router.push({path:`/course/chapter/${this.courseId}`})
         }else{
           course.addCourseInfo(this.courseInfo)
            .then(response=>{
                var id = response.data[0]
                console.log(id)
                   this.$message({
                       
            type: 'success',
            message: 'Save Completed'
            });
              this.$router.push({path:`/course/chapter/${id}`})
            })
         }
       
         
        },
    }
  }
</script>
<style scoped>
.tinymce-container{
    line-height: 30px;
}
</style>