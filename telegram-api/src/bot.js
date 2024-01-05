const TelegramBot = require('node-telegram-bot-api')

const token = process.env.NODE_ENV === 'development' ? process.env.TOKEN_API_TEST : process.env.TOKEN_API;

const hostUrl = process.env.WEBHOOK_URL;
const webHookUrl = `${hostUrl}/bot/${token}`;
const port = 3001;

const bot = new TelegramBot(token, {
    testEnvironment: true,
    webHook: {
        port,
    },
})

bot.setWebHook(webHookUrl)

bot.on('webhook_error', (error) => {
    console.log(error)
})

bot.on('polling_error', (error) => {
    console.log(error)
})

module.exports = { bot }