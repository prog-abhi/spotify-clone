const { Sequelize } = require("sequelize");
const {
  development: { username, password, database, host },
} = require("./config/config");

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite

// const sequelize = new Sequelize(`postgres://${username}:${password}@example.com:5432/dbname`); // Example for postgres

// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "postgres",
});
sequelize
  .authenticate()
  .then((value) => console.log("Connection has been established successfully"))
  .catch((error) => console.error("Unable to connect, ", error));
