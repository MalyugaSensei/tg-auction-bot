const sendAuctions = (chatId, auctions) => {
    if (!Array.isArray(auctions)) {
        throw new Error('Auctoions must be an array');
    }

}

module.exports = {
    sendAuctions
}