import axios from "axios";
require('dotenv').config()
const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const APIKEY = process.env.REACT_APP_KEY;

export default {
    //search Google API
    search: function (query) {
        return axios.get(BASEURL + query + APIKEY);
    },
    // Gets all books
    getBooks: function () {
        return axios.get("/api/books");
    },
    // Deletes the book with the given id
    deleteBook: function (id) {
        return axios.delete("/api/books/" + id);
    },
    // Saves a book to the database
    saveBook: function (bookData) {
        return axios.post("/api/books", bookData);
    }
};