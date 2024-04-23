<template>
  <div>
    <el-button type="primary" @click="handleAddUser">新增入货记录</el-button>
    <el-input
        v-model="input"
        style="width: 240px"
        placeholder="输入商品名搜索"
        :prefix-icon="Search"
        @change="handleChange"
    />
    <el-table :data="tableData">
      <el-table-column prop="product" label="商品名称" />
      <el-table-column prop="supplier" label="供应商"/>
      <el-table-column prop="quantity" label="入库数量"/>
      <el-table-column prop="supplyDate" label="入库时间"/>
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
          <el-form-item label="商品" prop="product">
            <el-select v-model="ruleForm.product" placeholder="请选择商品" style="width: 100%">
              <el-option :label="item.name" :value="item.name" v-for="item in commodity" :key="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商" prop="supplier">
            <el-select v-model="ruleForm.supplier" placeholder="请选择供应商" style="width: 100%">
              <el-option :label="item.name" :value="item.name" v-for="item in supperList" :key="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="入库数量" prop="quantity">
            <el-input-number v-model="ruleForm.quantity" />
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
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import {
  addCommodity, addRuku,
  addUsers, deleteCommodity,
  deleteUsers,
  getCommodity, getCommodity1, getRuku, getSupplier1,
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
  product:'',
  supplier:'',
  quantity:'',
})
const  ruleFormRef=ref()
const rules = reactive({
  product: [
    {required: true, message: '请选择商品名称', trigger: 'blur'},
  ],
  supplier: [
    {required: true, message: '请选择供应商', trigger: 'blur'},
  ],
  quantity: [
    {required: true, message: '请输入价格', trigger: 'blur'},
  ],
})
const supperList=ref([])
const commodity=ref([])
onMounted(()=>{
  getRuku(currentPage.value,input.value).then(res=>{
    if (res.code==200){
      tableData.value=res.result.records
      total.value=res.result.total
    }
  })
  // 获取供应商
  getSupplier1(1).then(res=>{
    if (res.code==200){
      supperList.value=res.result.records
      console.log(res.result.records)
    }
  })
  // 获取商品
  getCommodity1(1).then(res=>{
    if (res.code==200){
      commodity.value=res.result.records
      console.log(res)
    }
    })
})
const getData=(value)=>{
  console.log(value)
  currentPage.value=value
  getRuku(currentPage.value).then(res=>{
    if (res.code==200){
      tableData.value=res.result.records
      total.value=res.result.total
    }
  })
}
const handleAddUser=()=>{
  dialogVisible.value=true
}
const handleChange=()=>{
  getRuku(1,input.value).then(res=>{
    if (res.code==200){
      tableData.value=res.result.records
      total.value=res.result.total
    }
    console.log(res.result)
  })
}
const handleConfirm=()=>{
  ruleFormRef.value.validate((valid)=> {
    if (!valid) return false
    addRuku(ruleForm.value).then(res=>{
      if (res.code==200){
        ElMessage({
          type: 'success',
          message: '添加记录成功',
        })
      }
    }).finally(()=>{
      getRuku(currentPage.value).then(res=>{
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