const knexConfig = {
    client: 'mysql',
    connection: {
        host: '1sentence.ml',
        user: '1sentence',
        password: '1sen',
        database: 'diarydb',
        charset: 'utf8'
    },
    debug: true,
    pool: {
        max: 10
    },
    acquireConnectionTimeout: 60000
};

const knex = require('knex')(knexConfig);

module.exports = {
    knex,
}