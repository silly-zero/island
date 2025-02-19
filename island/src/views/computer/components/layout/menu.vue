<script setup>
import {ref} from 'vue'
const useMenus = ref([
    {name:'推荐',url:'/computer/recommend'},
    {name:'关注',url:'/computer/interest'},
    {name:'算法设计与分析',url:'/computer/algorithm'},
    {name:'前端',url:'/computer/frontEnd'},
    {name:'后端',url:'/computer/backEnd'},
    {name:'AI',url:'/computer/ai'},
    
])
</script>

<template>
<el-menu
    :default-active="$route.path"
    class="el-menu-demo "
    mode="horizontal" 
    router
    :ellipsis="false"
  >
    <el-menu-item index="0">
        <img src="/src/assets/image/logn.png" alt="" style="width: 80px" >
    </el-menu-item>
    <el-menu-item :index="v.url" v-for="v in useMenus" :key="v.url">
        <span>{{v.name}}</span>
    </el-menu-item>
</el-menu>

</template>

<style scoped>
</style>
