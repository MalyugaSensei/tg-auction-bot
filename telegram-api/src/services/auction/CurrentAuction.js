const TelegramBot = require("node-telegram-bot-api")
const { bot } = require("@/bot")
const { Auction } = require('@/db/models')
const { getAll } = require("@/services/auction/redisService")
const { client } = require("@/redis-client")
const createAuctionTask = require("@/services/auction/createTask")

/**
 * Get auction by id
 * 
 * @param { TelegramBot.Message } msg 
 * @returns 
 */
const getAuctionById = async (msg) => {
    const chatId = msg.chat.id

    bot.sendMessage(chatId, `
        Текущий аукцион *№${auction.auctionId}* до *${finishedAt.toLocaleString("ru-RU", { timeZone: 'UTC' })}*
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

    return await Auction.findById(auctionId)
}

/**
 * 
 * @param { { [key: String]: any }[] } auctions 
 */
const auctionsMessage = (auctions) => {

    let auctionActiveList = ''
    let auctionPendingList = ''

    for (const auction of auctions) {

        const finishedAt = new Date(!isNaN(Date.parse(auction.finishedAt)) ? auction.finishedAt : auction.finishedAt * 1000).toLocaleString("ru-RU", { timeZone: 'UTC' })
        const startAt = new Date(!isNaN(Date.parse(auction.finishedAt)) ? auction.startAt : auction.startAt * 1000).toLocaleString("ru-RU", { timeZone: 'UTC' })

        if (auction.status === "active") {
            auctionActiveList += `*Аукцион: №${auction.auctionId}*
Лот: ${auction.lotName}, Float: ${auction.lotFloat}
Срок до ${finishedAt}
Последняя ставка: ${auction.lotLastBid ? auction.lotLastBid : auction.lotStartPrice}\n\n`
        }
        if (auction.status === "pending") {
            auctionPendingList += `*Аукцион: №${auction.auctionId}*
Лот: ${auction.lotName}, Float: ${auction.lotFloat}
Начало ${startAt} до ${finishedAt}
Начальная цена: ${auction.lotStartPrice}\n\n`
        }
    }

    let result = '';

    if (auctionActiveList) {
        result += `📣 *Активные аукционы*\n${auctionActiveList}`;
    } else {
        result += `📣 *Активные аукционы*\nНет активных аукционов\n\n`;
    }

    if (auctionPendingList) {
        result += `⏳ *Предстоящие аукционы*\n${auctionPendingList}\n`;
    } else {
        result += `⏳ *Предстоящие аукционы*\nНет предстоящих аукционов\n`;
    }

    return '🔨 Введите номер аукциона, чтобы получить информацию о нем \n\n' + result;
}

/**
 * Get all active auction
 *
 * @param { TelegramBot.Message } msg - the message object
 * @return {Promise} a Promise that resolves to the current auction
 */
const getAllAuctions = async (msg) => {
    const chatId = msg.chat.id
    let auctions = []

    try {
        auctions = await getAll("auction:*", { where: { status: ["active", "pending"] } })

        console.log(auctions)

        if (auctions.length !== 0) {
            bot.sendMessage(chatId, auctionsMessage(auctions), { parse_mode: 'Markdown' })
            return
        }

        auctions = await Auction.find({ status: { $in: ["active", "pending"] } })
            .sort({ createdAt: -1 })
            .exec()

        if (auctions === null || auctions.length === 0) {
            bot.sendMessage(chatId, "Нет активных аукционов")
            return
        }

        bot.sendMessage(chatId, auctionsMessage(auctions), { parse_mode: 'Markdown' })

        for (const auction of auctions) {
            createAuctionTask(auction)
        }
    } catch (error) {
        console.error(error)
        bot.sendMessage(chatId, "Что-то пошло не так")
    }
}

module.exports = {
    getAllAuctions, getAuctionById
}