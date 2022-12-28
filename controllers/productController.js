const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');
const {promisify} = require("util");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel')

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product, { path: 'reviews' });
exports.loveProduct = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const urlProduct = req.params.id;
    const freshUser = await User.findByIdAndUpdate(decoded.id, {
        $push: { "favouriteProduct":  urlProduct  },
    });
    res.status(200).json({
        status: 'success',
        data: freshUser,
    },{
        new: true,
        runValidators: true,
    });
});
exports.unloveProduct = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const urlProduct = req.params.id;
    const freshUser = await User.findByIdAndUpdate(decoded.id, {
        $pullAll: { "favouriteProduct":  urlProduct  }
    },{
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: freshUser,
    });
});
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product)