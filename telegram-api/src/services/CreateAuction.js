const { bot } = require("../bot")
const TelegramBot = require("node-telegram-bot-api")
const { Auction } = require('../db/models')
const validator = require('validator/validator')

const wearArray = [
    'factory_new',
    'minimal_wear',
    'field_-_tested',
    'well_-_worm',
    'battle_-_scarred',
]

/**
 * 
 * @param { Object } formData
 * @param { String } formData.lotName
 * @param { String } formData.lotFloat
 * @param { String } formData.lotWear
 * @param { Number } formData.lotStartPrice
 * @param { Array } formData.lotStickers
 * @param { Date } formData.finishAt 
 * @returns { Boolean }
 */
const ValidateAuctionForm = ({ lotName, lotFloat, lotWear, lotStartPrice, lotStickers, finishAt }) => {
    if (validator.isEmpty(lotName)) {
        return false;
    }

    if (!validator.isFloat(lotFloat, { min: 0, max: 1 })) {
        return false;
    }

    if (!validator.isIn(lotWear, wearArray)) {
        return false;
    }

    if (validator.isNumeric(lotStartPrice)) {
        return false;
    }

    if (Array.isArray(lotStickers)) {
        return false;
    }

    if (validator.isDate(finishAt) && finishAt <= new Date()) {
        return false;
    }

    return true;
}

/**
 * 
 * @param {TelegramBot.Message} msg 
 */
const CreateAuction = (msg) => {
    const chatId = msg.chat.id
    console.log(msg.web_app_data.data)
    const formData = JSON.parse(msg.web_app_data.data)

    const validate = ValidateAuctionForm(formData)

    if (!validate) {
        bot.sendMessage(chatId, "Что-то пошло не так")
    }
    console.log(formData)
    const auction = new Auction({
        lotName: formData.lotName,
        lotFloat: formData.lotFloat,
        lotWear: formData.lotWear,
        lotStartPrice: formData.lotStartPrice,
        stickers: formData.lotStickers
    })

    auction.save()
}

module.exports = {
    CreateAuction
}