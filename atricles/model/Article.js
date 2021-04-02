const Sequelize = require("sequelize");
const conn = require("../../database/database");

const Article = conn.define("articles",{
    title:{
        type: Sequelize.STRING,
        allowNulls: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNulls: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNulls: false
    }
});

module.exports = Article;
