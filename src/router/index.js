import {
    createRouter as _createRouter,
    createWebHashHistory,
} from 'vue-router'

const routes = [
    {
        path: "/",
       redirect: "/login"
    },
    {
        path: "/login",
        component: () => import ("@/pages/login.vue"),
        name:'登录页'
    },
    {
        path: "/index",
        component: () => import ("@/pages/index.vue"),
        name:'首页',
        redirect: "/index/commodity",
        children:[
            // {
            //     path: "/index/index",
            //     component: () => import ("@/components/index.vue"),
            //     name:'用户首页'
            // },
            {
                path: "/index/user",
                component: () => import ("@/components/user.vue"),
                name:'用户管理'
            },
            {
                path: "/index/staff",
                component: () => import ("@/components/staff.vue"),
                name:'员工管理'
            },
            {
                path: "/index/supplier",
                component: () => import ("@/components/supplier.vue"),
                name:'供应商管理'
            },
            {
                path: "/index/type",
                component: () => import ("@/components/type.vue"),
                name:'商品类型管理'
            },
            {
                path: "/index/commodity",
                component: () => import ("@/components/commodity.vue"),
                name:'商品管理'
            },
            {
                path: "/index/ruku",
                component: () => import ("@/components/ruku.vue"),
                name:'入库管理'
            },
            {
                path: "/index/upShop",
                component: () => import ("@/components/upShop.vue"),
                name:'上架管理'
            },
        ]
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: '404',
    //     component: () =>
    //         import ("~/pages/404.vue"),
    // }
]

function createRouter() {
    return _createRouter({
        history: createWebHashHistory(),
        routes
    })
}

const router = createRouter()

export default router