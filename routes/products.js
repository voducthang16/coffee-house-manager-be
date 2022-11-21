const express = require("express");
const router = express.Router();
const productServices = require("../services/product");
// get all
router.get("/", async function (req, res, next) {
    try {
        res.json(await productServices.getAllProducts(req.query.page));
    } catch (err) {
        console.error(
            `Error while getting programming languages ${err.message}`
        );
        next(err);
    }
});

module.exports = router;
