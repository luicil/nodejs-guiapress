const express = require("express");
const router = express.Router();
const Category = require("../../categories/model/Category");
const Article = require("../../atricles/model/Article");
const slugify = require("slugify");

//#region GET

router.get("/admin/articles", (req, res) =>{
    Article.findAll({
        include:[{model: Category}],
        order: [["id", "DESC"]]
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

router.get("/admin/articles/edit/:id", (req, res) =>{
    var id = req.params.id;
    console.log(id);
    Article.findByPk(id).then((article) =>{
        if(article != undefined){
            Category.findAll().then((categories) =>{
                res.render("admin/articles/editArticle", { article, categories });
            }).catch((error) =>{
                res.redirect("admin/articles");
            });
        } else {
            res.redirect("admin/articles");
        }
    }).catch((error) =>{
        res.redirect("admin/articles");
    });
});

router.get("/articles/page/:num", (req, res) =>{
    const pLimit = 2;
    var page = parseInt(req.params.num);
    var pOffset = (page == 1 ? 0 : page * pLimit);

    Article.findAndCountAll({
        limit: pLimit,
        offset: pOffset
    }).then((articles) =>{
        var next = true;
        if(pOffset + pLimit >= articles.count){
            next = false;
        }
        var result = {
            next: next,
            articles: articles
        }
        res.json(result);
    });
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

router.post("/articles/update", (req, res) =>{
    var articleId = req.body.articleId;
    var title = req.body.title;
    var body = req.body.artigo;
    var categoryId = req.body.categoriaid;
    Article.update({
        title: title,
        body: body,
        categoryId: categoryId,
        slug: slugify(title)
    },{where: {id: articleId}}
    ).then(() =>{
        res.redirect("/admin/articles");
    }).catch((error) =>{
        res.redirect("/");
    });
});


//#endregion

module.exports = router;