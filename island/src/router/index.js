import{ createRouter,createWebHashHistory } from "vue-router";

const routes =[
    {
        path:'/',
        name:'home',
        component: () => import("../views/userPages/loginPage_reset.vue"),
    },
    {
        path:'/index',//主岛
        name:'index',
        redirect:'/index/recommend',
        component:()=>import('../views/index/index.vue'),
        children:[
            {
                path:'/index/interest',//关注页
                name:'indexInterest',
                component:()=>import('../views/index/interest/index.vue')
            },
            {
                path:'/index/recommend',//推荐页
                name:'indexRecommend',
                component:()=>import('../views/index/recommend/index.vue')
            },
            {
                path:'/index/hotlist',//热榜页
                name:'indexHotlist',
                component:()=>import('../views/index/hotlist/index.vue')
            }
        ]
    },
    {
        path:'/personal',//个人中心
        name:'personal',
        component:()=>import('../views/userPages/personalCenter.vue'),
    },
    {
       path:'/computer',//计算机分岛
       name:'computer',
        redirect: '/computer/recommend',
        component:()=>import('../views/computer/components/layout/index.vue'),
       children:[
           {
               path:'/computer/recommend',//推荐页
               name:'computerRecommend',
               component:()=>import('../views/computer/recommend/index.vue')
           }, 
           {
              path:'/computer/frontEnd',//前端页
              name:'computerFrontEnd',
              component:()=>import('../views/computer/frontEnd/index.vue') 
           },
           {
              path:'/computer/backEnd',//后端页
              name:'computerBackEnd',
              component:()=>import('../views/computer/backEnd/index.vue') 
           },
           {
            path:'/computer/ai',//ai页
            name:'computerAi',
            component:()=>import('../views/computer/ai/index.vue')
           },
           {
              path:'/computer/interest',//关注页
              name:'computerInterest',
              component:()=>import('../views/computer/interest/index.vue') 
           },
           {
              path:'/computer/algorithm',//算法页
              name:'computerAlgorithm',
              component:()=>import('../views/computer/algorithm/index.vue') 
           }
       ]

    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router