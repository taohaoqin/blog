<template>
    <div>
     <div class="btns">
			<el-button size='mini'  @click="toAddUser">添加</el-button>
			<!-- <el-button size='mini' >批量删除</el-button> -->
		</div>
    <div>
     <el-table :data="users" border style="width: 100%">
      <el-table-column prop="id" label="账号" width="180"></el-table-column>
      <el-table-column prop="name" label="昵称" width="180"></el-table-column>
      <el-table-column prop="gender" label="性别" width="60"></el-table-column> 
      <el-table-column prop="email" label="邮箱" width="260"></el-table-column>
      <el-table-column prop="psd" label="密码"></el-table-column>
      <el-table-column prop="permission" label="权限"></el-table-column>
      <el-table-column prop="question" label="密保"></el-table-column>
      <el-table-column prop="answer" label="答案"></el-table-column>
      <el-table-column label="操作" width='70'>
       <template slot-scope='{row}'>
           <i class="fa fa-trash" @click='deleteUser(row,userForm)'></i>
	         <i class="fa fa-pencil" @click='toUpdateUser(row)'></i>
       </template>
     </el-table-column>
   </el-table>
  </div>
<!-- 
   <div class="block">
  <el-pagination
    layout="prev, pager, next"
    :page-size='pageSize'
    :total="total"
    @current-change="paginationClick">
  </el-pagination>
</div> -->
  <el-dialog width='35%'  :visible.sync="visible" :title="title" >
    <el-form  ref="userForm" :rules="rules" :model="userForm" status-icon label-width="80px">
    <el-form-item label="账号" prop="id" >
    <el-input v-model.number="userForm.id" :disabled="disabled"></el-input>
  </el-form-item>      
  <el-form-item label="昵称" prop="name">
    <el-input v-model="userForm.name"></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="gender">
    <el-radio-group v-model="userForm.gender">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
     <el-input v-model="userForm.email"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="psd"  autocomplete="off">
     <el-input v-model="userForm.psd" type="password" autocomplete="off"></el-input>
  </el-form-item>
	<el-form-item label="所属栏目"  prop="permission">
		 <el-select v-model="userForm.permission" placeholder="权限" style="width:100%">
		 <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>
	</el-form-item>
  <el-form-item label="密保问题" prop="question" >
    <el-input v-model="userForm.question"></el-input>
  </el-form-item>
  <el-form-item label="答案" prop="answer" autocomplete="off">
    <el-input v-model="userForm.answer"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button v-if="btn" type="primary" @click="saveUser(userForm)">确定</el-button>
    <el-button v-else type="primary" @click="updateUser(userForm)">确定</el-button>
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
      return{
         options: [{
          value: '用户',
        }, {
          value: '管理员',
        }],
        disabled:false,
        visible: false,
        // total:0,
        // pageSize:2,
        users:[],
        title:"",
        userForm:{
          id:"",
          name:"",
          email:"",
          psd:"",
          permission:"",
          question:"",
          answer:"",
        },
        btn:true,
        rules: {
         name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
         ],
         id: [
          { required: true, type: 'number', message: '请输入账号', trigger: 'blur' },
         ],
         gender: [
          { required: true, message: '请选择性别', trigger: 'blur' },
         ],
         permission: [
          { required: true, message: '请选择权限', trigger: 'blur' },
         ],
         psd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
         ],
         email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
         ],
         question: [
          { required: true, message: '请设置密保问题', trigger: 'blur' },
         ],
         answer: [
          { required: true, message: '请输入密保答案', trigger: 'blur' },
        ],
      } 
    }
    },
    methods:{
      findAllUser(){
        Axios.get("http://localhost:8080/user/findAll").then(result=>{
          this.users=result.data;
        }).catch(err=>{
          console.log(err)
        })
      },
    saveUser(userForm){
      this.$refs.userForm.validate((valid)=>{
				if(valid){      
           Axios.post("http://localhost:8080/user/save",this.userForm).then(({data:result})=>{
             this.$notify({
		          title: '新增成功',
		          message: result.message,
		          type: 'success'
		        });
           this.findAllUser();
         })          
            this.visible= false,
            this.userForm={}
      	 }
			})
    },
    updateUser(userForm){
        this.$refs.userForm.validate((valid)=>{
				if(valid){ 
         Axios.post("http://localhost:8080/user/update?id="+userForm.id,this.userForm).then(({data:result})=>{
            this.$notify({
		          title: '更新成功',
		          message: result.message,
		          type: 'success'
		        });
              this.findAllUser();
            })
            this.visible= false,
            this.disabled = false,
            this.userForm={}
          }
			})
    },
    toAddUser(){
      this.btn=true,
      this.visible= true,
      this.title="新增用户"
    },
    closeDialog(){
      this.visible= false,
      this.disabled = false,
      this.userForm={}
    },
    deleteUser(userForm){
      this.$confirm('此操作将永久删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
       Axios.get("http://localhost:8080/user/deleteById?id="+userForm.id).then(result=>{
        		this.$notify({
		          title: '删除成功',
		          message: result.message,
		          type: 'success'
		        });
		        this.findAllUser();
        	})
        })
     },
     toUpdateUser(row){
       this.btn = false,
       this.visible = true,
       this.title = "更改用户资料",
       this.userForm = row,
       this.disabled = true
     },
    //  paginationClick(){
    //         this.currentPage = arguments[0];
    //   }
  }, 
    created(){
      this.findAllUser();
    }
}
</script>
<style>
.btns {
		margin-bottom: .5em;
	}
  i.fa {
		margin: 0 .4em;
		cursor: pointer;
	}
	i.fa.fa-trash {
		color: #F56C6C;
	}
</style>


