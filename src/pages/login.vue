<template>
<div style="width: 100vw; height: 100vh;display: flex;justify-content: center;align-items: center;background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);;">
  <div>
    <h2 class="mt-6 text-3xl font-bold text-gray-900" style="text-align: center">欢迎回来</h2>
    <div class="flex items-center justify-center space-x-2 mt-5 mb-8">
      <span class="h-px w-16 bg-gray-200"></span>
      <span class="text-gray-300 font-normal">账号密码登录</span>
      <span class="h-px w-16 bg-gray-200"></span>
    </div>
    <el-form :model="form" :rules="rules" ref="formRef" style="width:400px;" :inline="false" size="default">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名">
          <template #prefix>
            <el-icon class="el-input__icon"><user /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" show-password>
          <template #prefix>
            <el-icon class="el-input__icon"><lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button round color="#626aef" style="width:400px;color: white;" @click="submit" :loading="loading">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>
<script setup>
import { ref,reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {login} from "@/api/user";
const router=useRouter()
const formRef = ref(null)
const form = reactive({
  username:"",
  password:""
})

const rules = {
  username:[{
    required: true,
    message: '用户名不能为空',
    trigger: 'blur',
  }],
  password:[{
    required: true,
    message: '密码不能为空',
    trigger: 'blur',
  }],
}
const loading = ref(false)
const submit = (e)=>
    formRef.value.validate((valid)=>{
      if(!valid) return false
      loading.value = true
      login(form).then(res=>{
        if (res.message=='登录成功'){
          localStorage.setItem('token',res.result)
          router.push('/index')
        }
      }).finally(()=>{
        loading.value=false
      })
    })
</script>
<style scoped>

</style>