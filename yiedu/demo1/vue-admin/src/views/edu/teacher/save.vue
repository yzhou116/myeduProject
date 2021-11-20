<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="Name">
                <el-input v-model="teacher.teacherName"></el-input>
            </el-form-item>
            <el-form-item label="Sort">
              <el-input-number v-model="teacher.sort" controls-position="right" :min="1" />
            </el-form-item>
            <el-form-item label="Level">
                <el-select v-model="teacher.level" placeholder="Choose">
                  <el-option label="Level1" :value="1"/>
                  <el-option label="Level2" :value="2"/>
                  <el-option label="Level3" :value="3"/>
                  <el-option label="Level4" :value="4"/>
                  <el-option label="Level5" :value="5"/>
                </el-select>
            </el-form-item>
            <el-form-item label="Experience">
                <el-input v-model="teacher.job" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="Introduction">
                <el-input v-model="teacher.inTro" :rows="10" type="textarea" placeholder=""></el-input>
            </el-form-item>

            <el-form-item label="Picture">
                <pan-thumb :image="teacher.avatar"/>
                <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">Upload

                </el-button>
                <image-cropper
                   v-show="imagecropperShow"
                   :width="300"
                   :height="300"
                   :key="imagecropperKey"
                   :url="BASE_API+'/oss/upload'"
                   field="file"
                   @close="close"
                   @crop-upload-success="cropSuccess"/>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="saveUpdate()">Save</el-button>
            </el-form-item>
        </el-form>
      <!--   :disabled="saveBtnDisable"  -->

    </div>
</template>
<script>
import teacher from '@/api/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
         components: {ImageCropper, PanThumb},
    data(){
   
        return{
            teacher:{},
         imagecropperShow:false,
         imagecropperKey: 0,
         BASE_API: process.env.BASE_API,
          imageUrl: ''
        }
       
     /*    saveBtnDisable :false */
    },
    created(){
      this.init()

    },
    watch:{
        $route(to,from){
            //当路由发生变化，这个方法就会执行
       this.init()
        }

    },
    methods:{

       close(){
           this.imagecropperShow=false
           this.imagecropperKey= this.imagecropperKey+1
       },
       cropSuccess(data){
           console.log(data)
           this.teacher.avatar = data.url
              this.imagecropperShow=false
               this.imagecropperKey= this.imagecropperKey+1
       },
        init(){
        console.log(this.$route.params.teacherId)
        if(this.$route.params.teacherId){
            const id = this.$route.params.teacherId
            this.getInfo(id)
        }else{
            this.teacher = {}
        }
        },
        getInfo(id){
            teacher.getTeacherInfo(id)
            .then(response=>{
                this.teacher = response.data[0]
                
            })

        },
        saveUpdate(){
            if(this.$route.params.teacherId){
                this.updateInfo()
            }else{
                this.saveTeacher()
            }
        },
        updateInfo(){
            teacher.updateTeacher(this.$route.params.teacherId, this.teacher)
            .then(response=>{
                     this.$message({
            type: 'success',
            message: 'Update completed'
          
            });
              console.log(this.$route.params.teacherId)
              console.log(teacher)

            this.$router.push({path:'/teacher/table'})
            })

        },

        saveTeacher(){
            teacher.addTeacher(this.teacher)
            .then(response=>{
                     this.$message({
            type: 'success',
            message: 'Save completed'
            });
            this.$router.push({path:'/teacher/table'})
            })

        }

    }
}

</script>