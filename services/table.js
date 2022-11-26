const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getTable(page = 1, floor) {
    // const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`SELECT * FROM tables WHERE floor = ${floor}`);
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta,
    };
}
module.exports = {
    getTable,
};
