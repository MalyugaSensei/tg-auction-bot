const { MainMenu } = require('@/services/MainMenu');
const { bot } = require('@/bot');
const { getAllAuctions } = require('@/services/auction/CurrentAuction');
const { createAuction } = require('@/services/auction/CreateAuction');

const initCommands = async () => {
    bot.onText(/\/start/, MainMenu);
    bot.onText(/Меню/, MainMenu);
    bot.onText(/Все аукционы/, getAllAuctions);

    bot.on('web_app_data', msg => {
        console.log(msg.web_app_data);
        if (msg.web_app_data?.data) {
            createAuction(msg);
        }
    });

    console.log('Bot initialized successfully');
}

module.exports = initCommands;
