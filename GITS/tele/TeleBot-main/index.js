require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TG_WALLET_BOT_TOKEN);

bot.command("start", (ctx) => {
  const message = `Welcome to the TeleBot By OrdLibrary.com`;
  ctx.reply(message);
});

bot.launch();