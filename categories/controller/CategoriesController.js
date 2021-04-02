const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) =>{
    res.send("Rota de categorais");
});

router.get("/admin/categories/new", (req, res) =>{
    res.send("Rota para novas categorias");
});

module.exports = router;