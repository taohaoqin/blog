<template>
 <div>
     <div class="btns">
	   <el-button size='mini'  @click="toAddPerson">添加</el-button>
	</div>
    <div>
     <el-table :data="person" border style="width: 100%">
         <el-table-column prop="id" label="序号" width="50"></el-table-column>
         <el-table-column prop="user_id" label="用户账号" width="130"></el-table-column>
         <el-table-column prop="name" label="姓名"  width="100"></el-table-column>
         <el-table-column prop="birth" label="出生日期" width="200"></el-table-column> 
         <el-table-column prop="age" label="年龄" width="60"></el-table-column>
         <el-table-column prop="xingzuo" label="星座" width="100"></el-table-column>
         <el-table-column prop="hobby" label="爱好"></el-table-column>
         <el-table-column prop="place" label="地区"></el-table-column>
         <el-table-column prop="motto" label="个性签名" width="600"></el-table-column>
         <el-table-column label="操作" width='70'>
         <template slot-scope='{row}'>
          <i class="fa fa-trash" @click='deletePerson(row,personForm)'></i>
	       <i class="fa fa-pencil" @click='toUpdatePerson(row)'></i>
         </template>
     </el-table-column>
   </el-table>
  </div>
  <el-dialog width='35%'  :visible.sync="visible" :title="title" >
    <el-form  ref="personForm" :rules="rules" :model="personForm" status-icon label-width="80px">
    <el-form-item label="账号" prop="user_id" >
    <el-input v-model.number="personForm.user_id" :disabled="disabled"></el-input>
  </el-form-item>      
  <el-form-item label="真实姓名" prop="name">
    <el-input v-model="personForm.name"></el-input>
  </el-form-item>
  <el-form-item label="出生日期" prop="birth" >
    <div class="block">
    <el-date-picker
      v-model="personForm.birth"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
     <el-input v-model="personForm.age"></el-input>
  </el-form-item>
  <el-form-item label="星座" prop="xingzuo" >
     <el-select v-model="personForm.xingzuo" placeholder="星座" style="width:100%">
	    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
	  </el-select>
  </el-form-item>
  <el-form-item label="爱好" prop="hobby" >
    <el-input v-model="personForm.hobby"></el-input>
  </el-form-item>
  <el-form-item label="地区" prop="place" >
    <el-input v-model="personForm.place"></el-input>
  </el-form-item>
  <el-form-item label="座右铭" prop="motto" >
    <el-input v-model="personForm.motto"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button v-if="btn" type="primary" @click="savePerson(personForm)">确定</el-button>
    <el-button v-else type="primary" @click="updatePerson(personForm)">确定</el-button>
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
            options: [{
               value: '白羊座',
            }, {
               value: '金牛座',
            }, {
               value: '双子座',
            }, {
               value: '巨蟹座',
            }, {
               value: '狮子座',
            }, {
               value: '处女座',
            }, {
               value: '天秤座',
            }, {
               value: '天蝎座',
            }, {
               value: '射手座',
            }, {
               value: '魔蝎座',
            }, {
               value: '水平座',
            }, {
               value: '双鱼座',
            }],
            person:[],
            btn:true,
            disabled:false,
            visible: false,
            title:"",
            personForm:{
              user_id:"",
              name:"",
              birth:"",
              age:"",
              hobby:"",
              place:"",
              motto:"",
              xingzuo:""
           },
           rules: {
             user_id: [
              { required: true, type: 'number', message: '请输入存在的用户账号', trigger: 'blur' },
              ],
            } 
        }
    },
    methods:{
        findAllPerson(){
        Axios.get("http://localhost:8080/person/findAll").then(result=>{
          this.person=result.data;
        }).catch(err=>{
          console.log(err)
        })
      },
      //user_id存在的才能添加
      savePerson(personForm){
         this.$refs.personForm.validate((valid)=>{
			if(valid){ 
            Axios.post("http://localhost:8080/person/save",this.personForm).then(({data:result})=>{
               this.$notify({
		          title: '新增成功',
		          message: result.message,
		          type: 'success'
		        });
              this.findAllPerson();
              })   
              this.visible= false,
              this.personForm={}
            }
			})
      },
      deletePerson(personForm){
         Axios.get("http://localhost:8080/person/deleteById?id="+personForm.id).then(result=>{
        		this.$notify({
		          title: '删除成功',
		          message: result.message,
		          type: 'success'
		      });
		      this.findAllPerson();
        	})
      },
      updatePerson(personForm){
         Axios.post("http://localhost:8080/person/update?id="+personForm.id,this.personForm).then(({data:result})=>{
            this.$notify({
		          title: '更新成功',
		          message: result.message,
		          type: 'success'
		      });
            this.findAllPerson();
            })
            this.visible= false,
            this.disabled = false,
            this.personForm={}    
      },
      toUpdatePerson(row){
          this.btn = false,
          this.visible = true,
          this.title = "更改个人资料",
          this.personForm = row,
          this.disabled = true
      },
      toAddPerson(){
         this.btn=true,
         this.visible= true,
         this.title="新增用户信息"
      },
      closeDialog(){
      this.visible= false,
      this.disabled = false,
      this.personForm={}
    },
   },
    created(){
        this.findAllPerson()
    }
}
</script>
