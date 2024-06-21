const mongoose = require('mongoose')
const Inc = require('mongoose-sequence')(mongoose)

const AuctionScheme = new mongoose.Schema({
    auctionId: { type: Number, unique: true },
    lotName: { type: String, required: true },
    lotFloat: { type: mongoose.Schema.Types.Decimal128, required: true },
    lotWear: { type: String, required: true },
    stickers: [{
        title: String,
    }],
    lotStartPrice: { type: Number, required: true },
    status: { type: String, enum: ['active', 'pending', 'ended'], required: true },
    startAt: { type: Date, required: true },
    finishedAt: Date,
    bidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid' },
}, { timestamps: true })


AuctionScheme.plugin(Inc, { inc_field: 'auctionId', })

const Auction = mongoose.model('Auction', AuctionScheme)

module.exports = {
    Auction
}