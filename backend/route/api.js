const express = require('express');
const APIcontroller = require('../controller/APIcontroller.js');

const router = express.Router();

const initApiRoutes = (app) => {
    router.post('/signup', APIcontroller.signUp);
    router.post('/login', APIcontroller.login);

    router.get('/customers', APIcontroller.getCustomers);
    router.get('/customers/:id', APIcontroller.getCustomerById);
    router.delete('/customers/:id', APIcontroller.deleteCustomer);

    router.get('/items', APIcontroller.getAllItem);
    router.delete('/items/:id', APIcontroller.deleteItem);
    router.get('/items/popular', APIcontroller.getPopularItems);
    router.get('/items/laptop', APIcontroller.getLaptop);
    router.get('/items/phone', APIcontroller.getPhone);
    router.get('/items/other', APIcontroller.getOther);
    router.post('/items', APIcontroller.addItem);

    router.post('/cart/add', APIcontroller.addToCart);
    router.get('/cart/:userId', APIcontroller.getCart);
    router.put('/cart/:userId', APIcontroller.updateCart);
    router.delete('/cart/:userId', APIcontroller.deleteCartItem);
    router.delete('/checkout/:userId', APIcontroller.deleteCart);
    return app.use('/api', router);
}

module.exports = initApiRoutes;