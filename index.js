const express = require("express");
const app = express();
const port = 80;
const pLimit = 2;
const session = require("express-session");
const conn = require("./database/database");
const categoriesController = require("./categories/controller/CategoriesController");
const articlesController = require("./atricles/controller/ArticlesController");
const usersController = require("./users/controller/UsersController");
const Article = require("./atricles/model/Article");
const Category = require("./categories/model/Category");
const User = require("./users/model/User");

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
    name: "guiapress",
    secret: "luicil",
    cookie:{
        maxAge: 30000 // 30 segundos
    },
    resave: true,
    saveUninitialized: true
}));

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

conn
    .authenticate()
    .then(() =>{
        console.log("Acesso ao banco ok.");
    })
    .catch((error) =>{
        console.log("Falha de acesso ao banco: " + error);
    });

app.get("/:slug?", (req, res) =>{
    var slug = req.params.slug;
    var cats = null;
    Category.findAll().then((categories) =>{
        cats = categories;
    });
    if(slug == undefined){
        Article.findAll({
            order: [["id", "DESC"]],
            limit: pLimit
        }).then((articles) =>{
            res.render("index",{ articles, categories: cats });
        });
    } else {
        Article.findOne({
            where: { slug }
        }).then((article) =>{
            if(article != undefined){
                res.render("article",{ article, categories: cats });
            } //else {
                //res.render("/");
            //}
        });
    }
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: { slug },
        include: [{ model: Article }]
    }).then((category) =>{
        if(category != undefined){
            Category.findAll().then((categories) =>{
                res.render("index",{ articles: category.articles, categories });
            }).catch((error) =>{
                res.render("/");
            });
        } else {
            res.render("/");
        };
    }).catch((error) =>{
        res.render("/");
    })
});

app.listen(port,(err) =>{
    if(err){
        console.log("Erro ao iniciar servidor.");
    } else {
        console.log("Servidor iniciado na porta: " + port);
    }
});