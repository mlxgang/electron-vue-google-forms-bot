<template>
  <div class="flex" style="height: 720px">
    <div class="flex" style="height: 300px">
      <div class="inputBox" style="width: 200px">
        <p>Введите ключ</p>
        <input
          id="key"
          v-model="keyInput.value"
          :placeholder="keyInput.placeholder"
        />
      </div>
      <button @click="sendKey">Войти</button>
    </div>

  </div>

</template>

<script>
import axios from 'axios';

const fs = window.require('fs');

export default {
  name: 'TheAuth',
  mounted() {
    if (fs.readFileSync('key.txt', 'utf8') !== '') {
      this.keyInput.value = fs.readFileSync('key.txt', 'utf8');
    } else {
      this.keyInput.placeholder = 'Введите ключ';
    }
  },
  data() {
    return {
      keyInput: { value: '', placeholder: '' },
      isConnected: false,
    };
  },
  methods: {
    async sendKey() {
      const key = this.keyInput.value;
      const auth = await axios.post('http://localhost:8081/api/keys/check', { key });
      // if (auth.data.auth) {
      console.log(auth.data);
      // }
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
</style>
