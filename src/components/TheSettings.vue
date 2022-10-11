<template>
  <!-- eslint-disable -->
  <section id="mrb-settings" class="tab">
    <div id="settingsContent">
      <div id="discordWebhook" class="inputBox profileInputBox">
        <span>Discord Webhook:</span>
        <input type="text"/>
      </div>
<!--      <button id="saveWebhookBtn" @click="saveWebhook">Сохранить</button>-->
<!--      <button id="testWebhookBtn" @click="testWebhook">Test webhook</button>-->
      <div id="version">
        <p>{{ 'Текущая версия: ' + version }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

const fs = window.require('fs');
// const Discord = window.require('discord.js');

export default {
  name: 'TheSettings',
  computed:
      mapState(['version']),
  data() {
    return {
    //   testEmbed: new Discord.MessageEmbed()
    //     .setTitle('Test webhook')
    //     .setColor('#6c00ca')
    //     .setFooter(`mrb • ${this.version}`, 'https://i.imgur.com/KboX8fT.jpg')
    //     .addField('Профиль', 'Profile name', true)
    //     .addField('Магазин', 'Store', true)
    //     .addField('Размер', '11 US', true)
    //     .addField('Mode', 'Headless', false),
    };
  },
  mounted() {
    if (fs.existsSync('webhook.txt')) {
      this.renderWebhook();
    }
  },
  methods: {
    renderWebhook() {
      const webhookTXT = fs.readFileSync('webhook.txt', 'utf8');
      if (webhookTXT !== '') {
        document.querySelector('input').placeholder = webhookTXT;
      } else {
        document.querySelector('input').placeholder = 'Discord Webhook';
      }
    },
    saveWebhook() {
      fs.writeFileSync('webhook.txt', document.querySelector('input').value, 'utf-8');
      document.querySelector('input').value = null;
      this.renderWebhook();
    },
    // testWebhook() {
    //   const webhookTXT = fs.readFileSync('./webhook.txt', 'utf8');
    //   if (webhookTXT !== '') {
    //     const webhookSplit = webhookTXT.split('/');
    //     const webhookClient = new Discord.WebhookClient(webhookSplit[5], webhookSplit[6]);
    //     webhookClient.send({
    //       username: 'mlxgang raffle bot',
    //       avatarURL: 'https://i.imgur.com/KboX8fT.jpg',
    //       embeds: [this.testEmbed],
    //     });
    //   }
    // },
  },
};
</script>

<style scoped>
#settingsContent {
  display: grid;
  width: 400px;

  align-items: flex-end;
  justify-content: center;

  grid-template-columns: 400px 120px 120px 120px 150px 200px;
  grid-template-rows: 60px 30px 460px;
  grid-gap: 20px;
  grid-template-areas:
    '. webhook     webhook     webhook     . .      '
    '. saveWebhook .           testWebhook . .      '
    '. .           .           .           . version';
}

#discordWebhook {
  width: 400px;
  grid-area: webhook;
}

/*#saveWebhookBtn {*/
/*  grid-area: saveWebhook;*/
/*}*/

/*#testWebhookBtn {*/
/*  width: 120px;*/
/*  grid-area: testWebhook;*/
/*}*/

#version {
  grid-area: version;
}

</style>
