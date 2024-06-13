const client = require('../../redis-client');

const subscriber = client.duplicate();

subscriber
    .on('error', (err) => {
        console.error('Redis Subscriber Error:', err);
    })
    .on('ready', async () => {
        await subscriber.subscribe('__keyevent@0__:expired', async (message) => {
            try {
                if (message.startsWith('auction-start:')) {
                    const auctionId = message.split(':')[1];
                    const auction = await client.hGetAll(`auction:${auctionId}`);
                    if (auction.status === 'pending') {
                        console.log(`Auction ${auctionId} started`);

                        // Обновление статуса аукциона на активный
                        await client.hSet(`auction:${auctionId}`, 'status', 'active');
                        await client.set(`auction-end:${auctionId}`, 'end', { EXAT: Number(auction.endTime) });
                    }
                }

                if (message.startsWith('auction-end:')) {
                    const auctionId = message.split(':')[1];
                    const auction = await client.hGetAll(`auction:${auctionId}`);

                    if (auction.status === 'active') {
                        console.log(`Auction ${auctionId} ended`);
                        await client.hSet(`auction:${auctionId}`, 'status', 'ended');
                    }
                }
            } catch (error) {
                console.error(error)
            }
        });
        console.log('Subscriber ready and subscribed to expired events');
    });

subscriber.connect();
