<template>
  <!-- eslint-disable -->
  <div id="mrb-profiles-raffle">
    <div class="inputBox">
      <label for="profileName">Название профиля</label>
      <input
        id="profileName"
        v-model="selectProfile"
        list="profileList"
        placeholder="Profile name"
        @input="setCurrentProfile"
      />
      <datalist id="profileList">
        <option
          v-for="(profile, index) in PROFILE_LIST_RAFFLE"
          :key="index"
          :value="profile"
        />
      </datalist>
    </div>
    <InputItem
      v-for="(input, index) in inputs"
      :key="index"
      :input="input"
      v-model:value="this.currentProfile[input.id]"
    />
    <button id="createProfileBtn" @click="createProfile">
      Save profile
    </button>
    <button id="deleteProfileBtn" :disabled="isDisabled" @click="deleteProfile">
      Delete profile
    </button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { currentProfile, inputs } from '@/assets/inputsProfileRaffle';
import InputItem from './InputItem.vue';

const fs = window.require('fs');

export default {
  name: 'TheProfilesRaffle',
  components: {
    InputItem,
  },
  data() {
    return {
      inputs,
      currentProfile,
      selectProfile: '',
    };
  },
  methods: {
    ...mapMutations(['GET_PROFILE_LIST_RAFFLE']),
    setCurrentProfile() {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.currentProfile) {
        if (this.PROFILE_LIST_RAFFLE.includes(this.selectProfile)) {
          const editProfile = JSON.parse(fs.readFileSync(`profiles-raffle/${this.selectProfile}.json`, 'utf8'));
          this.currentProfile[key] = editProfile[key];
        } else {
          this.currentProfile[key] = null;
        }
      }
    },
    createProfile() {
      if (this.selectProfile !== '') {
        fs.writeFileSync(
          `profiles-raffle/${this.selectProfile}.json`,
          JSON.stringify(this.currentProfile, null, 2),
          'utf-8',
        );
        this.GET_PROFILE_LIST_RAFFLE();
      }
    },
    deleteProfile() {
      if (this.selectProfile !== '') {
        fs.unlinkSync(`profiles-raffle/${this.selectProfile}.json`);
        this.selectProfile = null;
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const key in this.currentProfile) {
          this.currentProfile[key] = null;
        }
        this.GET_PROFILE_LIST_RAFFLE();
      }
    },
  },
  computed: {
    ...mapState(['PROFILE_LIST_RAFFLE']),
    isDisabled() {
      if (this.PROFILE_LIST_RAFFLE.includes(this.selectProfile)) {
        return false;
      }
      return true;
    },
  },

};
</script>

<style scoped>
#mrb-profiles-raffle {
  width: 1000px;
  height: 615px;

  display: grid;
  grid-template-columns: 355px 355px 130px;
  grid-template-rows: 60px 60px 60px 60px 60px 60px;
  column-gap: 80px;
  row-gap: 40px;

  grid-auto-flow: column;
}

#mrb-profiles-raffle .inputBox {
  width: 355px;
}
</style>
