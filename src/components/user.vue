<template>
  <div>
    <el-button type="primary" @click="handleAddUser">新增用户</el-button>
    <el-input
        v-model="input"
        style="width: 240px"
        placeholder="输入用户名搜索"
        :prefix-icon="Search"
        @change="handleChange"
    />
    <el-table :data="tableData">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="昵称"/>
      <el-table-column prop="role" label="所属角色"/>
      <el-table-column  label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleUpdata(scope.row)">
            修改用户信息
          </el-button>
          <el-button link type="warning" size="small" @click="handleDelete(scope.row.username)">
           删除用户信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%;display: flex;justify-content: end">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"  :currentPage="currentPage" @current-change="getData"/>
    </div>


<!--    新增用户dialog-->
    <el-dialog
        v-model="dialogVisible"
        width="800"
        @close="handleClose"
    >
      <div>
        <el-form
              ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="ruleForm.nickname" />
          </el-form-item>
          <el-form-item label="所属角色" prop="role">
            <el-select v-model="ruleForm.role" placeholder="请选择所属角色" style="width: 100%">
              <el-option label="管理员" value="管理员" />
              <el-option label="测试角色" value="测试角色" />
              <el-option label="普通角色" value="普通角色" />
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>

<!--    修改用户dialog-->
    <el-dialog
        v-model="dialogVisible1"
        width="800"
    >
      <div>
        <el-form
            ref="ruleFormRef1"
            :model="ruleForm1"
            :rules="rules"
            status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm1.username" disabled/>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="ruleForm1.nickname" />
          </el-form-item>
          <el-form-item label="所属角色" prop="role">
            <el-select v-model="ruleForm1.role" placeholder="请选择所属角色" style="width: 100%">
              <el-option label="管理员" value="管理员" />
              <el-option label="测试角色" value="测试角色" />
              <el-option label="普通角色" value="普通角色" />
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm1.password" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="handleUp">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import {addUsers, deleteUsers, getUsers, searchUsers, updataUsers} from "@/api/user";
import {Search} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
const tableData = ref([])
const total=ref()
const pageSize=ref(10)
const currentPage=ref(1)
const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const input=ref()
const ruleForm=ref({
  username:'',
  nickname:'',
  role:'',
  password:''
})
const ruleForm1=ref({
  username:'',
  nickname:'',
  role:'',
  password:''
})
const  ruleFormRef=ref()
const  ruleFormRef1=ref()
const rules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  nickname: [
    {required: true, message: '请输入昵称', trigger: 'blur'},
  ],
  role: [
    {required: true, message: '请选择所属角色', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
})

onMounted(()=>{
  getUsers(currentPage.value,input.value).then(res=>{
    if (res.code==200){
      tableData.value=res.result.records
      total.value=res.result.total
    }
    console.log(res.result)
  })
})
const getData=(value)=>{
  console.log(value)
  currentPage.value=value
  getUsers(currentPage.value).then(res=>{
    if (res.code==200){
      tableData.value=res.result.records
      total.value=res.result.total
    }
  })
}
const handleAddUser=()=>{
  dialogVisible.value=true
}
const handleUpdata=(item)=>{
  ruleForm1.value.username=item.username
  ruleForm1.value.nickname=item.nickname
  ruleForm1.value.role=item.role
  ruleForm1.value.password=item.password
  dialogVisible1.value=true
}
const handleChange=()=>{
  getUsers(1,input.value).then(res=>{
    if (res.code==200){
      tableData.value=res.result.records
      total.value=res.result.total
    }
    console.log(res.result)
  })
}
const handleUp=()=>{
  ruleFormRef1.value.validate((valid)=> {
    if (!valid) return false
    updataUsers(ruleForm1.value).then(res=>{
      console.log(res)
      if (res.code==200){
        ElMessage({
          type: 'success',
          message: '修改成功',
        })
      }
      dialogVisible1.value=false
      getUsers(currentPage.value,input.value).then(res=>{
        if (res.code==200){
          tableData.value=res.result.records
          total.value=res.result.total
        }
        console.log(res.result)
      })
    })
  })

}
const handleDelete=(username)=>{
  ElMessageBox.confirm(
      '确认删除此用户吗?',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        deleteUsers(username).then(res=>{
          if (res.code=200){
            ElMessage({
              type: 'success',
              message: '删除用户成功',
            })
          }
          getUsers(1).then(res=>{
            if (res.code==200){
              tableData.value=res.result.records
              total.value=res.result.total
            }
          })
        })
      })
}
const handleConfirm=()=>{
  ruleFormRef.value.validate((valid)=> {
    if (!valid) return false
    addUsers(ruleForm.value).then(res=>{
      if (res.code==200){
        ElMessage({
          type: 'success',
          message: '添加用户成功',
        })
      }
    }).finally(()=>{
      getUsers(currentPage.value).then(res=>{
        if (res.code==200){
          tableData.value=res.result.records
          total.value=res.result.total
        }
        console.log(res.result)
      })
      dialogVisible.value=false
    })
  })
}
const handleClose=()=>{
  ruleFormRef.value.resetFields()
  ruleFormRef.value.clearValidate()
}

</script>
<style scoped>

</style>