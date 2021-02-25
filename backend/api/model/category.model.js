const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryname: {
        type: String
    },
    categorydescription: {
        type: String
    },
    categoryimageurl: { type: String, require: true },
}, { timestamps: true });

module.exports = mongoose.model('category', categorySchema);