require('module-alias/register')
const { initTelegramBot } = require('@/bot')
const initCommands = require('@/commands')
const { initDataBase } = require('@/db/connection')
const { initRedis } = require('@/redis-client')
const { initRedisSubscribers } = require('@/services/subscribers')

const startApp = async () => {
    try {
        await initTelegramBot()
        await initCommands()
        await initDataBase()
        await initRedis()
        await initRedisSubscribers()
    } catch (error) {
        console.error('Error starting app', error)
        process.exit(1)
    }
}

startApp()
