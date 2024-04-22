<template>
  <div class="f-header">
      <el-icon size="25" class="mr-2" style="margin-left: 20px"><eleme-filled class="logo"/></el-icon>
      超市管理系统
    <div class="ml-auto flex">
      <!-- <el-icon size="20" class="icon-btn" @click="handleBell"><bell /></el-icon> -->
      <el-dropdown class="dropdown" @command="handleCommand">
          <span class="flex items-center">
            <el-avatar :size="25"  class="mr-2"></el-avatar>
            {{nickName}}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="resetPassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

</template>
<script setup>
import {onMounted, ref} from "vue";
import {getUserInfo} from "@/api/user";
const nickName=ref()
onMounted(()=>{
  getUserInfo({}).then(res=>{
    // console.log(res)
    if (res.code==200){
      nickName.value=res.result.nickname
    }
  })
})
</script>
<style>
.f-header {
  @apply fixed top-0 left-0 right-0 z-60 bg-indigo-700 text-light-50 flex items-center shadow;
  height: 64px;
}
.logo{
  width: 250px;
  @apply flex justify-center items-center font-sans text-xl font-thin text-indigo-100;
}
.f-header .icon-btn{
  @apply flex justify-center items-center;
  height: 64px;
  width: 42px;
  cursor: pointer;
}
.f-header .icon-btn:hover{
  @apply bg-indigo-600;
}
.f-header .dropdown{
  height: 64px;
  @apply flex justify-center items-center text-indigo-50 mx-5;
  cursor: pointer;
}
</style>