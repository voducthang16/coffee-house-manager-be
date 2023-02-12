const express = require("express");
const router = express.Router();
const couponServices = require("../services/coupon");

router.get("/", async function (req, res, next) {
    try {
        res.json(await couponServices.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting coupon list ${err.message}`);
        next(err);
    }
});

// create coupon
router.post("/", async function (req, res, next) {
    try {
        res.json(await couponServices.create(req.body));
    } catch (err) {
        console.error(`error while creating coupon`, err.message);
        next(err);
    }
});

module.exports = router;
