const express = require("express");
const router = express.Router();
const couponServices = require("../services/coupon");

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
