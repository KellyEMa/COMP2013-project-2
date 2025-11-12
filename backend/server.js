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
        server.status(500).send({message: error.message});
    }
});