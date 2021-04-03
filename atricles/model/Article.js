const Sequelize = require("sequelize");
const conn = require("../../database/database");
const Category = require("../../categories/model/Category");

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

Category.hasMany(Article);
Article.belongsTo(Category);

//Article.sync({force: true});

module.exports = Article;
