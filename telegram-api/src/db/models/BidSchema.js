const { Schema, model } = require('mongoose')

const BidSchema = new Schema({
    userId: String,

})

const Bid = model('Bid', BidSchema)

module.exports = {
    Bid
}