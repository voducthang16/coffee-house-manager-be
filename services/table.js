const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getTable(page = 1, floor) {
    const rows = await db.query(`SELECT * FROM tables WHERE floor = ${floor}`);
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta,
    };
}

async function getTableAvailable(page = 1) {
    const rows = await db.query(`SELECT * FROM tables WHERE status = 0`);
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta,
    };
}

module.exports = {
    getTable,
    getTableAvailable,
};
