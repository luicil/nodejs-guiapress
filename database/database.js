const Sequelize = require("sequelize");

const conn = new Sequelize("guiapress", "root", "9Singer@9", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = conn;
