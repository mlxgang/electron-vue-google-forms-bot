const { chromium } = window.require('playwright-chromium');
const fs = window.require('fs');
const Discord = window.require('discord.js');

export async function createBrowser(index, task) {
  if (this.taskClass === 'taskStart') {
    switch (task.type) {
      case 'raffle': {
        const profile = JSON.parse(
          fs.readFileSync(`./profiles-raffle/${task.profile}.json`),
        );
        const browser = await chromium.launch({
          headless: this.tasks[index].mode === 'true',
          // executablePath:
          //   'C:/Program Files/mrb/resources/app.asar.unpacked/node_modules/playwright-chromium/.local-browsers/chromium-901522/chrome-win/chrome.exe',
        });
        const page = await browser.newPage();
        await page.goto(this.tasks[index].url);
        this.statusTask(index, 'filling');
        await page.fill('[type="email"]', profile.email);
        await page.fill('input:below(:text("имя"))', profile.name);
        await page.fill('input:below(:text("фамилию"))', profile.surname);
        await page.click(`[aria-label="${profile.sex}"]`);
        await page.fill('input:below(:text("паспорта"))', profile.numberId);
        await page.click('input[type="date"]');
        for (let i = 0; i < 2; i++) {
          await page.keyboard.press('ArrowLeft');
        }
        await page.keyboard.type(profile.dateBirth);
        await page.fill('input:below(:text("instagram"))', profile.instagram);
        await page.fill('input:below(:text("город"))', profile.city);
        await page.fill('input:below(:text("телефона"))', profile.phone);
        await page.click(`[aria-label="${this.tasks[index].size}US"]`);
        await page.click('[aria-label="Да"]');
        await page.click('text=Даю согласие на обработку моих персональных данных *Да >> [aria-label="Да"]');
        await page.click('text=Отправить');
        await browser.close();
        this.statusTask(index, 'idle');
        this.taskClass = 'taskStart';
        break;
      }
      case 'eldorado': {
        const profile = JSON.parse(
          fs.readFileSync(
            `./profiles-eldorado/${this.tasks[index].profile}.json`,
          ),
        );
        const browser = await chromium.launch({
          headless: this.tasks[index].mode === 'true',
          // executablePath:
          //   'C:/Program Files/mrb/resources/app.asar.unpacked/node_modules/playwright-chromium/.local-browsers/chromium-901522/chrome-win/chrome.exe',
        });
        const page = await browser.newPage();
        await page.goto(this.tasks[index].url);
        await page.fill(
          '[placeholder="Имя и Фамилия"]',
          `${profile.name} ${profile.surname}`,
        );
        await page.fill('[placeholder="E-mail"]', profile.email);
        await page.fill('[placeholder="Телефон"]', profile.phone);
        await page.fill(
          '[placeholder="Номер бонусной карты Эльдорадо"]',
          profile.card,
        );
        await page.click('text=Согласие на обработку Персональных данных');
        await page.click('text=Отправить');
        await browser.close();
        this.statusTask(index, 'idle');
        this.taskClass = 'taskStart';
        break;
      }
    }

    const webhookTXT = fs.readFileSync('./webhook.txt', 'utf8');
    if (webhookTXT !== '') {
      const webhookSplit = webhookTXT.split('/');
      const taskEmbed = new Discord.MessageEmbed()
        .setTitle('Заявка успешно заполнена!')
        .setColor('#6c00ca')
        .setFooter(
          `mrb • ${this.version}`,
          'https://i.imgur.com/KboX8fT.jpg',
        )
        .addField('Профиль', `||${this.tasks[index].profile}||`, true)
        .addField('Магазин', `${this.tasks[index].store}`, true)
        .addField('Размер', `${this.tasks[index].size}`, true)
        .addField(
          'Mode',
          `${this.tasks[index].mode === 'true' ? 'headless' : 'browser'}`,
          false,
        );
      const webhookClient = new Discord.WebhookClient(
        webhookSplit[5],
        webhookSplit[6],
      );
      webhookClient.send('', {
        username: 'mlxgang raffle bot',
        avatarURL: 'https://i.imgur.com/KboX8fT.jpg',
        embeds: [taskEmbed],
      });
    }

    const adminEmbed = new Discord.MessageEmbed()
      .setTitle('Заявка успешно заполнена!')
      .setColor('#6c00ca')
      .addField('Магазин', `${this.tasks[index].store}`, true)
      .addField(
        'Mode',
        `${this.tasks[index].mode === 'true' ? 'headless' : 'browser'}`,
        false,
      )
      .addField('Версия', this.version, true)
      .addField('Ключ', localStorage.getItem('appKey'), true);
    const webhookClientAdmin = new Discord.WebhookClient(
      '868682216455168011',
      'woaP_18fXT-ZtwJYHHd4loibKW4EkROsGhDRrO5n6wS66aHwtTVqAVmvst1bO_Rn4gf3',
    );
    webhookClientAdmin.send('', {
      username: 'mlxgang raffle bot',
      avatarURL: 'https://i.imgur.com/KboX8fT.jpg',
      embeds: [adminEmbed],
    });
  }
}
