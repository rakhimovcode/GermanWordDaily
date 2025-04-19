require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
const { getCount,incrementCountIfNewDay} = require("./gotWord");
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>{
  const first_name = ctx.from.first_name || '';
  const last_name = ctx.from.last_name || '' ;
  const fullName = `${first_name} ${last_name}`.trim();
    ctx.reply(`Hello ${fullName}! 👋\n\nWelcome to *Daily German* 🇩🇪✨`, {
    parse_mode: "Markdown",
    ...Markup.inlineKeyboard([
      [Markup.button.callback("📚 Daily Word", "daily")],
      [Markup.button.callback("💬 Help", "help")]
    ])
  });
});
bot.action("help", (ctx) => {
  ctx.reply(`ℹ️ *About This Bot*:

This is *Daily German* 🇩🇪✨

📌 You'll receive:
- 1 German word a day
- English translation
- Pronunciation guide

🧠 Start your language journey with just a tap!

Use /daily or press 📚 Start Learning to begin!

Made with ❤️ by Mark.`, {
    parse_mode: "Markdown",
  });
});
bot.command("help", (ctx) => {
  ctx.reply(
    `ℹ️ *About This Bot*:

This is *Daily German* 🇩🇪✨

📌 You'll receive:
- 1 German word a day
- English translation
- Pronunciation guide

🧠 Start your language journey with just a tap!

Use /daily or press 📚 Start Learning to begin!

Made with ❤️ by Abror.`,
    {
      parse_mode: "Markdown",
    }
  );
});


bot.action("daily", async(ctx) => {
    const words = require("./words.json");
    await incrementCountIfNewDay();
    const int = await getCount();
    const word_of_the_day = words[int];

   ctx.reply(
    `🌸 *Word of the Day* 🌸\n\n` +
    `🇩🇪 *German:* _${word_of_the_day.german}_\n` +
    `🇬🇧 *English:* _${word_of_the_day.english}_\n` +
    `🔊 *Pronunciation:* _${word_of_the_day.pronunciation}_\n\n` +
    `🌟 Come back tomorrow for a new word!`,
    { parse_mode: "Markdown" }
  );
});

bot.command("daily", async (ctx) => {
   const words = require("./words.json");
   await incrementCountIfNewDay();
   const int = await getCount();
   const word_of_the_day = words[int];
  ctx.reply(
    `🌸 *Word of the Day* 🌸\n\n` +
      `🇩🇪 *German:* _${word_of_the_day.german}_\n` +
      `🇬🇧 *English:* _${word_of_the_day.english}_\n` +
      `🔊 *Pronunciation:* _${word_of_the_day.pronunciation}_\n\n` +
      `🌟 Come back tomorrow for a new word!`,
    { parse_mode: "Markdown" }
  );
});
bot.launch()




