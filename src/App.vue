<template>
  <div>
   <div class="header">
      <div class="title">个人博客</div>
   </div>
   <div class="center">
     <div class="left-nav">
       <el-col :span="24"> 
    <el-menu
      router :default-active="$route.path" 
      class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item-group>     
          <el-menu-item index="/user">用户</el-menu-item>
          <el-menu-item index="/person">个人资料</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/logs">
        <i class="el-icon-menu"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="3" >
        <i class="el-icon-document"></i>
        <span slot="title">留言</span>
      </el-menu-item>
    </el-menu>
  </el-col>
     </div>
     <div class="content">
        <div class="wrapper">
          <router-view></router-view>
        </div>
      </div>
   </div>
  </div>
</template>
<script>
export default {

  
}
</script>

<style>
 body, ul ,ol,dl ,p, h1,h2,h3 {
    margin: 0;
    padding: 0
  }
  .header {
    position: absolute;
    top:0;
    width: 100%;
    height: 150px;
    background-image: url(./assets/login-bg.jpg);   
     
  }
  .header .title {
    color: #ffffff;
    line-height: 150px;
    font-size: 25px;
    margin-left: 40px;
  }
  .center {
    position: absolute;
    top: 150px;
    bottom: 0;
    width: 100%;
  }
  .center > .left-nav {
    width: 201px;
    height: 100%;
    float: left;
    background-color: #e6e6e6
    
  }
  .center > .content {
    margin-left: 150px;
    height: 98%;
    background-color: #f0f0f0;
    padding: 1em 1em 0 1em;
    overflow-y: auto;
  }
  .center > .content > .wrapper {
    width: 100%;
    height: 98%;
    background-color: #ffffff;
    border-radius: 5px;
    padding: .5em;
    overflow-y: auto;
  }
</style>
