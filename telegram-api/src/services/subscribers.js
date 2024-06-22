const { createSubscriber, client } = require("@/redis-client")
const auctionHandler = require("@/services/auction/handleTask")

let subscribers = {}

const initRedisSubscribers = async () => {
    if (!subscribers) {
        subscribers = {
            auctionSub: createSubscriber(client, '__keyevent@0__:expired', auctionHandler),
        }
    }
}

const getSubscribers = () => {
    if (!subscribers) {
        throw new Error("Subscribers have not been initialized. Call initRedisSubscribers first.");
    }
    return subscribers;
};

/**
 * 
 * @param {string} name 
 * @returns 
 */
const getSubscriber = (name) => {
    if (!subscribers) {
        throw new Error("Subscribers have not been initialized. Call initRedisSubscribers first.");
    }

    if (!subscribers[name]) {
        throw new Error(`Subscriber ${name} has not been initialized. Call initRedisSubscribers first.`);
    }

    return subscribers[name];
}

module.exports = {
    initRedisSubscribers,
    getSubscribers,
    getSubscriber,
}