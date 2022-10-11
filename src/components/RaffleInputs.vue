<template>
  <div id="choose-link" class="inputBox">
    <p>Вставьте ссылку:</p>
    <input id="inputLink" :value="link" @input="$emit('update:link', $event.target.value)"/>
  </div>
  <div id="choose-profile" class="inputBox">
    <p>Профиль:</p>
    <!-- eslint-disable -->
    <select id="selectProfile" :value="profile" class="select"
            @input="$emit('update:profile', $event.target.value)">
      <option v-for="(profile, index) in PROFILE_LIST_RAFFLE" :key="index"
              :value="profile">{{ profile }}</option>
    </select>
  </div>
  <div id="choose-size" class="inputBox">
    <p>Размер:</p>
    <select id="selectSize" :value="size" class="select"
            @input="$emit('update:size', $event.target.value)">
      <option v-for="(size, index) in sizes" :key="index"
              :value="size"> {{ size + ' US' }}</option>
    </select>
  </div>
  <div id="choose-store" class="inputBox">
    <p>Магазин:</p>
    <select id="selectStore" :value="store" @input="$emit('update:store', $event.target.value)">
      <option v-for="(store, index) in stores" :key="index"
              :value="store.value">{{ store.title }}</option>
    </select>
  </div>
  <div id="choose-mode" class="inputBox">
    <p>Режим:</p>
    <form id="selectMode" class="inputRadio">
      <label v-for="mode in modes" :key="mode.value" style="display: flex">
        <input
            v-model="test"
            :value="mode.value"
            class="inputMode"
            name="mode"
            type="radio"
            @input="$emit('update:mode', JSON.parse($event.target.value))"
        />
        {{ mode.title }}
      </label>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { modes, sizes, stores } from '@/assets/raffle';

export default {
  name: 'RaffleInputs',
  mounted() {
    this.test = this.mode;
  },
  data() {
    return {
      sizes,
      stores,
      modes,
      test: null,
    };
  },
  methods: {
  },
  computed: {
    ...mapState(['PROFILE_LIST_RAFFLE']),
  },
  props: {
    link: { type: String },
    profile: { type: String },
    size: { type: Number },
    store: { type: String },
    mode: { type: Boolean },
  },
};
</script>

<style scoped>
.inputBox {
  width: 100%;
}

#selectMode {
  width: 200px;
  display: flex;
}

#choose-link {
  grid-area: link;
}

#choose-profile {
  grid-area: profile;
}

#choose-size {
  grid-area: size;
}

#choose-store {
  grid-area: store;
}

#choose-mode {
  grid-area: mode;
}
</style>
