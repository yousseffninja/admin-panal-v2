const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, 'public')  })

const router = express.Router();

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
        productController.updateProduct,
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        productController.deleteProduct
    )

router
    .route('/:id/uploadPhoto')
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        upload.single('photo'),
        productController.uploadPhoto
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