const express = require("express");
const router = express.Router();
const Category = require("../../categories/model/Category");
const Article = require("../../atricles/model/Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) =>{
    res.render("admin/articles/index");
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
        categoryid: catID
    }).then(() =>{
        res.redirect("/admin/articles");
    });

});

module.exports = router;