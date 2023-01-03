const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllOrders(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM orders LIMIT ORDER BY id DESC ${offset}, ${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta,
    };
}

// create order
async function create(item) {
    const result = await db.query(
        `INSERT INTO orders (user_id, client, total, discount, discount_reason, 
        surcharge, surcharge_reason, tax, note, payment_type) 
        VALUES (${item.user_id}, '${item.client}', ${item.total}, ${item.discount},
        '${item.discount_reason}', ${item.surcharge}, '${item.surcharge_reason}', 
        ${item.tax}, '${item.note}', ${item.payment_type})`
    );

    let message = "error in creating order";
    let success = false;
    let id;
    if (result.affectedRows) {
        message = "order created successfully";
        success = true;
        [{ id }] = await db.query(
            "SELECT id FROM orders ORDER BY id DESC LIMIT 0, 1;"
        );
    }

    return { message, success, id };
}

// create order details
async function createDetail(item) {
    const result = await db.query(
        `INSERT INTO orders_detail (order_id, product_id, quantity, total) 
        VALUES (${item.order_id}, ${item.product_id}, ${item.quantity}, ${item.total})`
    );

    const update = await db.query(
        `UPDATE product SET quantity = quantity - ${item.quantity}, sold = sold + ${item.quantity} WHERE id = ${item.product_id}`
    );

    let message = "error in creating order detail";
    let success = false;

    if (result.affectedRows) {
        message = "order detail created successfully";
        success = true;
    }

    return { message, success };
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
