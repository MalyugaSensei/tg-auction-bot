const { Schema, model } = require('mongoose')

const AuctionScheme = new Schema({
    number: Number,
    lotName: String,
    lotFloat: Schema.Types.Decimal128,
    lotWear: String,
    stickers: [{
        name: String,
    }],
    lotStartPrice: Number,
    finishAt: Date,
    bidId: { type: Schema.Types.ObjectId, ref: 'Bid' },
})

const Auction = model('Auction', AuctionScheme)

module.exports = {
    Auction
}