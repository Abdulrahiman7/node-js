const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getDetails)

router.get('/cart', shopController.getCart);

router.post('/cart',shopController.postCart);

router.post('/delete',shopController.postDelete)

router.get('/orders', shopController.getOrders);

router.post('/orders',shopController.postOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
