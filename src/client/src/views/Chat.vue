<template>
  <div>
    <h1>Chat</h1>
    <input v-model="name" placeholder="Name" />
    <ul id="messages">
      <li v-for="(message, index) in messages" :key="index">
        {{ message.sender }} : {{ message.text }}
      </li>
    </ul>
    <form @submit.prevent>
      <input v-model="message" /><button @click="sendMessage()">Send</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Message {
  text: string,
  sender: string,
}

export default Vue.extend({
  data: () => ({
    messages: [] as Message[],
    message: '',
    name: '',
  }),
  methods: {
    sendMessage() {
      this.$socket.client.emit('sendMessage', {sender: this.name, text: this.message});
      this.message = '';
    }
  },
  created() {
    this.$socket.$subscribe('chatMessage', (payload: Message) => {
      this.messages.push(payload);
    });
  }
})
</script>>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font: 13px Helvetica, Arial; }
form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
form input { border: 0; padding: 10px; width: 90%; margin-right: 0.5%; }
form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
#messages { list-style-type: none; margin: 0; padding: 0; }
#messages li { padding: 5px 10px; }
#messages li:nth-child(odd) { background: #eee; }
</style>