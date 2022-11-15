const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
// get all
router.get('/', function(req, res, next) {
    Order.find({}).populate('').exec((err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

router.post('/', function(req, res, next) {
    const order = new Order(req.body);
    console.log(order)
    order.save();
    res.send(order);
})

module.exports = router;