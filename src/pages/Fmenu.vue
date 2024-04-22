<template>
  <div style="width: 250px">
    <el-menu
        :default-active="defaultActive"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-menu-item index="/index/index" @click="$router.push('/index/index')">
        <el-icon><setting /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/index/user" @click="$router.push('/index/user')">
        <el-icon><setting /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/index/supplier" @click="$router.push('/index/supplier')">
        <el-icon><setting /></el-icon>
        <span>供应商管理</span>
      </el-menu-item>
      <el-menu-item index="/index/staff" @click="$router.push('/index/staff')">
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
      <el-menu-item index="1">
        <el-icon><setting /></el-icon>
        <span>供应入货管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
// 路由守卫
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {ref} from 'vue'
// 默认选中
const route=useRoute()
const defaultActive = ref(route.path)
onBeforeRouteUpdate((to, from)=>{
  defaultActive.value = to.path
})
</script>

<style scoped>

</style>