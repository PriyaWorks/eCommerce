const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Product = require('../model/product.model');


exports.getProduct = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    Product.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Product.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage);
        })
        .then(product => {
            res.status(200).json({
                message: 'Fetched categories successfully.',
                product: product,
                totalItems: totalItems
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
 
exports.getAllProduct = (req, res, next) => {
    Product.find()
        .then(products => {
            console.log(products)
            res.status(200).json({
                message: 'Fetched all products successfully.',
                products: products,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createProduct = (req, res, next) => {

    const url = req.protocol + '://' + req.get("host");

    const productname = req.body.productname;
    const productdescription = req.body.productdescription;
    const productcategory = req.body.productcategory;
    const productcolor = req.body.productcolor;
    const productsize = req.body.productsize;
    const productprice = req.body.productprice;
    const productquantity = req.body.productquantity;
    const productbrandname = req.body.productbrandname;
    const productcollectionname = req.body.productcollectionname;
    const productmaterial = req.body.productmaterial;
    const productimageurl = url + "/images/" + req.file.filename;

    const product = new Product({
        productname: productname,
        productdescription: productdescription,
        productcategory: productcategory,
        productcolor: productcolor,
        productsize: productsize,
        productprice: productprice,
        productquantity: productquantity,
        productbrandname: productbrandname,
        productcollectionname: productcollectionname,
        productmaterial: productmaterial,
        productimageurl: productimageurl
    });
    product
        .save()
        .then(result => {
            res.status(201).json({
                message: 'product created successfully!',
                product: product
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateProduct = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const productId = req.params.productId;
    const productname = req.body.productname;
    const productdescription = req.body.productdescription;
    const productcategory = req.body.productcategory;
    const productcolor = req.body.productcolor;
    const productsize = req.body.productsize;
    const productprice = req.body.productprice;
    const productquantity = req.boby.productquantity;
    const productbrandname = req.body.productbrandname;
    const productcollectionname = req.body.productcollectionname;
    const productmaterial = req.body.productmaterial;
    const productimageurl = req.body.productimageurl;

    Product.findById(productId)
        .then(product => {
            if (!product) {
                const error = new Error('Could not find category.');
                error.statusCode = 404;
                throw error;
            }
            product.productname = productname;
            product.productdescription = productdescription;
            product.productcategory = productcategory;
            product.productcolor = productcolor;
            product.productsize = productsize;
            product.productprice = productprice;
            product.productbrandname = productbrandname;
            product.productcollectionname = productcollectionname;
            product.productmaterial = productmaterial;
            product.productimageurl = productimageurl
            return product.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Product updated!', product: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.deleteOne({ "_id": productId })
        .then(result => {
            res.status(200).json({ message: 'Deleted category.' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            if (!product) {
                const error = new Error('Could not find product.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Product fetched.', product: product });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getAllProductByCategory = (req, res, next) => {
    const productcategory = req.params.productcategory;
    Product.find({ "productcategory": productcategory })
        .then(products => {
            res.status(200).json({
                message: 'Fetched all products by category successfully.',
                products: products,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// exports.getAllProductByCategory = (req, res, next) => {
//     const productcategory = req.params.productcategory;
//     const currentPage = +req.query.page;
//     const perPage = +req.query.pagesize;
//     let totalItems;
//     const productQuery = Product.find({ "productcategory": productcategory });
//     if(perPage && currentPage){
//         productQuery
//             .skip(perPage * (currentPage - 1))
//             .limit(perPage);
//     } 
//     productQuery
//         .then(products => {
//             totalItems = products;
//             return Product.count();
//         })
//         .then(count => {
//             res.status(200).json({
//                 message: 'Fetched all products by category successfully.',
//                 products: totalItems,
//                 maxProducts: count
//             });
//         })
//         .catch(err => {
//             if (!err.statusCode) {
//                 err.statusCode = 500;
//             }
//             next(err);
//         });
// };