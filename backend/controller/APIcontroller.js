const express = require('express');
const db = require('../service/db.js');

let signUp = async (req, res) => {
    const connection = await db;
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    let result = await connection.execute('SELECT * FROM customer WHERE email = :email', [email]);
    if(result.rows.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    result = await connection.execute('INSERT INTO customer (email, password, name) VALUES (:email, :password, :name)', [email, password, name], { autoCommit: true });
    return res.status(200).json({ message: 'Signup successfully' });
}

let login = async (req, res) => {
    const connection = await db;
    const email = req.body.email;
    const password = req.body.password;
    const result = await connection.execute('SELECT * FROM customer WHERE email = :email AND password = :password', [email, password]);
    if(result.rows.length === 0) {
        return res.status(400).json({ message: 'Login failed' });
    }
    const user = result.rows[0][0];
    const userType = result.rows[0][4];
    console.log(userType)
    return res.status(200).json({ message: 'Login successfully', userId: user, isAdmin: userType === 'admin'});
}

let getCustomerById = async (req, res) => {
    const connection = await db;
    const id = req.params.id;
    const result = await connection.execute('SELECT * FROM customer WHERE id = :id', [id]);
    return res.status(200).json(result.rows);
}

let getPopularItems = async (req, res) => {
    const connection = await db;
    const result = await connection.execute(`SELECT * FROM item WHERE ispopular = :ispopular`, ['Y']);
    return res.status(200).json(result.rows);
}

let getLaptop = async (req, res) => {
    const connection = await db;
    const result = await connection.execute(`SELECT item.id, item.name, item.img, item.price FROM laptop JOIN item on laptop.id = item.id`, []);
    return res.status(200).json(result.rows);
}

let getPhone = async (req, res) => {
    const connection = await db;
    const result = await connection.execute(`SELECT item.id, item.name, item.img, item.price FROM phone JOIN item on phone.id = item.id`, []);
    return res.status(200).json(result.rows);
}

let getOther = async (req, res) => {
    const connection = await db;
    const result = await connection.execute(`SELECT item.id, item.name, item.img, item.price FROM other JOIN item on other.id = item.id`, []);
    return res.status(200).json(result.rows);
}

let addItem = async (req, res) => {
    const connection = await db;

    const name = req.body.name;
    const img = req.body.img;
    const price = req.body.price;
    const isPopular = req.body.isPopular? 'Y' : 'N';

    const productType = req.body.productType;
    const brand = req.body.brand;
    const guarantee = req.body.guarantee || "";
    const weight = req.body.weight || "";

    const result = await connection.execute('INSERT INTO item (id, name, img, price, ispopular) VALUES (item_id_seq.NEXTVAL, :name, :img, :price, :isPopular)', [name, img, price, isPopular], { autoCommit: true });

    if (productType === 'laptop') {
        const temp = await connection.execute('INSERT INTO laptop (id, brand, guarantee, weight) VALUES (item_id_seq.CURRVAL, :brand, :guarantee, :weight)', [brand, guarantee, weight], { autoCommit: true });
    } else if (productType === 'iphone') {
        const temp = await connection.execute('INSERT INTO phone (id, brand, guarantee) VALUES (item_id_seq.CURRVAL, :brand, :guarantee)', [brand, guarantee], { autoCommit: true });
    } else {
        console.log(result);
        const temp = await connection.execute('INSERT INTO other (id, brand) VALUES (item_id_seq.CURRVAL, :brand)', [brand], { autoCommit: true });
    }

    return res.status(200).json({ message: 'Add item successfully' });
}

let getCustomers = async (req, res) => {
    const connection = await db;
    const result = await connection.execute('SELECT * FROM customer ORDER BY id', []);
    return res.status(200).json(result.rows);
}

let deleteCustomer = async (req, res) => {
    const connection = await db;
    const id = req.params.id;
    const result = await connection.execute('DELETE FROM customer WHERE id = :id', [id], { autoCommit: true });
    return res.status(200).json({ message: 'Delete customer successfully' });
}

let getAllItem = async (req, res) => {
    const connection = await db;
    const result = await connection.execute('SELECT * FROM item ORDER BY id', []);
    return res.status(200).json(result.rows);
}

let deleteItem = async (req, res) => {
    const connection = await db;
    const id = req.params.id;
    const result = await connection.execute('DELETE FROM item WHERE id = :id', [id], { autoCommit: true });
    return res.status(200).json({ message: 'Delete item successfully' });
}

let getCart = async (req, res) => {
    const connection = await db;
    const userId = req.params.userId;
    const result = await connection
    .execute(`select itemid, quantity, name, img, cartitem.price from cart, cartitem, item where cart.id = cartitem.cartid and cartitem.itemid = item.id and userid = :userId`, [userId]);
    return res.status(200).json(result.rows);
}

let addToCart = async (req, res) => {
    const connection = await db;
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;
    const price = req.body.price;
    var cartId;
    
    // kiểm tra người dùng đã có cart chưa nếu chưa thì tạo cart mới nếu rồi thì add vào cart
    let result = await connection.execute('Select count(*) from cart where userid = :userId', [userId]);
    if (result.rows[0][0] === 0) {
        const temp = await connection.execute('INSERT INTO cart (userid) VALUES (:userId)', [userId], { autoCommit: true });
    }

    const temp = await connection.execute('SELECT id FROM cart WHERE userid = :userId', [userId]);
    cartId = temp.rows[0][0];
    console.log('Get cart id:', cartId, userId);
    
    result = await connection.execute('SELECT * FROM cartitem WHERE cartid = :cartId AND itemid = :itemId', [cartId, itemId]);
    if (result.rows.length > 0) {
        await connection.execute('UPDATE cartitem SET quantity = quantity + :quantity WHERE cartid = :cartId AND itemid = :itemId', [quantity, cartId, itemId], { autoCommit: true });
    } else {
        await connection.execute('INSERT INTO cartitem (cartid, itemid, quantity, price) VALUES (:cartid, :itemid, :quantity, :price) ', [cartId, itemId, quantity, price], { autoCommit: true });
    }

    return res.status(200).json({ message: 'Add to cart successfully' });
}

let updateCart = async (req, res) => {
    const connection = await db;
    const userId = req.params.userId;

    const itemId = req.body['0'];
    const quantity = req.body['1'];
    const result = await connection.execute('UPDATE cartitem SET quantity = :quantity WHERE cartid = (SELECT id FROM cart WHERE userid = :userId) AND itemid = :itemId', [quantity, userId, itemId], { autoCommit: true });
    return res.status(200).json({ message: 'Update cart successfully' });
}

let deleteCartItem = async (req, res) => {
    const connection = await db;
    const userId = req.params.userId;
    const itemId = req.body.itemId;
    const result = await connection.execute('DELETE FROM cartitem WHERE cartid = (SELECT id FROM cart WHERE userid = :userId) AND itemid = :itemId', [userId, itemId], { autoCommit: true });
    return res.status(200).json({ message: 'Delete item successfully' });
}

let deleteCart = async (req, res) => {
    const connection = await db;
    const userId = req.params.userId;
    const result = await connection.execute('DELETE FROM cartitem WHERE cartid = (SELECT id FROM cart WHERE userid = :userId)', [userId], { autoCommit: true });
    return res.status(200).json({ message: 'Delete cart successfully' });
}

module.exports = { deleteCart, addItem, deleteItem, getAllItem, getCustomers, deleteCustomer, signUp, login, getPopularItems, getLaptop, getPhone, getOther, addToCart, getCart, updateCart, deleteCartItem, getCustomerById };