const mongoose = require('mongoose')

const initDataBase = async () => {
    try {
        const url = `mongodb://auction_user:12345678@${process.env.DB_HOST}:27017/${process.env.DB_NAME}`
        await mongoose.connect(url)
        console.log(`MongoDB successfully connected to ${process.env.DB_NAME}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { mongoose, initDataBase }