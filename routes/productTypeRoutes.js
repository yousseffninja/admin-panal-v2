const express = require('express');
const productTypeController = require('../controllers/productTypeController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(productTypeController.getAllTypes)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        productTypeController.createType
    );

router
    .route('/:id')
    .get(productTypeController.getType)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        productTypeController.updateType
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        productTypeController.deleteType
    );

module.exports = router;