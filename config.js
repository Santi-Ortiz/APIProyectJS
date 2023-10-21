require('dotenv').config();

const config = {
    MONGO_USER : process.env.MONGO_USER,
    MONGO_PASSWORD : process.env.MONGO_PASSWORD
}

module.exports = config;