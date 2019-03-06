<template>
    <div>
        <router-link to="/home">首页</router-link>
       
	<div class="login">
		<h2>登录页面</h2>
		 <el-form :model="form" label-position='left' size='small'>
		    <el-form-item label="账号" label-width="100px">
		      <el-input v-model="form.id" ></el-input>
		    </el-form-item>
		    <el-form-item label="密码" label-width="100px">
		      <el-input v-model="form.psd" type="password"></el-input>
		    </el-form-item>
		  </el-form>
			<el-button  @click='login'>登录</el-button>
	</div>

    </div>
</template>
<script>
import Axios from 'axios'
export default {
    data(){
        return {
        form:{

            },
            logins:[]
        }
    },
    methods:{
			find(){
			 Axios.get("http://localhost:8080/user/findAll").then(result=>{
        //   console.log(this.logins)

                //  console.log(result.data)
           this.logins=result.data.map(item=>{
            //   console.log(item.id)
              return {
                  username:item.id,
                  pwd:item.psd
              }
              
              
          });
        //   console.log(this.logins)
        }).catch();
				

				
        },
        login(){
            console.log(this.logins)
            var arr = []
            var a = {username:123456789,pwd:"123456789"};
            
            arr.push(a)
            JSON.stringify(arr)
            // "[{"name":"Alex"},{"name":"Tom"}]"
        //  var aaa = this.logins.indexOf()
          
        //  console.log([1,2,3].indexOf(2))
        }
    },
        created(){
            this.find()
}
}
</script>
<style>
	.login {
        position: relative;
        top:200px;
		width: 400px;
		margin: 0 auto;
        /* background-color: #e6e6e6 */
        
	}
</style>

