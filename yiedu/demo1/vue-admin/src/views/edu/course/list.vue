<template>
    <div class="app-container">
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item >
    <el-input v-model="coursequery.title" placeholder="CourseName"></el-input>
  </el-form-item>
  <!-- <el-form-item >
    <el-input v-model="coursequery.status" placeholder="CourseStatus"></el-input>
  </el-form-item> -->

  <el-form-item >
    <el-select v-model="coursequery.status" placeholder="CourseStatus">
      <el-option  value="Normal" label="Publish"></el-option>
      <el-option  value="Draft" label="Not Publish"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="TIME">
    <el-date-picker v-model="coursequery.begin" type="datetime" placeholder="PickTime" 
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
        <el-table-column label="TITLE" prop="title" width="300"/>
        <el-table-column label="PUBLISH" width="100">
            <template slot-scope="scope">
                {{scope.row.status==='Normal'?'Publish':'Not Publish'}}
            </template>
        </el-table-column>
        <el-table-column label="Price" prop="price" width="150"></el-table-column>
            <el-table-column label="ViewCount" prop="price" width="150"></el-table-column>
        <el-table-column label="CreateTime" prop="createTime" width="200"/>
        <el-table-column label="Version" prop="version" width="80"/>

        <el-table-column label="Edit" width="200" align="center">
            <template slot-scope="scope">
               
                <!-- 迟点再去改吧，一个破course也不知道要不要去修改
                主要是值要穿给3个不同的页面很麻烦
                    <router-link :to="'/course/edit/'+scope.row.id" >
                <el-button type="primary" size="mini" icon="el-icon-edit">Edit</el-button>
                </router-link> -->
                
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">Delete</el-button>
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
import course from '@/api/course'
export default {
    //定义变量和初始值
    data(){
        return{
            list: null,
            page:1,
            size: 10,
            total: 0,
            coursequery: {
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
            course.getCourseList(this.page,this.size,this.coursequery)
            .then(response=>{
            
                this.list = response.data.list.content
                console.log(this.list)

            })
            .catch(error=>{
                console.log(error)
            })
        },
        reSet(){
            this.coursequery={}

            this.getList()

        },
      removeDataById(id){
        this.$confirm('This will permanently delete the course. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
            console.log(id)
            course.deleteCourse(id)
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
