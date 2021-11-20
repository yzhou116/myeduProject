<template>
    <div class="app-container">
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item >
    <el-input v-model="teacherquery.name" placeholder="NAME"></el-input>
  </el-form-item>
  <el-form-item >
    <el-select v-model="teacherquery.level" placeholder="Title">
      <el-option  value="1"></el-option>
      <el-option  value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="TIME">
    <el-date-picker v-model="teacherquery.begin" type="datetime" placeholder="PickTime" 
    value-format="yyyy-MM-dd HH:mm:ss"
    default-time="00:00:00"/>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="getList()">Query</el-button>
     <el-button type="default"  @click="reSet()">Reset</el-button>
  </el-form-item>
</el-form>
        <el-table
    
        :data="list"
        element-loading-text="Loading....."
        border
        fit
        highlight-current-row>
        <el-table-column label="ID"
        width="70"
        align="center"
        >
        <template slot-scope="scope">
            {{(page-1)*size + scope.$index+1}}

        </template>
        </el-table-column>
        <el-table-column label="NAME" prop="teacherName" width="80"/>
        <el-table-column label="Title" width="80">
            <template slot-scope="scope">
                {{scope.row.level===1?'Suninor':'Junior'}}
            </template>
        </el-table-column>
        <el-table-column label="Introduction" prop="inTro"></el-table-column>
        <el-table-column label="CreateTime" prop="createTime" width="160"/>
        <el-table-column label="Sort" prop="sort" width="60"/>

        <el-table-column label="Edit" width="200" align="center">
            <template slot-scope="scope">
               
                <router-link :to="'/teacher/edit/'+scope.row.teacherId" >
                <el-button type="primary" size="mini" icon="el-icon-edit">Edit</el-button>
                </router-link>
                
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.teacherId)">Delete</el-button>
            </template>
        </el-table-column>
     
        </el-table>

<el-pagination
  background
  :data="list"
  layout="total,prev, pager, next,jumper"
  :current-page="page"
  :total="1000"
  :page-size="size"
  style="padding: 30px 0; text-align: center;"
  @current-change="getList"
  >
</el-pagination>


    </div>
</template>
<script>
import teacher from '@/api/teacher'
export default {
    //定义变量和初始值
    data(){
        return{
            list: null,
            page:1,
            size: 10,
            total: 0,
            teacherquery: {
            }

        }
    },
    //在创建时引入数据
    created(){
        this.getList()

    },
    //创建具体的方法
    methods:{
        getList(page = 1){
            this.page= page
            teacher.getTeacherList(this.page,this.size,this.teacherquery)
            .then(response=>{
            
                this.list = response.data[0].content

            })
            .catch(error=>{
                console.log(error)
            })
        },
        reSet(){
            this.teacherquery={}

            this.getList()

        },
        removeDataById(id){
        this.$confirm('This will permanently delete the user. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
             teacher.deleteTeacher(id)
           .then(response=>{
                this.$message({
            type: 'success',
            message: 'Delete completed'
            });
               this.getList()

           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
          

        }


    }

    
}
</script>
