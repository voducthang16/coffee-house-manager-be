const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function create(item) {
    const result = await db.query(
        `INSERT INTO product (category_id, name, description, price, image, status) 
        VALUES (${item.category_id}, '${item.name}', '${item.description}', ${item.price}, '${item.image}', ${item.status})`
    );

    let message = "error in creating category";
    let success = false;
    if (result.affectedRows) {
        message = "product created successfully";
        success = true;
    }

    return { message, success };
}

async function getAllProducts(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT category.name as 'category_name', product.* FROM product INNER JOIN category ON product.category_id = category.id ORDER BY product.id DESC LIMIT ${offset}, ${config.listPerPage}`
    );
    const totalProduct = await db.query(
        "SELECT COUNT(*) as 'total' FROM product"
    );
    const { total } = totalProduct[0];
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta,
        total,
    };
}

async function searchProduct(item, page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM product WHERE name LIKE '%${item.name}%'`
    );
    const totalProduct = await db.query(
        "SELECT COUNT(*) as 'total' FROM product"
    );
    const { total } = totalProduct[0];
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta,
        total,
    };
}

async function getProductsByCategory(page = 1, category_id) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM product WHERE category_id = ${category_id} ORDER BY product.id DESC LIMIT ${offset}, ${config.listPerPage}`
    );
    const totalProduct = await db.query(
        `SELECT COUNT(*) as 'total' FROM product WHERE category_id = ${category_id}`
    );
    const { total } = totalProduct[0];
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta,
        total,
    };
}

module.exports = {
    create,
    getAllProducts,
    getProductsByCategory,
    searchProduct,
};
