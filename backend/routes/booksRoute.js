import express from 'express';
import { Book } from '../models/bookModel.js';
const router = express.Router();

// Route to save a new Book
// since working with mongoos is a async process we will async function
router.post('/', async (request, response) => {
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
            auther: request.body.auther,
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
});

// Route to get all books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        //return response.status(200).json(books);
        return response.status(200).json({
            count: books.length,
            data: books
        });

    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Route to get ONE book from database
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Update a book using request.params (id param to find book in DB) & request.body to find in DB
// Route to update a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.auther ||
            !request.body.publisher
        ) { 
            return response.status(400).send({
                message: 'Send all required fields: title, auther, publisher ',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'book updated succesfully'});

    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Delete a book using Id only
// Route for deleting a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found'})
        }

        return response.status(200).send({message: 'Book deleted successfully'});

    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;