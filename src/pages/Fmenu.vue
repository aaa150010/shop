<template>
  <div style="width: 250px">
    <el-menu
        :default-active="defaultActive"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-menu-item index="/index/user" @click="$router.push('/index/user')" v-if="nickName=='管理员'">
        <el-icon><setting /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/index/supplier" @click="$router.push('/index/supplier')">
        <el-icon><setting /></el-icon>
        <span>供应商管理</span>
      </el-menu-item>
      <el-menu-item index="/index/staff" @click="$router.push('/index/staff')" v-if="nickName=='管理员'">
        <el-icon><setting /></el-icon>
        <span>员工信息管理</span>
      </el-menu-item>
      <el-menu-item index="/index/type" @click="$router.push('/index/type')">
        <el-icon><setting /></el-icon>
        <span>商品类型管理</span>
      </el-menu-item>
      <el-menu-item index="/index/commodity" @click="$router.push('/index/commodity')">
        <el-icon><setting /></el-icon>
        <span>商品管理</span>
      </el-menu-item>
      <el-menu-item index="/index/ruku" @click="$router.push('/index/ruku')">
        <el-icon><setting /></el-icon>
        <span>供应入货管理</span>
      </el-menu-item>
      <el-menu-item index="/index/upShop" @click="$router.push('/index/upShop')">
        <el-icon><setting /></el-icon>
        <span>上架记录管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
// 路由守卫
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {onMounted, ref} from 'vue'
import {getUserInfo} from "@/api/user";
// 默认选中
const nickName=ref()
onMounted(()=>{
  getUserInfo({}).then(res=>{
    // console.log(res)
    if (res.code==200){
      nickName.value=res.result.nickname
    }
  })
})
const route=useRoute()
const defaultActive = ref(route.path)
onBeforeRouteUpdate((to, from)=>{
  defaultActive.value = to.path
})
</script>

<style scoped>

</style>