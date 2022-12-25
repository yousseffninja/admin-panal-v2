const productType = require('../models/productTypeModel');
const factory = require('./handlerFactory');

exports.getAllTypes = factory.getAll(productType);
exports.getType = factory.getOne(productType);
exports.createType = factory.createOne(productType);
exports.updateType = factory.updateOne(productType);
exports.deleteType = factory.deleteOne(productType);