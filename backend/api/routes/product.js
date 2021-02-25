const express = require('express');
const { body } = require('express-validator/check');
const multer = require('multer');

const productController = require('../controllers/product');
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

router.get('/getproduct', productController.getProduct);
router.get('/getproduct/:productId', productController.getProduct);
router.get('/getallproduct', productController.getAllProduct);
router.delete('/deleteproduct/:productId', productController.deleteProduct);
router.get('/getAllProductByCategory/:productcategory', productController.getAllProductByCategory);

router.post(
    '/createproduct', multer({ storage:storage }).single("image"),
    productController.createProduct
);

router.put(
    '/editproduct/:productId', [
        body('productname')
        .trim()
        .isLength({ min: 3 }),
        body('productdescription')
        .trim()
        .isLength({ min: 4 }),
        body('productcategory')
        .trim()
        .isLength({ min: 3 }),
        body('productcolor')
        .trim()
        .isLength({ min: 3 }),
        body('productsize')
        .trim()
        .isLength({ min: 3 }),
        body('productprice')
        .trim()
        .isLength({ min: 3 }),
        body('productbrandname')
        .trim()
        .isLength({ min: 3 }),
        body('productcollectionname')
        .trim()
        .isLength({ min: 5 }),
        body('productmaterial')
        .trim()
        .isLength({ min: 5 }),

    ],
    productController.updateProduct
);

module.exports = router;