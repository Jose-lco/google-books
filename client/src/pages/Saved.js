import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { SavedList, SavedListItem } from "../components/SavedList";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
const Saved = () => {
    const [books, setBooks] = useState([])

    // Load all books and store them with setBooks
    useEffect(() => {
        loadBooks()
    }, [])

    // Loads all books and sets them to books
    function loadBooks() {
        API.getBooks()
            .then(res =>
                setBooks(res.data)
            )
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteBook(id) {
        API.deleteBook(id)
            .then(res => loadBooks())
            .catch(err => console.log(err));
    }

    return (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <Jumbotron>
                        <h1>Books on My List</h1>
                    </Jumbotron>
                    {books.length ? (
                        <SavedList>
                            {books.map(book => {
                                return (
                                    <SavedListItem key={book._id}
                                        title={book.title}
                                        author={book.author}
                                        description={book.synopsis}>
                                        <DeleteBtn onClick={() => deleteBook(book._id)} />
                                    </SavedListItem>
                                );
                            })}
                        </SavedList>
                    ) : (
                            <h3>No Results to Display</h3>
                        )}
                </Col>
            </Row>
        </Container>
    );
}

export default Saved;