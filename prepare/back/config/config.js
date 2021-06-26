const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  development: {
    username: "yusu",
    password: process.env.DB_PASSWORD,
    database: "react-nodebird",
    host: "119.70.203.142",
    port: "3306",
    dialect: "mysql"
  },
  test: {
    username: "yusu",
    password: null,
    database: "react-nodebird",
    host: "119.70.203.142",
    dialect: "mysql"
  },
  production: {
    username: "yusu",
    password: null,
    database: "react-nodebird",
    host: "119.70.203.142",
    dialect: "mysql"
  }
}
