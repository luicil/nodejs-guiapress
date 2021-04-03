const express = require("express");
const router = express.Router();
const Category = require("../model/Category");
const slugify = require("slugify");

router.get("/categories", (req, res) =>{
    res.send("Rota de categorais");
});

router.get("/admin/categories/new", (req, res) =>{
    res.render("admin/categories/new");

});

router.get("/admin/categories", (req, res) =>{
    res.render("admin/categories/index");
});

router.post("/categories/save", (req, res) =>{
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() =>{
            res.redirect("admin/categories/index");
        })
    } else {
        res.redirect("/admin/categories/new")
    }

});

module.exports = router;