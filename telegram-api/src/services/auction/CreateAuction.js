const TelegramBot = require("node-telegram-bot-api")
const validator = require('validator/validator')

const { bot } = require("@/bot")
const { Auction } = require('@/db/models')
const createAuctionTask = require("@/services/auction/createTask")

const wearArray = [
    'factory_new',
    'minimal_wear',
    'field_-_tested',
    'well_-_worm',
    'battle_-_scarred',
]

/**
 * This function validate user data from form
 * @param { Object } formData
 * @param { String } formData.lotName
 * @param { String } formData.lotFloat
 * @param { String } formData.lotWear
 * @param { Number } formData.lotStartPrice
 * @param { Array } formData.lotStickers
 * @param { Date } formData.finishAt 
 * @returns { Promise<boolean> }
 */
const ValidateAuctionForm = ({ lotName, lotFloat, lotWear, lotStartPrice, lotStickers, finishAt }) => {
    return new Promise((resolve, reject) => {
        if (validator.isEmpty(lotName)) {
            throw Error('lotName is not valid');
        }

        if (!validator.isFloat(lotFloat.toString(), { min: 0, max: 1 })) {
            throw Error('lotFloat is not valid');
        }

        if (!validator.isIn(lotWear, wearArray)) {
            throw Error('lotWear is not valid');
        }

        if (!validator.isNumeric(lotStartPrice)) {
            throw Error('lotStartPrice is not valid');
        }

        if (!Array.isArray(lotStickers)) {
            throw Error('lotStickers is not valid');
        }

        if (!validator.isDate(finishAt) && finishAt <= new Date()) {
            throw Error('finishAt is not valid');
        }

        resolve(true);
    })
}

/**
 * 
 * @param {TelegramBot.Message} msg 
 */
const createAuction = async (msg) => {
    const chatId = msg.chat.id
    //console.log(msg.web_app_data.data)
    const formData = JSON.parse(msg.web_app_data.data)

    try {
        await ValidateAuctionForm(formData)
        console.log(formData)
        const auction = new Auction({
            lotName: formData.lotName,
            lotFloat: formData.lotFloat,
            lotWear: formData.lotWear,
            lotStartPrice: formData.lotStartPrice,
            stickers: formData.lotStickers,
            status: new Date().getTime() > formData.startAt ? 'active' : 'pending',
            startAt: formData.startAt,
            finishedAt: new Date(new Date(formData.startAt).getTime() + 24 * 60 * 60 * 1000),
        })

        const savedAuction = await auction.save()
        console.log(savedAuction)
        await createAuctionTask(savedAuction)
    } catch (error) {
        console.log(error)
        bot.sendMessage(chatId, "Что-то пошло не так")
    }

}

module.exports = {
    createAuction
}