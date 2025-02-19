<script setup>
import Menu from './menu.vue'
import { useRouter } from 'vue-router'
const router = useRouter();

// 定义点击消息跳转的方法
const handleMessageClick = () => {
  // 这里假设消息页面的路由路径是 /computer/message
  router.push('/computer/message');
};

// 定义点击发布跳转的方法
const handlePublishClick = () => {
  // 这里假设发布页面的路由路径是 /computer/publish
  router.push('/computer/publish');
};
</script>

<template>
  <div class="header">
    <div class = "appheader">
      <Menu />
      <div class ="header-item">
        <div class="header-search">
          <input type="text" placeholder="请输入内容">
          <button class="iconfont icon-sousuo"></button>
        </div>
        <el-button type="primary" round>提问</el-button>
        <el-icon><Search /></el-icon>
      </div>
      <div class="heaer-userinfo">
        <div class="popover" @click="handleMessageClick">
          <i class="iconfont icon-xiaoxizhongxin"></i>
          <div class="popover-num">10</div>
          <p>消息</p>
        </div>
        <div class="popover" @click="handlePublishClick">
          <i class="iconfont icon-jurassic_edit-user"></i>
          <p>发布</p>
        </div>
        <div class="header-profile">
          <el-dropdown>
            <img src="@/assets/image/1.png" alt="">
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push('/personal')"><i class="iconfont icon-gerenzhongxin"></i>个人中心</el-dropdown-item>
                <el-dropdown-item @click="$router.push('/')"><i class="iconfont icon-tuichu"></i>退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-search input[type="text"] {
  font-size: 14px; /* 调整输入框内文字的字体大小 */
}

.popover p {
  font-size: 14px; /* 调整消息、私信等文本的字体大小 */
}

</style>
