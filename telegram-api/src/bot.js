const TelegramBot = require('node-telegram-bot-api')

const token = '6411905843:AAGt28hKBBhLaYoUbssAGa-gYwdhW87WEjw'
const url = `https://f17a-5-140-129-220.ngrok-free.app/bot/${token}`
const port = 3001

const bot = new TelegramBot(token, {
    webHook: {
        port
    }
})

bot.setWebHook(url)

module.exports = { bot }

