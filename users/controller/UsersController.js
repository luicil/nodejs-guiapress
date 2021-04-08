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

router.get("/admin/users/create/:email?", (req, res) =>{
    var email = req.params.email;
    res.render("admin/users/create", { email });
});

router.get("/login/:loginFail?", (req, res) =>{
    var loginFail = req.params.loginFail;
    res.render("admin/users/login", ({ loginFail }));
});

router.get("/logout", (req, res) =>{
    req.session.user = undefined;
    res.redirect("/");
});

router.post("/users/login", (req, res) =>{
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({
        where: { email }
    }).then((user) =>{
        if(user != undefined){
            var ret = bcryptjs.compareSync(password, user.password);
            if(ret){
                req.session.user = {
                    id: user.id,
                    email: user.email
                };

                res.json(req.session.user);
                
            } else {
                res.redirect("/login/true");
            };
        } else {
            res.redirect("/login/true");
        }
    }).catch((error) =>{
        res.redirect("/login/true");
    });
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
            res.render("admin/users/create", { email });
        }
    });
});

module.exports = router;