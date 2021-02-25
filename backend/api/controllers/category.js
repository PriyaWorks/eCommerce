const fs = require('fs');
const path = require('path');
const multer = require('multer');

const { validationResult } = require('express-validator/check');

const Category = require('../model/category.model'); 

exports.getCategories = (req, res, next) => {
    const currentPage = +req.query.page;
    const perPage = +req.query.pagesize;
    let totalItems;
    const categoryQuery = Category.find();
    if(perPage && currentPage){
        categoryQuery
            .skip(perPage * (currentPage - 1))
            .limit(perPage);
    } 
    categoryQuery
        .then(categories => {
            totalItems = categories;
            return Category.count();
        })
        .then(count => {
            res.status(200).json({
                message: 'Fetched categories successfully.',
                categories: totalItems,
                maxCategories: count
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getAllCategories = (req, res, next) => {

    Category.find()
        .then(categories => {
            res.status(200).json({
                message: 'Fetched categories successfully.',
                categories: categories,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId)
        .then(category => {
            if (!category) {
                const error = new Error('Could not find category.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Category fetched.', category: category });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
 
exports.createCategory = (req, res, next) => {
 
    const url = req.protocol + '://' + req.get("host");

    const categoryname = req.body.categoryname;
    const categorydescription = req.body.categorydescription;
    const categoryimageurl = url + "/images/" + req.file.filename;

    const category = new Category({
        categoryname: categoryname,
        categorydescription: categorydescription,
        categoryimageurl: categoryimageurl,

    });
    category
        .save()
        .then(result => {
            res.status(201).json({
                message: 'category created successfully!',
                category: category
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const categoryname = req.body.categoryname;
    const categorydescription = req.body.categorydescription;
    Category.findById(categoryId)
        .then(category => {
            if (!category) {
                const error = new Error('Could not find category.');
                error.statusCode = 404;
                throw error;
            }
            category.categoryname = categoryname;
            category.categorydescription = categorydescription;
            return category.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Category updated!', category: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.deleteOne({ "_id": categoryId })
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