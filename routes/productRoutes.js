const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const multer = require("multer");
const path = require("path");

const router = express.Router();


const upload = multer({ dest: path.join(__dirname, 'public/photos')  })

router
    .route('/')
    .get(productController.getAllProducts)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        productController.createProduct
    );

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        upload.single('photo'),
        productController.updateProduct
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        productController.deleteProduct
    )
router
    .route('/:id/love')
    .patch(
        authController.protect,
        productController.loveProduct
    )
router
    .route('/:id/unlove')
    .patch(
        authController.protect,
        productController.unloveProduct
    )

module.exports = router;