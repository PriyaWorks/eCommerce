const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const categoryRoutes = require('./api/routes/category');
const productRoutes = require('./api/routes/product');
const userRoutes = require('./api/routes/user');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

/* mongoose.connect('mongodb://localhost:27017/ShoppingTime'); */
mongoose.connect('mongodb://mongo:27017/ShoppingTime');
mongoose.connection.on('connected', () => {
    console.log("Mongodb connected");
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req,res,next)=>{
    console.log("logging")
    res.send("Hello")
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
