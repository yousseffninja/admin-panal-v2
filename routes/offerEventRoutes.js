const express = require('express');
const authController = require('../controllers/authController');
const offerEventController = require('../controllers/offerEventController');


const router = express.Router();

router
    .route('/')
    .get(offerEventController.getAllOfferEvents)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        offerEventController.createOfferEvent
    );

router
    .route('/:id')
    .get(offerEventController.getOfferEvent)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        offerEventController.updateOfferEvent
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        offerEventController.deleteOfferEvent
    );

router
    .route('/:id/uploadPhoto')
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        offerEventController.uploadOfferPhoto,
        offerEventController.uploadPhoto
    )

module.exports = router;
