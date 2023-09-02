import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose'; // import mongose library after installing by 'npm i mongoose'

const app = express();
// Use Express frame work to create our HTTP Route
// We want to create a new route for / route
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Hi MOM! I am MERN Stack student");
});

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