const { MainMenu } = require('../services/MainMenu')
const { bot } = require('../bot')
const { CurrentAuction } = require('../services/CurrentAuction')


bot.onText(/\/start/, MainMenu)
bot.onText(/Меню/, MainMenu)

bot.onText(/Текущий аукцион/, CurrentAuction)

bot.on('polling_error', (error) => {
    console.log(error)
} )
