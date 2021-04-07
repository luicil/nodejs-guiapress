const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcryptjs = require("bcryptjs");

router.get("/admin/users", (req, res) =>{
    res.send("Listagem de usuários");
});

router.get("/admin/users/create", (req, res) =>{
    res.render("admin/users/create");
});

router.post("/users/create", (req, res) =>{
    var email = req.body.email;
    var password = req.body.password;
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);
    User.create({
        email: email,
        password: hash
    }).then(() =>{
        res.redirect("/admin/users");
    }).catch((error) =>{
        res.redirect("/");
    });
});

module.exports = router;