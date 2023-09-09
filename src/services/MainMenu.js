const TelegramBot = require('node-telegram-bot-api')
const { bot } = require('../bot')

/**
 * 
 * @param { TelegramBot.Message } msg 
 */
const MainMenu = (msg) => {
    const chatId = msg.chat.id
    msg.from.id
    console.log(`id ${msg.from.id}. ${msg.from.username}, start a chat`)
    let keyboard = [
        [{text: "Текущий аукцион"}],
        [{text: "О нас"}, {text: "Контакты"}]
    ]
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

