import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose'; // import mongose library after installing by 'npm i mongoose'
import { Book } from "./models/bookModel.js";

// Use Express frame work to create our HTTP Route
const app = express();

// Middleware for parsing request body
//app.use(express.json());

// We want to create a new route for "/" route
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Hi MOM! I am MERN Stack student");
});

// Route to save a new Book
// since working with mongoos is a async process we will async function
app.post('/books', async (request, response) => {
    try {
        // Quick validation for our input from request.body to be in the requested body,
        // if NOT we return a response of status 400 & send message for client
        if (
            !request.body.title ||
            !request.body.auther ||
            !request.body.publisher
        ) { 
            return response.status(400).send({
                message: 'Send all required fields: title, auther, publisher ',
            });
        }

        // Create a variable for new book
        const newBook = {
            title: request.body.title,
            author: request.body.auther,
             publisher: request.body.publisher,
        };
        
        // call book.create to send this newbook to it & save result in the book variable
        const book = await Book.create(newBook);

        // return a stutus code of 201 and send a book to the client
        return response.status(201).send(book);
    } catch (error) {
        // Receve the error then log the error to the server console.
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

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