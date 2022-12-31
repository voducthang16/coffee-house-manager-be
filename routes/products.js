const express = require("express");
const router = express.Router();
const productServices = require("../services/product");

// create
router.post("/", async function (req, res, next) {
    try {
        res.json(await productServices.create(req.body));
    } catch (err) {
        console.error(`error while creating product`, err.message);
        next(err);
    }
});

// get all
router.get("/", async function (req, res, next) {
    try {
        res.json(await productServices.getAllProducts(req.query.page));
    } catch (err) {
        console.error(`Error while getting products ${err.message}`);
        next(err);
    }
});

router.get("/category/:id", async function (req, res, next) {
    try {
        res.json(
            await productServices.getProductsByCategory(
                req.query.page,
                req.params.id
            )
        );
    } catch (err) {
        console.error(`Error while getting product by category ${err.message}`);
        next(err);
    }
});

module.exports = router;
