const express = require("express");
const router = express.Router();
const categoryServices = require("../services/category");
// get all
router.get("/", async function (req, res, next) {
    try {
        res.json(await categoryServices.getAllCategory(req.query.page));
    } catch (err) {
        console.error(`Error while getting category ${err.message}`);
        next(err);
    }
});

// create category
router.post("/", async function (req, res, next) {
    try {
        res.json(await categoryServices.create(req.body));
    } catch (err) {
        console.error(`error while creating category`, err.message);
        next(err);
    }
});

module.exports = router;
