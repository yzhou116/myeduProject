<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">All teacher</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">All</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="mytotal==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">There is no data, I am loading it...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="mytotal>0" class="i-teacher-list">
            <ul class="of">
              <li v-for="teacher in data" :key="teacher.teacherId">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+teacher.teacherId" :title="teacher.teacherName" target="_blank">
                      <img :src="teacher.avatar" :alt="teacher.teacherName">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+teacher.teacherId" :title="teacher.teacherName" target="_blank" class="fsize18 c-666">{{teacher.teacherName}}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{teacher.inTro}}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{teacher.job}}</p>
                  </div>
                </section>
              </li>
              
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <!-- 公共分页 开始 -->
      <div>
        <div class="paging">
          <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
          <a
            :class="{undisable: !hasPrevious}"
            href="#"
            title="首页"
            @click.prevent="gotoPage(1)">First</a>

          <a
            :class="{undisable: !hasPrevious}"
            href="#"
            title="前一页"
            @click.prevent="gotoPage(current-1)">&lt;</a>

          <a
            v-for="page in pages"
            :key="page"
            :class="{current: current == page, undisable: current == page}"
            :title="'第'+page+'页'"
            href="#"
            @click.prevent="gotoPage(page)">{{ page }}</a>

          <a id="next"
         :class="{undisable: !hasNext}"
            href="#"
            title="后一页"
            @click.prevent="gotoPage(current+1)">&gt;</a>

          <a id="last"
            :class="{undisable: !hasNext}"
            href="#"
            title="末页"
            @click.prevent="gotoPage(pages)">Last</a>
         
            

          <div class="clear"/>
        </div>
      </div>
      <!-- 公共分页 结束 -->
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
 import teacher from '@/api/teacher'
export default {
  data(){
    return{
      mytotal:0,
      current:0,
      hasNext: false,
      hasPrevious:false,
      pages:0,
      size:0,
      move:[]

    }

  },
   asyncData({ params, error }) {
    return teacher.getListteacher(1,8).then(response => {
          //this.data = response.data.data
         
          return { data: response.data.data.item.content}
       })
  },

  created(){
    this.showAlltracher()
   

  },
  methods:{
      gotoPage(page) {
      teacher.getListteacher(page,8)
        .then(response => {
          this.data = response.data.data.item.content
           this.mytotal = response.data.data.total
        this.current = response.data.data.current
        this.hasNext = response.data.data.hasNext
        this.hasPrevious = response.data.data.hasPrevious
        this.pages = response.data.data.page
        this.size = response.data.data.size
        console.log(this.hasNext)
        if(this.hasNext===false){
         document.getElementById('next').href="javascript:void(0)"
         console.log(document.getElementById('next'))
          document.getElementById('last').href="javascript:void(0)"
              console.log(document.getElementById('last'))
         
        }

       //   console.log(this.data)
          
        })
    },
    showAlltracher(){
          teacher.getListteacher(1,8)
          .then(response =>{

         this.data = response.data.data.item.content
        // console.log(this.data)
        this.mytotal = response.data.data.total
        this.current = response.data.data.current
        this.hasNext = response.data.data.hasNext
        this.hasPrevious = response.data.data.hasPrevious
        this.pages = response.data.data.page
        this.size = response.data.data.size
      //  this.move = response.data.data
        
      console.log(this.hasNext)
       console.log(this.current)
        console.log(this.hasPrevious)
         console.log(this.hasNext)
          console.log(this.pages)
           console.log(this.size)
        
     //   console.log(this.mytotal)
         
          })
    }

  }
};
</script>