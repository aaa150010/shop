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
      <el-table-column prop="name" label="供应商名称" />
      <el-table-column prop="contactPerson" label="联系人"/>
      <el-table-column prop="contactInfo" label="联系方式"/>
      <el-table-column prop="rating" label="评价等级"/>
      <el-table-column  label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleUpdata(scope.row)">
            修改供应商信息
          </el-button>
          <el-button link type="warning" size="small" @click="handleDelete(scope.row.id)">
            删除供应商信息
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
          <el-form-item label="供应商名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="联系人" prop="contactPerson">
            <el-input v-model="ruleForm.contactPerson" />
          </el-form-item>
          <el-form-item label="联系方式" prop="contactInfo">
            <el-input v-model="ruleForm.contactInfo" />
          </el-form-item>
          <el-form-item label="评价等级" prop="rating">
            <el-input v-model="ruleForm.rating" />
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
          <el-form-item label="供应商名称" prop="name">
            <el-input v-model="ruleForm1.name" />
          </el-form-item>
          <el-form-item label="联系人" prop="contactPerson">
            <el-input v-model="ruleForm1.contactPerson" />
          </el-form-item>
          <el-form-item label="联系方式" prop="contactInfo">
            <el-input v-model="ruleForm1.contactInfo" />
          </el-form-item>
          <el-form-item label="评价等级" prop="rating">
            <el-input v-model="ruleForm1.rating" />
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
import {
  addSupplier,
  addUsers, deleteSupplier,
  deleteUsers,
  getSupplier,
  getUsers,
  searchUsers,
  updataSupplier,
  updataUsers
} from "@/api/user";
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
  name:'',
  contactPerson:'',
  contactInfo:'',
  rating:''
})
const ruleForm1=ref({
  id:'',
  name:'',
  contactPerson:'',
  contactInfo:'',
  rating:''
})
const  ruleFormRef=ref()
const  ruleFormRef1=ref()
const rules = reactive({
  name: [
    {required: true, message: '请输入供应商名称', trigger: 'blur'},
  ],
  contactPerson: [
    {required: true, message: '请输入联系人', trigger: 'blur'},
  ],
  contactInfo: [
    {required: true, message: '请输入联系方式', trigger: 'blur'},
  ],
  rating: [
    {required: true, message: '请输入评价等级', trigger: 'blur'},
  ],
})

onMounted(()=>{
  getSupplier(currentPage.value,input.value).then(res=>{
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
  ruleForm1.value.id=item.id
  ruleForm1.value.name=item.name
  ruleForm1.value.contactPerson=item.contactPerson
  ruleForm1.value.contactInfo=item.contactInfo
  ruleForm1.value.rating=item.rating
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
    updataSupplier(ruleForm1.value).then(res=>{
      console.log(res)
      if (res.code==200){
        ElMessage({
          type: 'success',
          message: '修改成功',
        })
      }
      dialogVisible1.value=false
      getSupplier(currentPage.value,input.value).then(res=>{
        if (res.code==200){
          tableData.value=res.result.records
          total.value=res.result.total
        }
        console.log(res.result)
      })
    })
  })

}
const handleDelete=(id)=>{
  ElMessageBox.confirm(
      '确认删除此用户吗?',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        deleteSupplier(id).then(res=>{
          if (res.code=200){
            ElMessage({
              type: 'success',
              message: '删除用户成功',
            })
          }
          getSupplier(1).then(res=>{
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
    addSupplier(ruleForm.value).then(res=>{
      if (res.code==200){
        ElMessage({
          type: 'success',
          message: '添加用户成功',
        })
      }
    }).finally(()=>{
      getSupplier(currentPage.value).then(res=>{
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