<template>
  <div id="chat-container">
    <Sidebar :channels="channels" @switch-channel="switchChannel" />
    <ChatWindow :messages="messages" @send-message="sendMessage" />
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import ChatWindow from './ChatWindow.vue';

export default {
  components: {
    Sidebar,
    ChatWindow
  },
  data() {
    return {
      channels: ['世界', '本岛', '群聊'],
      messages: [
        { username: '小帅哥', text: '呵呵呵' },
        { username: '笨笨的zero', text: '我是傻逼' }
      ],
      activeChannel: '世界'
    };
  },
  methods: {
    switchChannel(channel) {
      this.activeChannel = channel;
      // 这里可以添加切换频道后的逻辑，比如加载该频道的消息
    },
    sendMessage(message) {
      this.messages.push({ username: '你', text: message });
    }
  }
};
</script>

<style scoped>
#chat-container {
  display: flex;
  height: 80vh;
  width: 100%;        /* 确保占满父容器 */
  max-width: 1000px;  /* 限制最大宽度（按需调整） */
  margin: 0 auto;     /* 居中 */
  overflow: hidden;   /* 隐藏溢出内容 */
}


</style>