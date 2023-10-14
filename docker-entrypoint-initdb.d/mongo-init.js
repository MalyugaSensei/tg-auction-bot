db.getSiblingDB('admin').auth(
    process.env.MONGO_INITDB_ROOT_USERNAME,
    process.env.MONGO_INITDB_ROOT_PASSWORD,
)

db.createUser(
    {
        user: 'auction_user',
        pwd: '12345678',
        roles: [{ role: 'readWrite', db: 'auction_db' }],
    },
);

