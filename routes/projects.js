var express = require('express');
var router = express.Router();
const Projects = require('../model/Project');
const Tasks = require('../model/Task');
router.get('/', function(req, res, next) {
    Projects.find({}).populate('leader members').exec((err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    Projects.find({ _id: id }).populate('leader members').exec((err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

router.post('/', function(req, res, next) {
    const project = new Projects(req.body);
    project.save();
    res.send(project);
})

// update project
router.patch('/:id', async function(req, res, next) {
    const id = req.params.id;
    await Projects.findOneAndUpdate({ _id: id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'Message': 'Updated successfully' });
    });
})

// delete project
router.delete('/:id', async function(req, res, next) {
    const id = req.params.id;
    await Projects.findOneAndRemove({ _id: id }).then((removedProject) => {
        Tasks.deleteMany({ projectId: removedProject._id}).then(() => {
            res.send({ 'Message': 'Delete successfully' })
        })
    })
})

module.exports = router;