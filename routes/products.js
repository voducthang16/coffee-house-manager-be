const express = require('express');
const router = express.Router();
const Product = require('../model/Product');
// get all
router.get('/', function(req, res, next) {
    Product.find({}).populate('').exec((err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

router.post('/', function(req, res, next) {
    const product = new Product(req.body);
    product.save();
    res.send(product);
})

module.exports = router;