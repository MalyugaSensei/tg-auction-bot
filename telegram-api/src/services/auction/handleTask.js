const { Auction } = require('@/db/models');
const { client } = require('@/redis-client');

const subscriber = client.duplicate();

subscriber
    .on('error', (err) => {
        console.error('Redis Subscriber Error:', err);
    })
    .on('ready', async () => {
        await subscriber.subscribe('__keyevent@0__:expired', async (message) => {
            const ACTIVE = 'active';
            const PENDING = 'pending';
            const ENDED = 'ended';
            try {
                if (message.startsWith('auction-start:')) {
                    const auctionId = message.split(':')[1];
                    const auction = await client.hGetAll(`auction:${auctionId}`);
                    if (auction.status === PENDING) {
                        console.log(`Auction ${auctionId} started`);

                        // Обновление статуса аукциона на активный
                        client.hSet(`auction:${auctionId}`, 'status', ACTIVE);
                        await client.set(`auction-end:${auctionId}`, 'end', { EXAT: Number(auction.finishedAt) });
                        await Auction.findByIdAndUpdate(auctionId, { status: ACTIVE });
                    }
                }

                if (message.startsWith('auction-end:')) {
                    const auctionId = message.split(':')[1];
                    const auction = await client.hGetAll(`auction:${auctionId}`);

                    if (auction.status === ACTIVE) {
                        console.log(`Auction ${auctionId} ended`);
                        await client.hSet(`auction:${auctionId}`, 'status', ENDED);
                        await Auction.findByIdAndUpdate(auctionId, { status: ENDED });
                    }
                }
            } catch (error) {
                console.error(error)
            }
        });
        console.log('Subscriber ready and subscribed to expired events');
    });

subscriber.connect();
