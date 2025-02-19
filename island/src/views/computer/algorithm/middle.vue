<script setup>
import content from './contentIndex.vue'
</script>

<template>
  <div class="content-middle">
    <div class="card">
      <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal" router
      >
        <el-menu-item>
        </el-menu-item>
      </el-menu>
      <content/>
    </div>
  </div>
</template>

<style scoped>

</style>
