// requiring mongoose inside this file

const mongoose = require('mongoose');

// creating a new productSchema object

const productSchema = new mongoose.Schema(
 {
name: {type: String, required: true},
description:{type: String, required: true},
img: {type:String, required: true},
price:{type: Number, required: true},
qty:{type: Number, required: true},
})

//Data is gonna live in the Product variable, relates to the model 
// if we want to pull data we'd be referring to Product

const Product = mongoose.model('Product', productSchema);

module.exports = Product;