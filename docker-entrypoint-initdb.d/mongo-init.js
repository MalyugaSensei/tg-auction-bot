db.createUser(
    {
        user: 'auction_user',
        pwd: '12345678',
        roles: [{ role: 'readWrite', db: 'auction_db' }],
    },
);
//db.createCollection('auctions');