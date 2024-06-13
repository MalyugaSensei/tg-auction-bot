const { Schema, model } = require('mongoose')
const { AutoIncrement } = require('../connection')

const AuctionScheme = new Schema({
    auctionId: { type: Number, unique: true },
    lotName: { type: String, required: true },
    lotFloat: { type: Schema.Types.Decimal128, required: true },
    lotWear: { type: String, required: true },
    stickers: [{
        name: String,
    }],
    lotStartPrice: { type: Number, required: true },
    startAt: { type: Date, required: true },
    finishedAt: Date,
    bidId: { type: Schema.Types.ObjectId, ref: 'Bid' },
}, { timestamps: true })

AuctionScheme.plugin(AutoIncrement, { inc_field: 'auctionId', })

const Auction = model('Auction', AuctionScheme)

module.exports = {
    Auction
}