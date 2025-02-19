<template>
  <div id="sidebar">
    <div v-for="channel in channels" :key="channel" @click="switchChannel(channel)" :class="['channel', { active: channel === activeChannel }]">
      {{ channel }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    channels: Array
  },
  data() {
    return {
      activeChannel: '主岛'
    };
  },
  methods: {
    switchChannel(channel) {
      this.activeChannel = channel;
      this.$emit('switch-channel', channel);
    }
  }
};
</script>

<style scoped>
#sidebar {
  width: 15%;      /* 固定侧边栏宽度 */
  flex-shrink: 0;    /* 禁止侧边栏被压缩 */
  background-color: #2c3e50;
  color: white;
  padding: 3%;
}

.channel {
  padding: 20%;
  cursor: pointer;
}

.channel.active {
  background-color: #34495e;
}
</style>