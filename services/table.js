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

async function changeTableStatus(item) {
    const result = await db.query(
        `UPDATE tables SET status = '${item.status}' WHERE id = ${item.tableId}`
    );
    let message = "Error in updating table status";

    if (result.affectedRows) {
        message = "Table status updated successfully";
    }
    return {
        message,
    };
}

module.exports = {
    getTable,
    getTableAvailable,
    changeTableStatus,
};
