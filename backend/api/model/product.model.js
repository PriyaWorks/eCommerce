const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productname: {
        type: String,
        required: true
    },
    productdescription: {
        type: String,
        required: true
    },
    productcategory: {
        type: String,
        required: true
    },
    productcolor: {
        type: String,
        required: true
    },
    productsize: {
        type: String,
        required: true
    },
    productprice: {
        type: Number,
        required: true
    },
    productquantity: {
        type: Number,
        required: true
    },
    productbrandname: {
        type: String,
        required: true
    },
    productcollectionname: {
        type: String,
        required: true
    },
    productmaterial: {
        type: String,
        required: true
    },
    productimageurl: { type: String, require: true },
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);