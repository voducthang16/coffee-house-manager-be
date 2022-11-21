const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function create(item) {
    const result = await db.query(
        `INSERT INTO category (name, slug, status, _order) 
        VALUES ('${item.name}', '${item.slug}', ${item.status}, ${item._order})`
    );

    let message = "error in creating category";
    let success = false;
    if (result.affectedRows) {
        message = "category created successfully";
        success = true;
    }

    return { message, success };
}

async function getAllCategory(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM category LIMIT ${offset}, ${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta,
    };
}

module.exports = {
    create,
    getAllCategory,
};
