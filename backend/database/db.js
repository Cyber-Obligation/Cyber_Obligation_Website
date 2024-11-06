const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");


const db = {
    Op: Sequelize.Op
};


// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
host: config.HOST,
dialect: config.DIALECT,
pool: config.POOL,   // Connection pool settings
logging: config.LOGGING  // Enable/disable SQL logging
});



// Test the connection
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });


// Create Schema using sequelize



// Create db.sync() for sequelize and seed the data if ncessary



// Export DB
module.exports = db;

