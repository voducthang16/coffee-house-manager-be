const express = require("express");
const router = express.Router();
const tableServices = require("../services/table");

router.get("/floor/:id", async function (req, res, next) {
    try {
        res.json(await tableServices.getTable(req.query.page, req.params.id));
    } catch (err) {
        console.error(`Error while getting table list ${err.message}`);
        next(err);
    }
});

router.get("/available", async function (req, res, next) {
    try {
        res.json(await tableServices.getTableAvailable(req.query.page));
    } catch (err) {
        console.error(`Error while getting table available ${err.message}`);
        next(err);
    }
});

module.exports = router;
