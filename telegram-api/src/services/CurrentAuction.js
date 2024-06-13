const TelegramBot = require("node-telegram-bot-api")
const { bot } = require("../bot")
const { Auction } = require('../db/models')

/**
 * Get last active auction
 *
 * @param { TelegramBot.Message } msg - the message object
 * @return {Promise} a Promise that resolves to the current auction
 */
const CurrentAuction = async (msg) => {
    const chatId = msg.chat.id
    /** @type { any } */
    const auction = await Auction.findOne({ active: true })
        .sort({ createdAt: -1 })
        .exec()
    console.log(auction)

    const finishAt = new Date(auction.finishAt)

    let stickers = '';
    console.log(auction.stickers)
    if (auction.stickers.length) {
        auction.stickers.forEach((sticker) => {
            stickers += sticker.title + '\n'
        })
    } else {
        stickers = 'Нет стикеров'
    }

    bot.sendMessage(chatId, `
Текущий аукцион *№${auction.auctionId}* до *${finishAt.toLocaleString("ru-RU", { timeZone: 'UTC' })}*
Лот: ${auction.lotName}
Float: ${auction.lotFloat}
Наклейки: ${stickers}
Начальная цена: ${auction.lotStartPrice}
    `,
        {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: "+10", callback_data: "10" }, { text: "+50", callback_data: "50" }],
                    [{ text: "Своя сумма", callback_data: "test" }]
                ]
            }
        },
    )
}

module.exports = { CurrentAuction }