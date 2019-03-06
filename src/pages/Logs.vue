<template>
    <div>
        <!-- <div class="btns">
			<el-button size='mini' @click="toAddLog">添加</el-button>
		</div> -->
        <div>
        <el-table :data="logs" border style="width: 100%" >
          <el-table-column prop="user_id" label="用户账号" width="100"></el-table-column>
          <el-table-column prop="title" label="标题" width="100"></el-table-column>
          <el-table-column prop="content" label="内容"  show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="time" label="发布时间"></el-table-column> -->
          <el-table-column label="操作" width='80'>
          <template slot-scope='{row}'>
             <!-- <i class="fa fa-trash" @click='deleteLog(row,logForm)'></i> -->
	         <!-- <i class="fa fa-pencil" @click='toUpdateLog(row)'></i> -->
             <el-button size='mini' type="danger" @click='toUpdateLog(row)'>查看</el-button>
          </template>
          </el-table-column>
        </el-table>
        </div>

  <el-dialog width='100%' fullscreen :visible.sync="visible" :title="title" >
    <el-form  ref="logForm"  :model="logForm" status-icon label-width="80px">
    <el-form-item label="账号" prop="user_id" >
    <el-input v-model.number="logForm.user_id" ></el-input>
  </el-form-item>      
  <el-form-item label="标题" prop="title">
    <el-input v-model="logForm.title"></el-input>
  </el-form-item>
  <el-form-item label="内容">
	<el-input
	  type="textarea"
	  :rows="12"
	  placeholder="请输入内容"
	  v-model="logForm.content">
	</el-input>
 </el-form-item>
 <el-form-item label="发布时间" prop="time">
    <el-date-picker
      v-model="logForm.time"
      type="datetime"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="最后更新" prop="uptime">
    <el-date-picker
      v-model="logForm.uptime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </el-form-item>
  <el-form-item> 
    <el-button type="primary" @click="saveLog(logForm)">确定</el-button>
    <el-button @click="closeDialog">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog> 
</div>
</template>
<script>
import Axios from 'axios'
export default {
    data(){
        return {
            logs:[],
            visible: false,
            title:"",
            logForm:{
              user_id:"",
              title:"",
              content:"",
              time:"",
              uptime:""
            }       
        }
    },
    methods:{
        findAllLog(){
        Axios.get("http://localhost:8080/logs/findAll").then(result=>{
          this.logs=result.data;
        }).catch(err=>{
          console.log(err)
        })
      },
      saveLog(logForm){
          Axios.post("http://localhost:8080/logs/update?id="+logForm.id,this.logForm).then(({data:result})=>{
              this.findAllLog();
            })
             this.visible= false
      },
        toUpdateLog(row){
            this.visible=true,
            this.title="文章详情",
            this.logForm = row
            // this.logForm.uptime= Date.now()
            //获取当前时间      
      },
      closeDialog(){
          this.visible=false

      }
    },
    created(){
        this.findAllLog()
    }
}
</script>

