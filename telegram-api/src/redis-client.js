const { createClient } = require('redis');

const client = createClient({
    url: 'redis://redis-server:6379'
});

const initRedis = async () => {
    client
        .on('error', (err) => {
            console.error('Redis error:', err);
            throw new Error("Something went wrong");
        })
        .on('ready', () => {
            client.configSet('notify-keyspace-events', 'Ex');
            console.log('Redis ready');
        });

    client.connect();
};

/**
 * 
 * @param { import('redis').RedisClientType<any, any, any> } client
 * @param {string | Array<string> } channels
 * @param { (message: string, channel?: string) => unknown } listener
 * @return {import('redis').RedisClientType<any, any, any>}
 */
const createSubscriber = (client, channels, listener) => {
    const subscriber = client.duplicate();

    subscriber
        .on('error', (err) => {
            console.error('Redis Subscriber Error:', err);
        })
        .on('ready', async () => {
            await subscriber.subscribe(channels, listener);
            console.log(`Subscriber ready and subscribed on ${channels} events`);
        });

    subscriber.connect();

    return subscriber;
}

module.exports = { initRedis, createSubscriber, client };