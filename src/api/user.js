import axios from '@/axios'


//用户登录
export function login(data) {
    return axios.post("/api/users/login", data)
}
//获取用户信息
export function getUserInfo() {
    return axios.get(`/api/users/info/token/${localStorage.getItem('token')}`)
}






//用户管理



//分页查询所有用户
export function getUsers(pageNum,username) {
    return axios.post("/api/users/page",{pageNum,data:{
            username
        }})
}
//新增用户
export function addUsers(form) {
    return axios.post("/api/users/register",form)
}
//查询用户
export function searchUsers(form) {
    return axios.post("/api/users/query",form)
}
//删除用户
export function deleteUsers(username) {
    return axios.delete(`/api/users/delete/${username}`)
}
//修改用户信息
export function updataUsers(form) {
    return axios.post('/api/users/update',form)
}


//员工信息管理



//分页查询员工
export function getStaff(pageNum,name) {
    return axios.post("/employees/page",{pageNum,data:{
            name
        }})
}
//新增员工
export function addStaff(form) {
    return axios.post("/employees/save",form)
}
//删除员工
export function deleteStaff(id) {
    return axios.delete(`/employees/delete/${id}`)
}
//修改员工信息
export function updataStaff(form) {
    return axios.post('/employees/update',form)
}


//供应商管理



//分页查询供应商
export function getSupplier(pageNum,name) {
    return axios.post("/suppliers/page",{pageNum,data:{
            name
        }})
}
//新增供应商
export function addSupplier(form) {
    return axios.post("/suppliers/save",form)
}
//删除供应商
export function deleteSupplier(id) {
    return axios.delete(`/suppliers/delete/${id}`)
}
//修改供应商信息
export function updataSupplier(form) {
    return axios.post('/suppliers/update',form)
}


// 商品类型管理


//分页查询商品类型
export function getType(pageNum,name) {
    return axios.post("/product-types/page",{pageNum,data:{
            name
        }})
}
export function getType1(pageNum,name) {
    return axios.post("/product-types/page",{pageNum,pageSize:20,data:{
            name
        }})
}
//新增商品类型
export function addType(form) {
    return axios.post("/product-types/save",form)
}
//删除商品类型
export function deleteType(id) {
    return axios.delete(`/product-types/delete/${id}`)
}
//修改商品类型信息
export function updataType(form) {
    return axios.post('/product-types/update',form)
}



//商品管理


//分页查询商品
export function getCommodity(pageNum,name) {
    return axios.post("/products/page",{pageNum,data:{
            name
        }})
}
//新增商品
export function addCommodity(form) {
    return axios.post("/products/save",form)
}
//删除商品
export function deleteCommodity(id) {
    return axios.delete(`/product-types/delete/${id}`)
}
//修改商品信息
export function updataCommodity(form) {
    return axios.post('/product-types/update',form)
}
