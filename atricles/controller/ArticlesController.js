const express = require("express");
const router = express.Router();
const Category = require("../../categories/model/Category");
const Article = require("../../atricles/model/Article");
const slugify = require("slugify");

//#region GET

router.get("/admin/articles", (req, res) =>{
    Article.findAll({
        include:[{model: Category}]
    }).then((articles) =>{
        res.render("admin/articles/index",{articles});
    });
});

router.get("/admin/articles/new", (req, res) =>{
    Category.findAll().then((categories) =>{
        res.render("admin/articles/new", {categories});
    });
});

router.get("/articles/delete/:id", (req, res) => {
    var id = req.params.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {id}
            }).then(() =>{
                res.redirect("/admin/articles");
            }).catch((error) =>{
                console.log(error);
                res.redirect("/admin/articles");
            });
        } else { res.redirect("/admin/articles"); };
    } else { res.redirect("/admin/articles"); };
});

//#endregion

//#region POST

router.post("/articles/save", (req, res) =>{
    var title = req.body.title;
    var artigo = req.body.artigo;
    var catID = req.body.categoriaid;
    Article.create({
        title: title,
        slug: slugify(title),
        body: artigo,
        categoryId: catID
    }).then(() =>{
        res.redirect("/admin/articles");
    }).catch((err) =>{
        res.redirect("/admin/articles");
    });
});

//#endregion

module.exports = router;