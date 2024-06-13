const client = require('../../redis-client');
const createTask = require('../CreateTask');

/**
 * 
 * @param { string } id 
 * @param { any } startAt
*/
async function createAuctionTask(id, startAt) {
    try {
        console.log(startAt)
        //const defaultTimer = 24 * 60 * 60 * 1000
        const defaultTimer = 10
        const startAtUTC = Math.floor(new Date(startAt).getTime() / 1000);
        const endTime = startAtUTC + defaultTimer;

        const status = new Date().getTime() > startAt ? 'active' : 'pending'

        const data = {
            startTime: startAtUTC,
            endTime: endTime,
            status
        }

        await createTask(id, 'auction', data);
        if (status === 'pending') {
            await client.set(`auction-start:${id}`, 'start', { EXAT: startAtUTC });
        } else {
            await client.set(`auction-end:${id}`, 'end', { EXAT: endTime });
        }

        console.log('Auction task created')
    } catch (error) {
        console.error(error)
    }
}

module.exports = createAuctionTask;