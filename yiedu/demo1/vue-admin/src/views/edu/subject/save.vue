<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="Name">
                <el-input v-model="subject.title"></el-input>
            </el-form-item>
            <el-form-item label="Sort">
              <el-input-number v-model="subject.sort" controls-position="right" :min="1" />
            </el-form-item>
            <el-form-item label="Level">
                <el-select v-model="subject.id" placeholder="Choose">
                  <el-option label="Level1" :value="1"/>
                  <el-option label="Level2" :value="2"/>
                
                </el-select>
            </el-form-item>
            <el-form-item label="Parent">
                <el-input v-model="subject.parentId" placeholder=""></el-input>
            </el-form-item>

   

            <el-form-item>
                <el-button type="primary" @click="saveUpdate()">Save</el-button>
            </el-form-item>
        </el-form>
      <!--   :disabled="saveBtnDisable"  -->

    </div>
</template>
<script>
import subject from '@/api/subject'

export default {
       
    data(){
   
        return{
            subject:{},
          
      
        }
       
     /*    saveBtnDisable :false */
    },
    created(){
    

    },
    watch:{
       

    },
    methods:{
         saveUpdate(){
          /*   if(this.$route.params.teacherId){
                this.updateInfo()
            }else{
                
            }  */
            this.saveSubject()
        },
            saveSubject(){
            subject.savesubject(this.subject)
            .then(response=>{
                     this.$message({
            type: 'success',
            message: 'Save completed'
            });
            this.$router.push({path:'/subject/list'})
          /*   this.$router.push({path:'/teacher/table'}) */
            })

        }


    }
}

</script>