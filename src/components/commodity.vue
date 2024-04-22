<template>
  <div>
    <el-button type="primary" @click="handleAddUser">新增商品</el-button>
    <el-input
        v-model="input"
        style="width: 240px"
        placeholder="输入商品名搜索"
        :prefix-icon="Search"
        @change="handleChange"
    />
    <el-table :data="tableData">
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="price" label="价格"/>
      <el-table-column prop="stockQuantity" label="库存数量"/>
      <el-table-column prop="type" label="类型"/>
      <el-table-column  label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleUpdata(scope.row)">
            修改商品信息
          </el-button>
          <el-button link type="warning" size="small" @click="handleDelete(scope.row.name)">
            删除商品信息
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
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="ruleForm.description" />
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input-number v-model="ruleForm.price" />
          </el-form-item>
          <el-form-item label="库存数量" prop="stockQuantity">
            <el-input-number v-model="ruleForm.stockQuantity" />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择商品类型" style="width: 100%">
              <el-option :label="item.name" :value="item.name" v-for="item in typeArray" :key="item"/>
            </el-select>
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
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm1.name" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="ruleForm1.description" />
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input-number v-model="ruleForm1.price" />
          </el-form-item>
          <el-form-item label="库存数量" prop="stockQuantity">
            <el-input-number v-model="ruleForm1.stockQuantity" />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="ruleForm1.type" placeholder="请选择商品类型" style="width: 100%">
              <el-option :label="item.name" :value="item.name" v-for="item in typeArray" :key="item"/>
            </el-select>
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
  addCommodity,
  addUsers, deleteCommodity,
  deleteUsers,
  getCommodity,
  getType,
  getType1,
  getUsers,
  searchUsers, updataCommodity,
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
  description:'',
  price:'',
  stockQuantity:'',
  type:''
})
const ruleForm1=ref({
  name:'',
  description:'',
  price:'',
  stockQuantity:'',
  type:''
})
const  ruleFormRef=ref()
const  ruleFormRef1=ref()
const rules = reactive({
  name: [
    {required: true, message: '请输入商品名称', trigger: 'blur'},
  ],
  description: [
    {required: true, message: '请输入描述', trigger: 'blur'},
  ],
  price: [
    {required: true, message: '请输入价格', trigger: 'blur'},
  ],
  stockQuantity: [
    {required: true, message: '请输入库存', trigger: 'blur'},
  ],
  type: [
    {required: true, message: '请选择类型', trigger: 'blur'},
  ],
})
const typeArray=ref([])
onMounted(()=>{
  getCommodity(currentPage.value,input.value).then(res=>{
    if (res.code==200){
      tableData.value=res.result.records
      total.value=res.result.total
    }
    // console.log(res.result)
  })
  getType1(currentPage.value,input.value).then(res=>{
    if (res.code==200){
      typeArray.value=res.result.records
    }
  })
})
const getData=(value)=>{
  console.log(value)
  currentPage.value=value
  getCommodity(currentPage.value).then(res=>{
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
  ruleForm1.value.name=item.name
  ruleForm1.value.description=item.description
  ruleForm1.value.price=item.price
  ruleForm1.value.stockQuantity=item.stockQuantity
  ruleForm1.value.type=item.type
  dialogVisible1.value=true
}
const handleChange=()=>{
  getCommodity(1,input.value).then(res=>{
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
    updataCommodity(ruleForm1.value).then(res=>{
      console.log(res)
      if (res.code==200){
        ElMessage({
          type: 'success',
          message: '修改成功',
        })
      }
      dialogVisible1.value=false
      getCommodity(currentPage.value,input.value).then(res=>{
        if (res.code==200){
          tableData.value=res.result.records
          total.value=res.result.total
        }
        console.log(res.result)
      })
    })
  })

}
const handleDelete=(name)=>{
  ElMessageBox.confirm(
      '确认删除此商品吗?',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        deleteCommodity(name).then(res=>{
          if (res.code=200){
            ElMessage({
              type: 'success',
              message: '删除商品成功',
            })
          }
          getCommodity(1).then(res=>{
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
    addCommodity(ruleForm.value).then(res=>{
      if (res.code==200){
        ElMessage({
          type: 'success',
          message: '添加商品成功',
        })
      }
    }).finally(()=>{
      getCommodity(currentPage.value).then(res=>{
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