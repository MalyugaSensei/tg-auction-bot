const { MainMenu } = require('../services/MainMenu')
const { bot } = require('../bot')
const { CurrentAuction } = require('../services/CurrentAuction')
const { CreateAuction } = require('../services/CreateAuction')


bot.onText(/\/start/, MainMenu)
bot.onText(/Меню/, MainMenu)

bot.onText(/Текущий аукцион/, CurrentAuction)

bot.on('message', msg => {
    console.log(msg.web_app_data)
    if (msg.web_app_data?.data) {
        CreateAuction(msg)
    }
})

bot.on('polling_error', (error) => {
    console.log(error)
})
