const TelegramBot = require('node-telegram-bot-api')

const token = '6411905843:AAGt28hKBBhLaYoUbssAGa-gYwdhW87WEjw'

const bot = new TelegramBot(token, {polling: true})

module.exports = { bot }

