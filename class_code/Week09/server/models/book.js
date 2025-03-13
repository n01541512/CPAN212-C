import mongoose from "mongoose";

const JeremyGilford = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
    },
    publisher: {
        type: String,
    },
    pages: {
        type: Number,
    },
    release_date: {
        type: String,
    },
    ISBN: {
        type: String,
    },
});
const Book = mongoose.model("books", JeremyGilford);
export default Book;