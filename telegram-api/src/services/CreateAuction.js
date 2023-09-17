const { bot } = require("../bot")
const TelegramBot = require("node-telegram-bot-api")

const webAppUrl = 'https://172.31.49.151:3000/auction/form'

/**
 * 
 * @param {TelegramBot.Message} msg 
 */
const CreateAuction = (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, "Для перехода в форму создания аукциона нажмите на кнопку *Создать аукцион*",{
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{text: 'Создать аукцион', web_app: {url: webAppUrl}}]
            ]
        }
    })
} 

module.exports = {
    CreateAuction
}