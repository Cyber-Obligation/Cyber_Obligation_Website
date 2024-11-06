require("dotenv").config()

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    DIALECT: "mysql",
    POOL: {
      max: 5,      // Maximum number of connections in pool
      min: 0,      // Minimum number of connections in pool
      acquire: 30000,  // Maximum time (in ms) to wait for a connection
      idle: 10000      // Maximum time (in ms) to wait for an idle connection before releasing it
    },
    LOGGING: false // Set to true to enable SQL query logging (default is true)
  };
  