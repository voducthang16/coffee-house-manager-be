var express = require('express');
var router = express.Router();
const Users = require('../model/User');

// Create new user
router.post('/', function(req, res, next) {
    const user = new Users(req.body);
    user.save();
    res.send(user)
})

// Get all user
router.get('/', function(req, res, next) {
    Users.find({}, function(err, user) {
        if (!err) {
            res.json(user);
        } else {
            res.send({
                exist: false
            });
        }
    })
})

// Get 1 user
router.get('/:id', async function(req, res) {
    const id = req.params.id;
    const data = await Users.find({ _id: id }).exec();
    if (data) {
        res.json(data);
    } else {
        res.send({
            exist: false
        });
    }
})

// Get user information
router.post('/login', async function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const data = await Users.findOne({ email: email, password: password }).exec();
    // exist
    if (data) {
        res.send(data);
    } else {
        res.send({
            exist: false
        });
    }
})

// update user
router.patch('/:id', async function(req, res, next) {
    const id = req.params.id;
    await Users.findOneAndUpdate({ _id: id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully' });
    });
})
// delete user
router.delete('/:id', async function(req, res, next) {
    const id = req.params.id;
    await Users.findOneAndRemove({ _id: id }).then(() => {
        res.send({ 'message': 'delete successfully' });
    });
})

module.exports = router;