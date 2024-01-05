const TelegramBot = require('node-telegram-bot-api')
const { bot } = require('../bot')

const webAppUrl = process.env.WEB_APP_URL
let keyboard = [
    [{ text: 'Текущий аукцион' }, { text: 'Создать аукцион', web_app: { url: webAppUrl } }],
    [{ text: 'О нас' }, { text: 'Контакты' }]
]
/**
 * Bot main menu
 * @param { TelegramBot.Message } msg 
 */
const MainMenu = (msg) => {
    const chatId = msg.chat.id
    msg.from.id
    console.log(`id ${msg.from.id}. ${msg.from.username || msg.from.first_name || '' + ' ' + msg.from.last_name || ''}, start a chat`)
    bot.sendMessage(chatId, `
Привет! Это телеграм бот для проведения аукционов по CS:GO 
    `, {
        reply_markup: {
            resize_keyboard: true,
            keyboard,
        }
    })
}

module.exports = {
    MainMenu
}

