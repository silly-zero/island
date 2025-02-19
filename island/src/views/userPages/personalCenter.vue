<template>
  <div class="personal-center">
    <!-- 个人信息头部 -->
    <div class="personal-header">
      <!-- 头像容器 -->
      <div class="avatar-container" @click="showAvatarUpload = true" @mouseenter="showChangeText = true" @mouseleave="showChangeText = false">
        <img :src="avatarUrl" alt="个人头像" class="avatar">
        <span v-if="showChangeText" class="change-avatar-text">更换头像</span>
      </div>
      <!-- 点击用户名触发编辑 -->
      <h1 class="username" @click="showUsernameEdit = true">{{ username }}</h1>
      <!-- 点击简介触发编辑 -->
      <p class="user-intro" @click="showUserIntroEdit = true">{{ userIntro }}</p>
    </div>
    <!-- 个人中心菜单 -->
    <div class="personal-menu">
      <el-menu :default-active="activeMenu" mode="horizontal" @select="handleMenuSelect">
        <el-menu-item index="1">我的关注</el-menu-item>
        <el-menu-item index="2">我的收藏</el-menu-item>
      </el-menu>
    </div>
    <!-- 个人中心内容区域 -->
    <div class="personal-content">
      <!-- 我的关注内容 -->
      <div v-if="activeMenu === '1'">
        <!-- 这里可以循环展示关注的内容，参考之前的 topstorylist -->
        <ul>
          <li v-for="item in followedItems" :key="item.id">
            <div class="topstory-item">
              <div class="topstory-hd" style="flex-basis: 200px;"> <!-- 固定头像和用户名区域宽度 -->
                <img :src="item.img" alt="">
                <div class="topstory-info">
                  <span class="topstory-username">{{item.name}}</span>
                  <p class="topstory-intro">{{item.introduction}}</p>
                </div>
              </div>
              <button @click="unfollow(item)" style="flex-shrink: 0;">已关注</button>
            </div>
          </li>
        </ul>
      </div>
      <!-- 我的收藏内容 -->
      <div v-if="activeMenu === '2'">
        <!-- 这里可以循环展示收藏的内容 -->
        <ul>
          <li v-for="item in favoriteItems" :key="item.id">
            <div class="topstory-hd">
              <img :src="item.img" alt="">
              <span>{{item.name}}</span>
            </div>
            <h2 class="topstory-title">{{item.title}}</h2>
            <div class="topstory-articleitem">
              {{item.articleitem}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 头像上传弹窗 -->
    <div v-if="showAvatarUpload" class="upload-popup">
      <input type="file" @change="handleAvatarChange" accept="image/*" >
      <button @click="showAvatarUpload = false">取消</button>
    </div>
    <!-- 用户名编辑弹窗 -->
    <div v-if="showUsernameEdit" class="upload-popup">
      <input v-model="username" placeholder="用户名">
      <button @click="saveUsername; showUsernameEdit = false">保存</button>
      <button @click="showUsernameEdit = false">取消</button>
    </div>
    <!-- 简介编辑弹窗 -->
    <div v-if="showUserIntroEdit" class="upload-popup">
      <textarea v-model="userIntro" placeholder="简介"></textarea>
      <button @click="saveUserIntro; showUserIntroEdit = false">保存</button>
      <button @click="showUserIntroEdit = false">取消</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义当前激活的菜单
const activeMenu = ref('1');
// 控制头像上传弹窗的显示与隐藏
const showAvatarUpload = ref(false);
// 控制用户名编辑弹窗的显示与隐藏
const showUsernameEdit = ref(false);
// 控制简介编辑弹窗的显示与隐藏
const showUserIntroEdit = ref(false);
// 模拟用户信息
const username = ref('用户名');
const userIntro = ref('这里是用户的简介信息');
const avatarUrl = ref('/src/assets/image/1.png');
// 控制“更换头像”文本的显示与隐藏
const showChangeText = ref(false);

// 模拟关注的内容
const followedItems = ref([
  {
    img: '/src/assets/image/pic5.png',
    name: '小帅哥',
    title: '今天你上分了吗',
    articleitem: '快来打cf吧',
    introduction:'我不是小帅哥',
    id: 1
  },
  {
    img: '/src/assets/image/pic6.jpg',
    name: '名字111',
    title: '这是标题二',
    articleitem: '什么许多人买房子用商业贷款而不是公积...',
    introduction:'小美呢',
    id: 2
  }
]);

// 模拟收藏的内容
const favoriteItems = ref([
  {
    img: '/src/assets/image/pic7.jpg',
    name: '名字111',
    title: '这是标题三',
    articleitem: '这是标题三什么许多人买房子用商业贷款...',
    id: 3
  }
]);

// 处理菜单选择事件
const handleMenuSelect = (key) => {
  activeMenu.value = key;
};

// 处理头像上传
const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      avatarUrl.value = event.target.result;
      showAvatarUpload.value = false;
    };
    reader.readAsDataURL(file);
  }
};

// 保存用户名
const saveUsername = () => {
  // 这里可以添加保存信息的逻辑，例如发送请求到后端
};

// 保存简介
const saveUserIntro = () => {
  // 这里可以添加保存信息的逻辑，例如发送请求到后端
};

// 取消关注
const unfollow = (item) => {
  const index = followedItems.value.findIndex(i => i.id === item.id);
  if (index!== -1) {
    followedItems.value.splice(index, 1);
  }
};
</script>

<style scoped>
.personal-center {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px #ddd;
  padding: 20px;
  margin-top: 20px;
}

.personal-header {
  text-align: center;
  margin-bottom: 20px;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  cursor: pointer;
}

.change-avatar-text {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px; /* 调整上下内边距 */
  display: none;
  text-align: center;
  box-sizing: border-box;
  white-space: nowrap;
}

.avatar-container:hover .change-avatar-text {
  display: block;
}

.username {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
  cursor: pointer;
}

.user-intro {
  color: #666;
}

.personal-menu {
  margin-bottom: 20px;
}

.topstory-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  gap: 20px;
}

.topstory-hd {
  display: flex;
  align-items: center;
}

.topstory-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.topstory-username {
  font-size: 16px;
  font-weight: 600;
}

.topstory-intro {
  font-size: 12px;
  color: #666;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3
  }

  .upload-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
</style>
