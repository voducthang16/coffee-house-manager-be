const express = require("express");
const router = express.Router();
const orderServices = require("../services/order");
// get all
router.get("/:id", async function (req, res, next) {
    const orderId = req.params.id;
    try {
        res.json(await orderServices.getOrderDetail(req.query.page, orderId));
    } catch (err) {
        console.error(`error while getting order detail: ${err.message}`);
        next(err);
    }
});

router.post("/", async function (req, res, next) {
    try {
        res.json(await orderServices.createDetail(req.body));
    } catch (err) {
        console.error(`error while creating order detail: ${err.message}`);
        next(err);
    }
});

module.exports = router;
