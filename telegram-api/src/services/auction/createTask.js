const { Auction } = require('@/db/models');
const { client } = require('@/redis-client');
const { createTask } = require('@/services/auction/redisService');
const { Document } = require('mongoose');

/**
 * 
 * @param { import('@/db/models/AuctionSchema').AuctionDocument |  } auction 
**/
async function createAuctionTask(auction) {
    const { id, auctionId, lotStartPrice, lotFloat, stickers, lotName, lotWear, startAt, finishedAt } = auction
    try {
        console.log(startAt)
        //const defaultTimer = 24 * 60 * 60 * 1000
        //const defaultTimer = 10
        const startAtUTC = Math.floor(new Date(startAt).getTime() / 1000);
        const endTime = Math.floor(new Date(finishedAt).getTime() / 1000);

        const status = new Date().getTime() > new Date(startAt).getTime() ? 'active' : 'pending'

        const data = {
            id, auctionId, lotName, lotStartPrice, lotWear,
            stickers: stickers.toString(),
            lotFloat: lotFloat.toString(),
            startAt: startAtUTC,
            finishedAt: endTime,
            status
        }
        await createTask(id, 'auction', data);
        if (status === 'pending') {
            await client.set(`auction-start:${id}`, 'start', { EXAT: startAtUTC });
        } else {
            await client.set(`auction-end:${id}`, 'end', { EXAT: endTime });
            await Auction.findByIdAndUpdate(id, { status: 'active' });
        }

        console.log('Auction task created')
    } catch (error) {
        console.error(error)
    }
}

module.exports = createAuctionTask;