<template>
  <div id="chat-window">
    <div id="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <span class="username">{{ message.username }}：</span>{{ message.text }}
      </div>
    </div>
    <div id="input-area">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: Array
  },
  data() {
    return {
      newMessage: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        this.$emit('send-message', this.newMessage);
        this.newMessage = '';
      }
    }
  }
};
</script>

<style scoped>
#chat-window {
  flex: 1;           /* 聊天窗口占据剩余空间 */
  min-width: 0;      /* 修复 flex 内容溢出问题 */
  display: flex;
  flex-direction: column;
  background-color: #ecf0f1;
}

#messages {
  flex: 1;
  padding: 3%;
  overflow-y: auto;
  font-size: 16px;
}

.message {
  margin-bottom: 1%;
}

.username {
  font-weight: bold;
}

#input-area {
  display: flex;
  padding: 3%;
  background-color: #bdc3c7;
}

input {
  flex: 1;
  padding: 1%;
  border: none;
  border-radius: 5px;
  font-size: 14px;
}

button {
  margin-left: 2%;
  padding: 3% 5%;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}
</style>