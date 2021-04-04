const express = require("express");
const router = express.Router();
const Category = require("../../categories/model/Category");
const Article = require("../../atricles/model/Article");
const slugify = require("slugify");

router.get("/articles", (req, res) =>{
    res.send("Rota de artigos");
});

router.get("/admin/articles/new", (req, res) =>{
    Category.findAll().then((categories) =>{
        res.render("admin/articles/new", {categories});
    });
});

router.post("/articles/save", (req, res) =>{
    var title = req.body.title;
    var artigo = req.body.artigo;
    var catID = req.body.categoriaID;
    Article.create({
        title: title,
        slug: slugify(title),
        body: artigo,
        categoryid = catID
    }).then(() =>{

    });

});

module.exports = router;