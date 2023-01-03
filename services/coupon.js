const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function create(item) {
    const result = await db.query(
        `INSERT INTO coupon (code, discount_value, min_order, discount_max, quantity, start_date, end_date, status) 
        VALUES ('${item.code}', ${item.discount_value},  ${item.min_order}, ${item.discount_max}, ${item.quantity}, '${item.start_date}', '${item.end_date}', ${item.status})`
    );

    let message = "error in creating coupon";
    let success = false;
    if (result.affectedRows) {
        message = "coupon created successfully";
        success = true;
    }

    return { message, success };
}

module.exports = {
    create,
};
