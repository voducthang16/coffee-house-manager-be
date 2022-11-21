const express = require("express");
const router = express.Router();
const Order = require("../model/Order");
const orderServices = require("../services/order");
// get all
router.get("/", async function (req, res, next) {
    try {
        res.json(await orderServices.getAllOrders(req.query.page));
    } catch (err) {
        console.error(`error while getting order ${err.message}`);
        next(err);
    }
});

// create order
router.post("/", async function (req, res, next) {
    try {
        res.json(await orderServices.create(req.body));
    } catch (err) {
        console.error(`error while creating order`, err.message);
        next(err);
    }
});

// create order details
router.post("/order-detail", async function (req, res, next) {
    try {
        res.json(await orderServices.createDetail(req.body));
    } catch (err) {
        console.error(`error while creating order detail`, err.message);
        next(err);
    }
});

module.exports = router;
