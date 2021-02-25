const express = require('express');
const { body } = require('express-validator/check');
const multer = require('multer');

const categoryController = require('../controllers/category');
// const Category = require('../model/category.model');
const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
        
    }
});

router.get('/getcategories', categoryController.getCategories);
router.get('/getallcategories', categoryController.getAllCategories);
router.get('/getcategory/:categoryId', categoryController.getCategory);
router.post(
    '/createcategory', multer({ storage:storage }).single("image"),
    categoryController.createCategory
);

router.put(
    '/editcategory/:categoryId', [ 
        body('categoryname')
        .trim()
        .isLength({ min: 3 }),
        body('categorydescription')
        .trim()
        .isLength({ min: 5 })
    ],
    categoryController.updateCategory
);

router.delete('/deletecategory/:categoryId', categoryController.deleteCategory);

module.exports = router;