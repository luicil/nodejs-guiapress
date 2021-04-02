const express = require("express");
const app = express();
const port = 80;
const conn = require("./database/database");

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));

conn
    .authenticate()
    .then(() =>{
        console.log("Acesso ao banco ok.");
    })
    .catch((error) =>{
        console.log("Falha de acesso ao banco: " + error);
    });

app.get("/", (req, res) =>{
    res.render("index");
});

app.listen(port,(err) =>{
    if(err){
        console.log("Erro ao iniciar servidor.");
    } else {
        console.log("Servidor iniciado na porta: " + port);
    }
});