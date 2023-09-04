import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose'; // import mongose library after installing by 'npm i mongoose'
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

// Use Express framework to create our HTTP Route
const app = express();

// Middleware for parsing request body
app.use(express.json());

/* 
Middleware for handling CORS POLICY
-> Cross-Origin Resource Sharing (CORS)
-> When server receves request it need check if it is permited
-> It checks Origins, Methods, Headers
   Option 1: Allow All Origins with Default of cors(*)
*/
app.use(cors());

// Option 2: Alow custom origins

/*app.use(
    cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowrdHeaders: ['Content-Type'],
    })
);*/

// We want to create a new route for "/" route
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Hi MOM! I am MERN Stack student");
});

/*
    Its better to refactor all your routes to improve applicaiton(USE EXPRESS ROUTER)
    -> When having more models
    -> For each model there need to be 5 routes
    -> So when we have 8 models will endup with 40 routes
    -> This is not good coding practice therefore its better to use code spliting and folder structure
   
   Use middleware for
*/
app.use('/books', booksRoute);
// Connect to mongoose database
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });