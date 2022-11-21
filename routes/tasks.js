var express = require('express');
var router = express.Router();
const Tasks = require('../model/Task');

// get all
router.get('/', function(req, res, next) {
    Tasks.find({}).populate('projectId memberId').exec((err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

// get task list by project id
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    Tasks.find({ projectId: id }).populate('memberId').exec((err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

// get task detail
router.get('/detail/:id', function(req, res, next) {
    const id = req.params.id;
    Tasks.find({ _id: id }).populate('projectId memberId').exec((err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

// update task
router.patch('/:id', async function(req, res, next) {
    const id = req.params.id;
    await Tasks.findOneAndUpdate({ _id: id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'Message': 'Updated successfully' });
    });
})

// delete task
router.delete('/:id', async function(req, res, next) {
    const id = req.params.id;
    await Tasks.findOneAndRemove({ _id: id }).then(() => {
        res.send({ 'Message': 'Delete successfully' });
    });
})

router.post('/', function(req, res, next) {
    const task = new Tasks(req.body);
    task.save();
    res.send(task);
})

module.exports = router;