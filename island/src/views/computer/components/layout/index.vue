<script setup>
import Header from './computerHeader.vue'
</script>

<template>
  <div>
    <el-container>
      <el-header style="position: fixed; top: 0; left: 0; right: 0; z-index: 999;">
        <Header />
      </el-header>
      <el-main style="padding-top: 60px;"></el-main>
      <el-main>
          <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>

</style>
