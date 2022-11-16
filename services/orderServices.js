const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllOrders(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM orders LIMIT ${offset}, ${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta,
    };
}

async function create(item) {
    const result = await db.query(
        `INSERT INTO orders (user_id, client, type, table_id) 
        VALUES (${item.user_id}, '${item.client}', ${item.type}, ${item.table_id})`
    );

    let message = "error in creating order";

    if (result.affectedRows) {
        message = "order created successfully";
    }

    return { message };
}

async function createDetail(item) {
    const result = await db.query(
        `INSERT INTO orders_detail (order_id, product_id, quantity, price) 
        VALUES (${item.order_id}, ${item.product_id}, ${item.quantity}, ${item.price})`
    );

    let message = "error in creating order detail";

    if (result.affectedRows) {
        message = "order detail created successfully";
    }

    return { message };
}

async function getOrderDetail(page = 1, orderId) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM orders_detail WHERE order_id = ${orderId} LIMIT ${offset}, ${config.listPerPage}`
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
    createDetail,
    getAllOrders,
    getOrderDetail,
};
