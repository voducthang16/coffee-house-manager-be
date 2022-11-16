const express = require("express");
const router = express.Router();
const Order = require("../model/Order");
const orderServices = require("../services/orderServices");
// get all
router.get("/", async function (req, res, next) {
    try {
        res.json(await orderServices.getAllOrders(req.query.page));
    } catch (err) {
        console.error(`error while getting order ${err.message}`);
        next(err);
    }
});

router.post("/", async function (req, res, next) {
    try {
        res.json(await orderServices.create(req.body));
    } catch (err) {
        console.error(`error while creating order`, err.message);
        next(err);
    }
});

module.exports = router;
