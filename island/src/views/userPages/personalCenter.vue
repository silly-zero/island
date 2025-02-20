<template>
  <div class="personal-center">
    <!-- 个人信息头部 -->
    <div class="personal-header">
      <!-- 头像容器 -->
      <div class="avatar-container" @click="showAvatarUpload = true" @mouseenter="showChangeText = true" @mouseleave="showChangeText = false">
        <img :src="userProfile.avatar" alt="个人头像" class="avatar">
      </div>
      <!-- 点击用户名触发编辑 -->
      <h1 class="username" @click="showUsernameEdit = true">{{ username }}</h1>
      <h1 class="username" @click="showUsernameEdit = true">{{ userProfile.username }}</h1>
      <!-- 点击简介触发编辑 -->
      <p class="user-intro" @click="showUserIntroEdit = true">{{ userIntro }}</p>
      <p class="user-intro" @click="showUserIntroEdit = true">{{ userProfile.intro }}</p>
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
              <button @click="unfollow(item)" :disabled="processing">
                {{ processing ? '取消中...' : '已关注' }}
              </button>
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
      <button @click="saveAvatar">保存</button>
      <button @click="showAvatarUpload = false">取消</button>
    </div>
    <!-- 用户名编辑弹窗 -->
    <div v-if="showUsernameEdit" class="upload-popup">
      <input v-model="userProfile.username" placeholder="用户名">
      <button @click="saveUsername">保存</button>
      <button @click="showUsernameEdit = false">取消</button>
    </div>

    <div v-if="showUserIntroEdit" class="upload-popup">
      <textarea v-model="userProfile.intro" placeholder="简介"></textarea>
      <button @click="saveUserIntro">保存</button>
      <button @click="showUserIntroEdit = false">取消</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { personalApi } from '@/api/personalCenter';

// 定义当前激活的菜单
const activeMenu = ref('1');
// 控制头像上传弹窗的显示与隐藏
const showAvatarUpload = ref(false);
// 控制用户名编辑弹窗的显示与隐藏
const showUsernameEdit = ref(false);
// 控制简介编辑弹窗的显示与隐藏
const showUserIntroEdit = ref(false);
// 初始化用户资料时合并默认值
const userProfile = ref({
  username: personalApi.DEFAULT_PROFILE.USERNAME,
  intro: personalApi.DEFAULT_PROFILE.INTRO,
  avatar: personalApi.DEFAULT_PROFILE.AVATAR
});

// 加载用户数据时应用默认值
onMounted(async () => {
  try {
    const { data } = await personalApi.getProfile();
    userProfile.value = {
      ...personalApi.DEFAULT_PROFILE,
      ...data.data,
      // 空值回退到默认配置
      username: data.data.username || personalApi.DEFAULT_PROFILE.USERNAME,
      intro: data.data.intro || personalApi.DEFAULT_PROFILE.INTRO,
      avatar: data.data.avatar || personalApi.DEFAULT_PROFILE.AVATAR
    };
  } catch (error) {
    message.error('用户数据加载失败');
  }
});

// 保存用户名
const saveUsername = async () => {
  try {
    await personalApi.updateProfile({
      username: userProfile.value.username
    });
    message.success('用户名更新成功');
    showUsernameEdit.value = false;
  } catch (error) {
    message.error('保存失败');
  }
};

// 保存简介
const saveUserIntro = async () => {
  try {
    await personalApi.updateProfile({
      intro: userProfile.value.intro
    });
    message.success('简介更新成功');
    showUserIntroEdit.value = false;
  } catch (error) {
    message.error('保存失败');
  }
};

// 处理头像上传
const handleAvatarChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await personalApi.updateProfile(formData);
    userProfile.value.avatar = data.avatarUrl || personalApi.DEFAULT_PROFILE.AVATAR;
    message.success('头像更新成功');
    showAvatarUpload.value = false;
  } catch (error) {
    message.error('头像上传失败');
  }
};

// 取消关注方法
const unfollow = async (item) => {
  try {
    await personalApi.unfollow(item.id);
    message.success(`已取消关注 ${item.name}`);
    // 重新获取关注列表
    const { data } = await personalApi.getFollows();
    followedItems.value = data.data;
  } catch (error) {
    message.error('取消关注失败');
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
  background-color: #0056b3;
  }

.upload-popup {
  min-width: 300px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}
.upload-popup input[type="text"],
.upload-popup textarea {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}


button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
