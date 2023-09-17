const { bot } = require("../bot")

const CurrentAuction = (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, `
Текущий аукцион № до 
Лот:
Float:
Наклейки: []
Начальная цена: 10
    `,
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "+10", callback_data: "10"}, {text: "+50", callback_data: "50"}],
                [{text: "Своя сумма", callback_data: "test"}]
            ]
        }
    }
    )
}

module.exports = {CurrentAuction}