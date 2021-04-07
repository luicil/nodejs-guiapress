const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcryptjs = require("bcryptjs");

router.get("/admin/users", (req, res) =>{
    User.findAll().then((users) =>{
        res.render("admin/users/index",{ users });
    }).catch((error) =>{
        res.redirect("/");
    })
});

router.get("/admin/users/create", (req, res) =>{
    res.render("admin/users/create");
});

router.post("/users/create", (req, res) =>{
    var email = req.body.email;
    User.findOne({
        where: {email: email}
    }).then((user) =>{
        if(user == undefined){
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
        } else {
            res.redirect("/users/create");
        }
    });
});

module.exports = router;