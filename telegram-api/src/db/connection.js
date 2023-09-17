const mongoose = require('mongoose')

const url = `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`
console.log(url)
mongoose.connect(url)
.then(() => {
    console.log(`MongoDB successfully connected to ${process.env.DB_NAME}`)
})

module.exports = { mongoose }