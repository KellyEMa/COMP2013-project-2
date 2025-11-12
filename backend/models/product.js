// Initializing the schema 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the products schema 
const productSchema = new Schema({
    id: {
        type: String,
        required: true,
     },
     productName:{
        type: String,
        required: true,
     },
     brand:{
        type: String,
        required: true,
     },
     image:{
        type: String,
        required: true,
     },
     price:{
        type: String,
        required: true,
     }

});

// package and export 
const Product = mongoose.model("Product", productSchema);
module.exports = Product; 
