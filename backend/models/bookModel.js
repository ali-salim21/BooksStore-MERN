import mongoose from "mongoose";

// Create book schema variable
const bookSchema = mongoose.Schema(
    {
        title: { type: String, required: true},
        auther: {type: String, required: true},
        publisher: {type: Number, required: true},
    }, // No need for ID since it will be handeled by the mongoose db.
    
    { // Time stamp will provide {time of opeartion} and {time of last update}.
        timestamps: true,
    }
);

export const Book = mongoose.model('Cat', bookSchema);