const mongoose = require('mongoose')

mongoose.connect(`mongodb://db:27017/${process.env.DB_NAME}`)
.then(() => {
    console.log(`MongoDB successfully connected to ${process.env.DB_NAME}`)
})

module.exports = { mongoose }