const { createClient } = require('redis');

const client = createClient({
    url: 'redis://redis-server:6379'
});

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


module.exports = client;