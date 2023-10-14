const TelegramBot = require('node-telegram-bot-api')

const token = '6411905843:AAGt28hKBBhLaYoUbssAGa-gYwdhW87WEjw'

const hostUrl = process.env.WEBHOOK_URL
const webHookUrl = `${hostUrl}/bot/${token}`
const port = 3001

const bot = new TelegramBot(token, {
    webHook: {
        port
    }
})

bot.setWebHook(webHookUrl)

module.exports = { bot }