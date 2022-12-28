const express = require('express');
const categoryController = require('../controllers/CategoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(categoryController.getAllCategories)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        categoryController.createCategory
    );

router
    .route('/:id')
    .get(categoryController.getCategory)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        categoryController.updateCategory
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        categoryController.deleteCategory
    );

router
    .route('/:id/uploadPhoto')
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        categoryController.uploadCategoryPhoto,
        categoryController.uploadPhoto
    )

module.exports = router;