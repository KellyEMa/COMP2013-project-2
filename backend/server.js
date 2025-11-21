//Initializing server 

const express = require('express');
const server = express();
const port = 3000;
const mongoose = require('mongoose') // import mongoose
require('dotenv').config(); // import dotenv
const {DB_URI} = process.env; // to grab the same variable from the dotenv file 
const cors = require('cors'); // for disabling default browser security
const Product = require('./models/product'); // importing the schema

//Middleware
server.use(express.json()); // ensures data is transmitted as json
server.use(express.urlencoded({extended: true}));
server.use(cors());

//Database connection and server
mongoose.connect(DB_URI).then(() => {
    server.listen(port, () => {
        console.log(`Database is connected\nServer is listening on ${port}`);
    });
})
.catch((error) => console.log(error.message));

//Routes
//Root route
server.get("/", (request, response) => {
    response.send("Server is Live!");
});


//To grab all the data from the schema 
server.get("/product", async (request, response) => {
    try{
        const products = await Product.find();
        response.send(products);
    }catch(error){
        response.status(500).send({message: error.message});
    }
});

//to POST a new product
server.post("/product", async (request, response) => {

    const {name, brand, image, price} = request.body
    const newProduct = new Product({
        name, 
        brand,
        image, 
        price
    });
    try{
        await newProduct.save();
        response.status(200).send(
            {message: `Product is added successfully ${crypto.randomUUID()}`,
        });
    }catch(error){
        response.status(400).send({message: error.message});
    }
});

//To DELETE a product from DB by it's id 
server.delete("/product/:id", async (response, request) => {
    const {id} = request.params
    try{
        await Product.findByIdAndDelete(id)
        response.send({message: `Product is deleted successfully with the id: ${id}`});
    }catch(error){
        response.status(400).send({message: error.message});
    }
});

//To GET one product by id 
server.get("/product/:id", async (request, response) => {
    const {id} = request.params;
    try{
        const productToEdit = await Product.findById(id);
        response.send(contactToEdit);
    }catch (error) {
        response.status(500).send({message: error.message});
    }
});

//To PATCH a product by id 
server.patch("/product/:id", async (request, response) => {
    const {id} = request.params;
    const {name, brand, image, price} = request.body;
    try {
        await Product.findByIdAndUpdate(id, {
            name,
            brand,
            image,
            price
        });
        response.send({message: `Contact has been updated with the id: ${id}`});
    }catch (error){
        response.status(500).send({message: error.message});
    }
});